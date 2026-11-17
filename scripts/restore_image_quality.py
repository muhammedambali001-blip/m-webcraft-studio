#!/usr/bin/env python3
"""
Restore high-quality image sources for the M-WebCraft Studio website.

The previous performance optimisation swapped the components to low-quality
WebP derivatives (portrait.webp ~51KB, about.webp ~35KB, logo.webp 192px).
This script re-establishes the ORIGINAL uploaded photographs as the image
sources, keeping the originals untouched:

1. public/muhammed-ambali-portrait.jpg  := byte-identical copy of
   upload/NEW PIC.jpeg (the original portrait, 854x1281).
2. public/muhammed-ambali-about.jpg     := regenerated from the ORIGINAL
   portrait (crop region x=28, y=0, 800x791 -> saved as high-quality JPEG
   q95, 4:4:4) instead of the recompressed 803x794 copy.
3. Stale low-quality WebP derivatives are removed:
   - muhammed-ambali-portrait.webp
   - muhammed-ambali-about.webp
   - m-webcraft-studio-logo.webp  (only 192x192)
   The original logo PNG (1254x1254) remains as the logo source.

next/image will generate high-quality (q90) AVIF/WebP variants from these
sources at request time, so the originals are never overwritten.
"""

import os
import shutil
import numpy as np
from PIL import Image

ROOT = "/home/z/my-project"
ORIG_PORTRAIT = os.path.join(ROOT, "upload", "NEW PIC.jpeg")
PUBLIC = os.path.join(ROOT, "public")

# --- 1. Restore the original portrait as the source (byte-identical copy) ---
portrait_dst = os.path.join(PUBLIC, "muhammed-ambali-portrait.jpg")
shutil.copyfile(ORIG_PORTRAIT, portrait_dst)
src_md5 = os.popen(f"md5sum '{ORIG_PORTRAIT}'").read().split()[0]
dst_md5 = os.popen(f"md5sum '{portrait_dst}'").read().split()[0]
assert src_md5 == dst_md5, "portrait copy is not byte-identical!"
print(f"[1] portrait source restored (byte-identical, md5 {src_md5[:12]}...)")

# --- 2. Regenerate the About crop straight from the original portrait ---
orig = Image.open(ORIG_PORTRAIT).convert("RGB")
crop_box = (28, 0, 28 + 800, 0 + 791)  # framing matched to the current site (NCC 0.976)
about = orig.crop(crop_box)
about_dst = os.path.join(PUBLIC, "muhammed-ambali-about.jpg")
about.save(about_dst, "JPEG", quality=95, subsampling=0, optimize=True)
print(f"[2] about crop regenerated from original: {about.size[0]}x{about.size[1]}, "
      f"{os.path.getsize(about_dst)/1024:.1f} KB (q95, 4:4:4)")

# --- 3. Quality report: old displayed webp vs new sources ---
old_webp = Image.open(os.path.join(PUBLIC, "muhammed-ambali-portrait.webp")).convert("RGB")
o = np.asarray(orig, dtype=np.float64)


def psnr(ref, test):
    a = np.asarray(ref, dtype=np.float64)
    b = np.asarray(test.resize(ref.size) if test.size != ref.size else test, dtype=np.float64)
    mse = ((a - b) ** 2).mean()
    return 10 * np.log10(255 ** 2 / mse) if mse > 0 else float("inf")


def lap_var(gray):
    a = np.asarray(gray, dtype=np.float64)
    lap = (-4 * a + np.roll(a, 1, 0) + np.roll(a, -1, 0) + np.roll(a, 1, 1) + np.roll(a, -1, 1))
    return lap.var()


print(f"    PSNR old-webp vs original : {psnr(orig, old_webp):.2f} dB (the blurry version)")
print(f"    PSNR new portrait.jpg vs original: inf (byte-identical)")

w, h = orig.size
face = (int(w * 0.30), int(h * 0.12), int(w * 0.72), int(h * 0.42))
print(f"    face-zone edge detail: orig={lap_var(orig.crop(face).convert('L')):.1f}  "
      f"old-webp={lap_var(old_webp.crop(face).convert('L')):.1f}")

# --- 4. Remove stale low-quality WebP derivatives ---
for name in ("muhammed-ambali-portrait.webp", "muhammed-ambali-about.webp",
             "m-webcraft-studio-logo.webp"):
    p = os.path.join(PUBLIC, name)
    if os.path.exists(p):
        os.remove(p)
        print(f"[4] removed stale compressed derivative: {name}")

print("\nFinal public/ assets:")
for f in sorted(os.listdir(PUBLIC)):
    p = os.path.join(PUBLIC, f)
    if os.path.isfile(p):
        print(f"    {f:38s} {os.path.getsize(p)/1024:8.1f} KB")
