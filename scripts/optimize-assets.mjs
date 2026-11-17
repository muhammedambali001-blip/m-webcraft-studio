/**
 * M-WebCraft Studio - performance asset pass
 * Generates modern, right-sized WebP variants of the uploaded portrait &
 * logo plus a small favicon. The originals in upload/ are never modified
 * and the originals in public/ are kept (unreferenced) for provenance.
 *
 * Outputs:
 *   public/muhammed-ambali-portrait.webp  (854x1281, hero LCP image)
 *   public/muhammed-ambali-about.webp     (803x794, about + hero chip)
 *   public/m-webcraft-studio-logo.webp    (192x192, navbar/footer/chat chip)
 *   src/app/icon.png                      (128x128 favicon, M-symbol crop)
 */
import sharp from "sharp";
import path from "path";

const uploadDir = "/home/z/my-project/upload";
const publicDir = "/home/z/my-project/public";
const appDir = "/home/z/my-project/src/app";

const portraitPath = path.join(uploadDir, "NEW PIC.jpeg");
const logoPath = path.join(uploadDir, "M-WEBCRAFT STUDIO.png");

async function main() {
  // ---------- Portrait (hero, LCP): same geometry as the prepared jpg ----------
  const meta = await sharp(portraitPath).metadata();
  const portrait = sharp(portraitPath).resize({
    width: Math.min(854, meta.width ?? 854),
    withoutEnlargement: true,
  });
  await portrait
    .clone()
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(publicDir, "muhammed-ambali-portrait.webp"));

  // ---------- About crop (upper body, same geometry as the prepared jpg) ------
  const w = meta.width ?? 800;
  const h = meta.height ?? 1200;
  const cropH = Math.round(h * 0.62);
  const cropW = Math.round(w * 0.94);
  const left = Math.round((w - cropW) / 2);
  await sharp(portraitPath)
    .extract({ left, top: 0, width: cropW, height: cropH })
    .resize({ width: 803, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(publicDir, "muhammed-ambali-about.webp"));

  // ---------- Logo (displayed at 28-56px): 192px is a crisp 3-6x source -------
  await sharp(logoPath)
    .resize(192, 192, { fit: "inside" })
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(publicDir, "m-webcraft-studio-logo.webp"));

  // ---------- Favicon: square crop around the "M" symbol, tiny ----------------
  const lw = 1254, lh = 1254;
  const side = Math.min(lw, Math.round(lh * 0.44));
  const fLeft = Math.round((lw - side) / 2);
  const fTop = Math.round(lh * 0.14);
  await sharp(logoPath)
    .extract({ left: fLeft, top: fTop, width: side, height: side })
    .resize(128, 128)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(appDir, "icon.png"));

  for (const f of [
    "muhammed-ambali-portrait.webp",
    "muhammed-ambali-about.webp",
    "m-webcraft-studio-logo.webp",
  ]) {
    const p = path.join(publicDir, f);
    const meta2 = await sharp(p).metadata();
    console.log(f, meta2.width + "x" + meta2.height);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
