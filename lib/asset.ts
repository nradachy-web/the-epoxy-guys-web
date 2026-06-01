/**
 * GitHub Pages serves this repo as a project page at /the-epoxy-guys-web, so
 * root-relative asset and plain-anchor paths need the basePath prefixed.
 * next/link and next/image are basePath-aware automatically; plain <img> and
 * <a> are not, so route those through asset().
 *
 * When the site moves to its own domain (miepoxyguys.com) at the root, set BASE
 * to "" here, in next.config.ts, and in lib/imageLoader.ts, and add public/CNAME.
 */
export const BASE = "/the-epoxy-guys-web";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/")) return `${BASE}${path}`;
  return path;
}
