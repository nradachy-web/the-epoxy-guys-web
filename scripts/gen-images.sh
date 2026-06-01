#!/bin/bash
# The Epoxy Guys — Higgsfield image generation controller.
# Sequential (one controller, per Higgsfield concurrency lessons). Skips files
# that already exist so reruns are cheap. Logs to /tmp/epoxy_gen.log.
set -u
export PATH="$HOME/.local/bin:/usr/bin:/bin:$PATH"
HF="$HOME/.local/bin/higgsfield"
cd "/Users/modernapex/Library/Mobile Documents/com~apple~CloudDocs/Desktop/the-epoxy-guys-web" || exit 1
LOG=/tmp/epoxy_gen.log
: > "$LOG"
mkdir -p public/photos public/og public/brand

BASE="photorealistic architectural and product photography, ultra detailed, sharp focus, true-to-life reflections and glossy sheen, cinematic lighting, color-accurate, no text, no captions, no watermark, no signage text"

gen () {
  local dest="$1" model="$2" ar="$3" extra="$4" prompt="$5"
  if [ -f "$dest" ]; then echo "SKIP (exists): $dest" | tee -a "$LOG"; return; fi
  echo "GEN -> $dest [$model $ar $extra]" | tee -a "$LOG"
  local raw url
  raw=$($HF generate create "$model" --prompt "$prompt. $BASE" --aspect_ratio "$ar" $extra --wait --wait-timeout 7m --wait-interval 5s 2>&1)
  echo "$raw" >> "$LOG"
  url=$(printf '%s\n' "$raw" | grep -oE 'https://[^ "]+' | grep -iE 'cloudfront|higgsfield|media|\.jpg|\.jpeg|\.png|\.webp' | tail -1)
  if [ -z "$url" ]; then echo "  !! no URL for $dest" | tee -a "$LOG"; return; fi
  curl -sS -m 120 -L "$url" -o "$dest" && echo "  saved $(wc -c < "$dest") bytes -> $dest" | tee -a "$LOG"
}

# ---- HERO (crisp, wide) ----
gen public/photos/hero-main.jpg nano_banana_2 16:9 "--resolution 4k" \
"A luxury residential garage at dusk with a mirror-glossy charcoal and warm-copper metallic epoxy floor that reflects recessed warm lighting and the silhouette of a high-end sports car, deep shadows, moody premium showroom mood, wide cinematic establishing shot, dramatic reflections on the floor"

gen public/photos/hero-vert.jpg seedream_v4_5 3:4 "--quality high" \
"A luxury residential garage with a mirror-glossy charcoal metallic epoxy floor reflecting warm light, a high-end sports car partially in frame, moody premium mood, vertical composition, dramatic floor reflections"

# ---- SERVICE HEROES ----
gen public/photos/service-garage.jpg seedream_v4_5 3:2 "--quality high" \
"A pristine residential two-car garage with a high-gloss gray and black decorative flake epoxy floor, organized tool storage on the walls, bright clean even lighting, the floor reflecting the space, real-estate quality interior photo"

gen public/photos/service-basement.jpg seedream_v4_5 3:2 "--quality high" \
"A beautifully finished basement living space with a glossy metallic epoxy floor in deep blue and silver, warm modern lounge furniture and soft lighting, cozy upscale family room, floor reflecting the lights"

gen public/photos/service-commercial.jpg seedream_v4_5 3:2 "--quality high" \
"A large clean commercial showroom with a seamless high-gloss light gray epoxy floor stretching into the distance, bright industrial lighting, modern professional space, strong floor reflections, wide angle"

gen public/photos/service-polyaspartic.jpg seedream_v4_5 3:2 "--quality high" \
"Close action shot of a flooring professional in gloves and knee pads using a flat squeegee to spread clear glossy polyaspartic coating across a freshly prepared concrete garage floor, decorative color flakes scattered, dramatic low angle, motion and craftsmanship"

gen public/photos/service-polished.jpg seedream_v4_5 3:2 "--quality high" \
"A modern minimalist retail interior with a polished concrete floor that has a soft mirror sheen reflecting overhead lighting, clean architectural space, neutral tones, sophisticated"

gen public/photos/service-residential.jpg seedream_v4_5 3:2 "--quality high" \
"A bright modern home mudroom and kitchen entry with a seamless glossy light-tan epoxy floor, clean contemporary cabinetry, natural light, the floor smooth and reflective, lifestyle interior photo"

gen public/photos/service-logo.jpg seedream_v4_5 3:2 "--quality high" \
"A glossy black epoxy garage floor with a large circular abstract emblem medallion inlaid in the center in chrome and red, sealed under a clear mirror topcoat, dramatic lighting, showpiece floor, no readable text"

gen public/photos/service-prep.jpg seedream_v4_5 3:2 "--quality high" \
"A concrete floor grinding job in progress, a walk-behind diamond floor grinder with a dust shroud on raw gray concrete, fine concrete profile visible, industrial work scene, dramatic side lighting"

# ---- FINISH SWATCHES (macro, square) ----
gen public/photos/finish-flake.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of a decorative flake epoxy floor, gray black and white vinyl color chips broadcast into a glossy clear coat, high gloss reflective surface, even studio lighting"

gen public/photos/finish-metallic.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of a metallic epoxy floor, molten swirls of copper bronze and charcoal that look like marble and lava, three dimensional depth under a high gloss clear coat, luxurious"

gen public/photos/finish-quartz.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of a ceramic carpet quartz epoxy floor, dense tan and gray colored quartz granules forming a textured slip resistant commercial surface, semi gloss"

gen public/photos/finish-glitter.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of a glitter epoxy floor, deep black base with fine silver and rainbow metallic glitter sparkling under light, high gloss mirror clear coat, glamorous"

gen public/photos/finish-solid.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of a clean solid light gray epoxy concrete floor with a clear satin coat, smooth minimal uniform surface, subtle reflection, simple and elegant"

gen public/photos/finish-polished.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of polished concrete floor, smooth gray surface with a soft mirror polish and visible fine aggregate speckle, reflective sheen, modern"

gen public/photos/finish-stained.jpg seedream_v4_5 1:1 "--quality high" \
"Extreme close-up macro of acid-stained concrete floor, rich variegated warm brown and amber mottled color with a sealed glossy finish, organic depth"

gen public/photos/finish-logo.jpg seedream_v4_5 1:1 "--quality high" \
"Close-up of a custom epoxy floor medallion, a circular abstract crest inlaid in metallic gold and black under a clear high gloss topcoat, showpiece detail, no readable text"

# ---- GALLERY ----
gen public/photos/gallery-1.jpg seedream_v4_5 4:3 "--quality high" \
"A stunning finished garage with a deep blue and silver metallic epoxy floor reflecting like water, a classic muscle car parked on it, premium man cave, dramatic lighting"
gen public/photos/gallery-2.jpg seedream_v4_5 4:3 "--quality high" \
"A finished basement home gym with a gray flake epoxy floor, rubber-free clean glossy surface, bright modern lighting, equipment neatly arranged"
gen public/photos/gallery-3.jpg seedream_v4_5 4:3 "--quality high" \
"A commercial brewery taproom with a glossy charcoal epoxy floor, industrial chic, warm Edison lighting reflecting on the floor"
gen public/photos/gallery-4.jpg seedream_v4_5 4:3 "--quality high" \
"An upscale home bar with a black glitter epoxy floor sparkling under accent lighting, sophisticated lounge, mirror reflections"

# ---- BACKDROPS + OG ----
gen public/photos/texture-floor-dark.jpg seedream_v4_5 16:9 "--quality high" \
"Abstract dark charcoal high gloss epoxy floor surface with faint copper metallic veins and soft reflected light streaks, minimal moody texture background, premium"
gen public/photos/cta-dusk.jpg seedream_v4_5 21:9 "--quality high" \
"A luxury garage interior at dusk seen wide, mirror glossy dark metallic floor reflecting warm interior lights, premium atmospheric, cinematic, empty floor"
gen public/og/og-default.jpg nano_banana_2 16:9 "--resolution 2k" \
"A luxury residential garage with a mirror glossy charcoal and copper metallic epoxy floor reflecting warm light and a sports car silhouette, premium cinematic, room for nothing in the center"

echo "ALL DONE" | tee -a "$LOG"
ls -la public/photos public/og | tee -a "$LOG"
