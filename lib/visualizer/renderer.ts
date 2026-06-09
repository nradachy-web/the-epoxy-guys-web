/**
 * Flake floor renderer — dependency-free WebGL2.
 *
 * Pipeline: (1) a procedural flake albedo is rendered into an offscreen FBO from
 * a blend recipe (base coat + weighted chip colors); (2) a composite pass maps
 * that flake onto the floor plane via an inverse homography (true perspective),
 * re-lights it by the photo's own blurred luminance, adds a polyaspartic gloss
 * pass scaled by the sheen slider, and masks it to the floor quad. Preset rooms
 * and user uploads share this exact path.
 */
import type { Blend } from "./blends";
import { sizeMeta, densityMeta } from "./blends";
import type { Corner } from "./scenes";

type M3 = number[]; // row-major 3x3

function matMul(a: M3, b: M3): M3 {
  const r = new Array(9).fill(0);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
  return r;
}
function matInv(m: M3): M3 {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
  const det = a * A + b * B + c * C;
  const id = 1 / det;
  return [
    A * id, (c * h - b * i) * id, (b * f - c * e) * id,
    B * id, (a * i - c * g) * id, (c * d - a * f) * id,
    C * id, (b * g - a * h) * id, (a * e - b * d) * id,
  ];
}
/** Heckbert: unit square (0,0)(1,0)(1,1)(0,1) -> quad p0..p3. Returns row-major 3x3. */
function squareToQuad(p: Corner[]): M3 {
  const [x0, y0] = p[0], [x1, y1] = p[1], [x2, y2] = p[2], [x3, y3] = p[3];
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;
  if (Math.abs(sx) < 1e-9 && Math.abs(sy) < 1e-9) {
    return [x1 - x0, x3 - x0, x0, y1 - y0, y3 - y0, y0, 0, 0, 1];
  }
  const den = (x1 - x2) * (y3 - y2) - (x3 - x2) * (y1 - y2);
  const g = (sx * (y3 - y2) - (x3 - x2) * sy) / den;
  const h = ((x1 - x2) * sy - sx * (y1 - y2)) / den;
  return [
    x1 - x0 + g * x1, x3 - x0 + h * x3, x0,
    y1 - y0 + g * y1, y3 - y0 + h * y3, y0,
    g, h, 1,
  ];
}

const VERT = `#version 300 es
in vec2 aPos; out vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;

const FLAKE_FS = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 frag;
uniform vec3 uBase; uniform vec3 uChips[5]; uniform float uCdf[5];
uniform int uChipN; uniform float uGrid; uniform float uCoverage; uniform float uSeed;
float h1(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
vec2 h2(vec2 p){ return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h1(i),h1(i+vec2(1,0)),f.x), mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),f.x), f.y); }
vec3 pick(float r){ for(int i=0;i<5;i++){ if(i>=uChipN) break; if(r<=uCdf[i]) return uChips[i]; } return uChips[0]; }

// Voronoi over a wrapped (seamless) grid -> owner cell (xy) + f1,f2 (nearest, 2nd-nearest sq dist)
vec4 vor(vec2 uv, float grid, float so){
  vec2 cell = floor(uv*grid);
  float f1=9.0, f2=9.0; vec2 owner=vec2(0.0);
  for(int dy=-1;dy<=1;dy++) for(int dx=-1;dx<=1;dx++){
    vec2 c = cell+vec2(float(dx),float(dy));
    vec2 cw = mod(c,grid);
    vec2 seed = (c + 0.12 + 0.76*h2(cw+so))/grid;
    vec2 d = uv-seed; d -= round(d);
    float dist = dot(d,d);
    if(dist<f1){ f2=f1; f1=dist; owner=cw; }
    else if(dist<f2){ f2=dist; }
  }
  return vec4(owner, f1, f2);
}

// one angular flake chip: weighted color, per-chip lightness, within-chip marble, dark inter-chip gap
vec3 chip(vec4 v, float so, float grid, vec2 uv){
  vec3 c = pick(h1(v.xy+so*1.7));
  c *= 0.84 + 0.30*h1(v.xy+so*3.3);                          // per-chip lightness variation
  c *= 0.90 + 0.18*vnoise(uv*grid*2.2 + v.xy*1.7);           // within-chip streak / marble
  float gap = smoothstep(0.0, 0.11, (sqrt(v.w)-sqrt(v.z))*grid); // shadow line between chips
  return c * mix(0.46, 1.0, gap);
}

void main(){
  vec3 col = uBase * (0.88 + 0.22*vnoise(vUv*44.0));          // base coat (mostly hidden at full)
  // coarse chips — full angular mosaic, gated by broadcast density
  vec4 A = vor(vUv, uGrid, uSeed);
  if(h1(A.xy+uSeed*4.7) <= uCoverage) col = chip(A, uSeed, uGrid, vUv);
  // finer chips scattered on top -> real flake size variation
  vec4 B = vor(vUv, uGrid*2.05, uSeed+19.0);
  if(h1(B.xy+uSeed*6.1) <= 0.55*uCoverage) col = chip(B, uSeed+19.0, uGrid*2.05, vUv);
  if(h1(vUv*1150.0+uSeed) > 0.991) col += 0.30;               // mica sparkle
  frag = vec4(clamp(col,0.0,1.0),1.0);
}`;

const COMP_FS = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 frag;
uniform sampler2D uScene; uniform sampler2D uLight; uniform sampler2D uFlake;
uniform mat3 uHinv; uniform float uTile; uniform float uGloss; uniform float uMean; uniform float uWallReject;
void main(){
  vec3 scene = texture(uScene, vUv).rgb;
  vec3 p = uHinv * vec3(vUv,1.0);
  vec2 f = p.xy/p.z;
  if(f.x<0.0||f.x>1.0||f.y<0.0||f.y>1.0){ frag=vec4(scene,1.0); return; }
  float fe = 0.014;
  float edge = smoothstep(0.0,fe,f.x)*smoothstep(0.0,fe,f.y)*smoothstep(0.0,fe,1.0-f.x)*smoothstep(0.0,fe,1.0-f.y);
  // wall-reject: clip bright walls the quad overlaps (the floor reads darker than white walls)
  float sceneLum = dot(scene, vec3(0.299,0.587,0.114));
  edge *= 1.0 - smoothstep(uWallReject-0.05, uWallReject+0.03, sceneLum);
  vec3 flake = texture(uFlake, fract(f*uTile)).rgb;
  float lum = texture(uLight, vUv).r;
  float light = clamp(lum/max(uMean,0.001), 0.5, 1.7);
  vec3 lit = flake*light;

  // --- polyaspartic clear coat (fully procedural -> no scene-sampled artifacts) ---
  // wet look: a gloss coat deepens + saturates the flake, like water on stone
  vec3 wet = lit*lit*1.45;
  lit = mix(lit, wet, uGloss*0.6);
  // a smooth far-field sheen that brightens toward the back, plus the photo's own
  // bright floor spots. No mirroring of the room, so bright windows cannot blob.
  float sheen = smoothstep(0.1, 1.0, f.y) * 0.5;
  float hot = clamp(smoothstep(uMean*1.06, 1.0, lum), 0.0, 0.6);
  vec3 coat = vec3(0.96, 0.97, 1.0) * (sheen*0.55 + hot*0.5);
  vec3 glossed = lit + uGloss*coat;
  frag = vec4(mix(scene, glossed, edge), 1.0);
}`;

function hex3(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export class FlakeRenderer {
  gl: WebGL2RenderingContext;
  private flakeProg: WebGLProgram;
  private compProg: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private fbo: WebGLFramebuffer;
  private flakeTex: WebGLTexture;
  private sceneTex: WebGLTexture | null = null;
  private lightTex: WebGLTexture | null = null;
  private hinv: M3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  private mean = 0.5;
  private tile = 12;
  private wallReject = 1.2;
  readonly FBO_SIZE = 1024;

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2", { antialias: true, preserveDrawingBuffer: true });
    if (!gl) throw new Error("WebGL2 unavailable");
    this.gl = gl;
    this.flakeProg = this.program(VERT, FLAKE_FS);
    this.compProg = this.program(VERT, COMP_FS);
    // fullscreen quad
    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    // flake FBO
    this.flakeTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.flakeTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.FBO_SIZE, this.FBO_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    this.fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.flakeTex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private shader(type: number, src: string): WebGLShader {
    const gl = this.gl;
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
    return s;
  }
  private program(vs: string, fs: string): WebGLProgram {
    const gl = this.gl;
    const p = gl.createProgram()!;
    gl.attachShader(p, this.shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, this.shader(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link");
    return p;
  }

  /** Load a scene photo + floor corners (normalized, top-left origin). */
  async loadScene(url: string, corners: [Corner, Corner, Corner, Corner], tile: number, wallReject = 1.2) {
    const gl = this.gl;
    const img = await loadImage(url);
    this.tile = tile;
    this.wallReject = wallReject;
    this.canvas.width = img.naturalWidth;
    this.canvas.height = img.naturalHeight;

    // scene texture (flip Y so GL bottom-left uv samples upright)
    this.sceneTex ??= gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // derive low-res luminance "light map" from the photo (blur via downscale)
    const { lum, mean, w, h } = downscaleLuma(img, corners);
    this.mean = mean;
    this.lightTex ??= gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.lightTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, w, h, 0, gl.RED, gl.UNSIGNED_BYTE, lum);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // homography: floor uv -> GL uv (flip corner Y to bottom-left origin)
    const gp: Corner[] = corners.map(([x, y]) => [x, 1 - y] as Corner);
    this.hinv = matInv(squareToQuad(gp));
  }

  /** Render the procedural flake into the FBO (call on blend/size/density change). */
  renderFlake(blend: Blend) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.viewport(0, 0, this.FBO_SIZE, this.FBO_SIZE);
    gl.useProgram(this.flakeProg);
    gl.bindVertexArray(this.vao);
    const u = (n: string) => gl.getUniformLocation(this.flakeProg, n);
    gl.uniform3fv(u("uBase"), hex3(blend.baseCoat));
    const chips = blend.chips.slice(0, 5);
    const total = chips.reduce((s, c) => s + c.weight, 0) || 1;
    const colors = new Float32Array(15);
    const cdf = new Float32Array(5);
    let acc = 0;
    chips.forEach((c, i) => {
      const [r, g, b] = hex3(c.hex);
      colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b;
      acc += c.weight / total; cdf[i] = acc;
    });
    if (chips.length) cdf[chips.length - 1] = 1.0;
    gl.uniform3fv(u("uChips"), colors);
    gl.uniform1fv(u("uCdf"), cdf);
    gl.uniform1i(u("uChipN"), chips.length);
    gl.uniform1f(u("uGrid"), sizeMeta[blend.size].grid);
    gl.uniform1f(u("uCoverage"), densityMeta[blend.density].coverage);
    gl.uniform1f(u("uSeed"), 4.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindTexture(gl.TEXTURE_2D, this.flakeTex);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /** Composite the flake floor into the scene (call on gloss change / after renderFlake). */
  composite(gloss: number) {
    const gl = this.gl;
    if (!this.sceneTex || !this.lightTex) return;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.compProg);
    gl.bindVertexArray(this.vao);
    const u = (n: string) => gl.getUniformLocation(this.compProg, n);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.sceneTex); gl.uniform1i(u("uScene"), 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.lightTex); gl.uniform1i(u("uLight"), 1);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, this.flakeTex); gl.uniform1i(u("uFlake"), 2);
    // upload Hinv column-major
    const h = this.hinv;
    gl.uniformMatrix3fv(u("uHinv"), false, [h[0], h[3], h[6], h[1], h[4], h[7], h[2], h[5], h[8]]);
    gl.uniform1f(u("uTile"), this.tile);
    gl.uniform1f(u("uGloss"), gloss);
    gl.uniform1f(u("uMean"), this.mean);
    gl.uniform1f(u("uWallReject"), this.wallReject);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  render(blend: Blend, gloss: number) {
    this.renderFlake(blend);
    this.composite(gloss);
  }

  /** Render a square swatch of just the flake (for catalog tiles / thumbnails). */
  swatchDataURL(blend: Blend, px = 256): string {
    this.renderFlake(blend);
    const gl = this.gl;
    const tmp = document.createElement("canvas");
    tmp.width = px; tmp.height = px;
    // read FBO center crop
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    const buf = new Uint8Array(this.FBO_SIZE * this.FBO_SIZE * 4);
    gl.readPixels(0, 0, this.FBO_SIZE, this.FBO_SIZE, gl.RGBA, gl.UNSIGNED_BYTE, buf);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    const ctx = tmp.getContext("2d")!;
    const id = ctx.createImageData(this.FBO_SIZE, this.FBO_SIZE);
    id.data.set(buf);
    const full = document.createElement("canvas");
    full.width = this.FBO_SIZE; full.height = this.FBO_SIZE;
    full.getContext("2d")!.putImageData(id, 0, 0);
    ctx.drawImage(full, 0, 0, px, px);
    return tmp.toDataURL("image/png");
  }

  dispose() {
    const gl = this.gl;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("image load: " + url));
    img.src = url;
  });
}

/** Downscale to a small luminance buffer and compute mean luma over the floor region. */
function downscaleLuma(img: HTMLImageElement, corners: [Corner, Corner, Corner, Corner]) {
  const w = 128;
  const h = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * w));
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  const px = ctx.getImageData(0, 0, w, h).data;
  const lum = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    lum[i] = Math.round(0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]);
  }
  // mean over floor bbox (approx: bounding box of corners)
  const xs = corners.map((p) => p[0]), ys = corners.map((p) => p[1]);
  const x0 = Math.floor(Math.min(...xs) * w), x1 = Math.ceil(Math.max(...xs) * w);
  const y0 = Math.floor(Math.min(...ys) * h), y1 = Math.ceil(Math.max(...ys) * h);
  let sum = 0, n = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { sum += lum[y * w + x]; n++; }
  const mean = n ? sum / n / 255 : 0.5;
  return { lum, mean, w, h };
}
