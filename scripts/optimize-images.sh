#!/bin/bash
# Resize + re-encode generated images to web-friendly JPEGs with macOS sips.
# Keeps the same filenames/paths so no references change.
set -u
cd "/Users/modernapex/Library/Mobile Documents/com~apple~CloudDocs/Desktop/the-epoxy-guys-web" || exit 1

opt () {
  local f="$1" max="$2" q="${3:-68}"
  [ -f "$f" ] || return
  local before
  before=$(stat -f%z "$f")
  sips -Z "$max" -s format jpeg -s formatOptions "$q" "$f" --out "$f.tmp" >/dev/null 2>&1 || { echo "FAIL $f"; return; }
  mv "$f.tmp" "$f"
  local after
  after=$(stat -f%z "$f")
  printf "  %-34s %5sKB -> %4sKB\n" "$(basename "$f")" "$((before/1024))" "$((after/1024))"
}

echo "Optimizing images..."
for f in public/photos/*.jpg; do
  base=$(basename "$f")
  case "$base" in
    hero-main.jpg)              opt "$f" 2400 70 ;;
    cta-dusk.jpg)               opt "$f" 2400 68 ;;
    texture-floor-dark.jpg)     opt "$f" 1920 66 ;;
    finish-*.jpg)               opt "$f" 1100 70 ;;
    real-corvette-flake-floor.jpg) opt "$f" 1600 72 ;;
    service-*.jpg|gallery-*.jpg) opt "$f" 1600 70 ;;
    *)                          opt "$f" 1600 70 ;;
  esac
done
for f in public/og/*.jpg; do opt "$f" 1200 72; done

echo "Done."
du -sh public/photos public/og
