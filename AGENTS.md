<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (Next.js 16.2.6) has breaking changes — APIs, conventions, and file
structure may all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# The Epoxy Guys — build notes

- Static export to GitHub Pages, served at the client's domain `miepoxyguys.com`
  (basePath `""`, `public/CNAME` ships the domain).
- All site content lives in `lib/site.ts` (single source of truth). Never hardcode
  NAP (name/address/phone), services, finishes, cities, reviews, or FAQ in pages.
- Design system: dark "Liquid Graphite" luxe. Tokens in `app/globals.css` `@theme`.
- Animations via `motion` + the helpers in `components/ui/Reveal.tsx` and
  `components/ui/Motion.tsx`. Always respect `prefers-reduced-motion`.
- Real, verbatim testimonials only (recovered from the client's old site). Do NOT
  invent reviews, star counts, or an aggregateRating. No fabricated stats.
- Phone is `810-441-4494`. Owner is David Tougas (with Michelle). Genesee County, MI.
