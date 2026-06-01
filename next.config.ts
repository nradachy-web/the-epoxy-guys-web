import type { NextConfig } from "next";

/**
 * The Epoxy Guys — static export for GitHub Pages.
 * Served as a project page at /the-epoxy-guys-web, so basePath is set to match.
 * When moving to the client's domain (miepoxyguys.com) at root, set basePath to
 * "" here, in lib/imageLoader.ts and lib/asset.ts, and add a public/CNAME file.
 */
const repoBase = "/the-epoxy-guys-web";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBase,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
  },
};

export default nextConfig;
