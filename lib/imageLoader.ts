/**
 * Custom next/image loader for static export on GitHub Pages.
 * Prepends the repo basePath to absolute /public paths. Keep in sync with
 * next.config.ts and lib/asset.ts. Set basePath to "" when serving at a domain root.
 */
const basePath = "/the-epoxy-guys-web";

export default function imageLoader({ src }: { src: string }): string {
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith(basePath)) return src;
  if (src.startsWith("/")) return `${basePath}${src}`;
  return src;
}
