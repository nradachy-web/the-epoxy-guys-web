#!/usr/bin/env python3
"""
Build-time photo grade + hard 3:2 crop pass for "Engineered Precision".

The whole design lives or dies on ONE consistent grade across the real Google
Business Profile photos and ONE enforced crop ratio. The source set is genuinely
mixed-ratio (1600x1200, 1206x1400 portrait, 1920x1080), so restraint with the
raw shots collapses to "pulled from GBP" slop. This bakes graded plates as
assets (NOT CSS filters) into public/photos/graded/.

The grade (one calm, gallery look):
  - white balance: pull the garage-tungsten orange out of the slab
  - lift blacks ~6% so the shadows open
  - pull saturation ~12% (the real floor stays the only saturation on screen)
  - gentle contrast + a whisper of brightness for the bone-paper ground

Run from the project root:
    python3 scripts/grade-photos.py
Requires: Pillow  (pip3 install Pillow)
"""
import os
from PIL import Image, ImageEnhance, ImageOps

SRC = "public/photos"
OUT = "public/photos/graded"

GALLERY = [f"gallery-real-{i:02d}.jpg" for i in range(1, 11)]
EXTRA = ["real-corvette-flake-floor.jpg", "service-prep.jpg"]

# per-image vertical focus for portrait crops (keep the floor / subject)
FOCUS = {
    "gallery-real-02.jpg": 0.45,
    "gallery-real-05.jpg": 0.45,
}


def grade(im):
    im = im.convert("RGB")
    r, g, b = im.split()
    r = r.point(lambda v: min(255, v * 0.955))   # less red
    b = b.point(lambda v: min(255, v * 1.045))   # more blue -> neutral slab
    im = Image.merge("RGB", (r, g, b))
    lo, hi = 15, 248                              # lift blacks ~6%
    im = im.point(lambda v: int(lo + (v / 255.0) * (hi - lo)))
    im = ImageEnhance.Color(im).enhance(0.88)     # -12% saturation
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im = ImageEnhance.Brightness(im).enhance(1.015)
    return im


def crop_ratio(im, rw, rh, focus=0.5):
    w, h = im.size
    target, cur = rw / rh, w / h
    if cur > target:
        nw = int(round(h * target))
        x0 = (w - nw) // 2
        return im.crop((x0, 0, x0 + nw, h))
    nh = int(round(w / target))
    y0 = int(round((h - nh) * focus))
    return im.crop((0, y0, w, y0 + nh))


def save(im, name, q=86, max_w=1600):
    if im.width > max_w:
        im = im.resize((max_w, int(round(im.height * max_w / im.width))), Image.LANCZOS)
    im.save(os.path.join(OUT, name), "JPEG", quality=q, optimize=True, progressive=True)


def main():
    os.makedirs(OUT, exist_ok=True)
    n = 0
    for f in GALLERY + EXTRA:
        p = os.path.join(SRC, f)
        if not os.path.exists(p):
            print("MISSING", f)
            continue
        g = grade(ImageOps.exif_transpose(Image.open(p)))
        save(crop_ratio(g, 3, 2, FOCUS.get(f, 0.5)), f)   # enforced 3:2 plate
        n += 1

    # hero crops from the corvette flake floor (the eyedrop source for --accent)
    hero = grade(ImageOps.exif_transpose(Image.open(os.path.join(SRC, "real-corvette-flake-floor.jpg"))))
    save(crop_ratio(hero, 3, 4), "hero-portrait.jpg", q=88, max_w=1200)   # right 55% column
    save(crop_ratio(hero, 4, 5), "hero-45.jpg", q=88, max_w=1200)
    save(crop_ratio(hero, 3, 2), "hero-wide.jpg", q=88, max_w=1400)       # mobile hero
    print(f"graded {n} plates + 3 hero crops -> {OUT}")


if __name__ == "__main__":
    main()
