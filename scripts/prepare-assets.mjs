/**
 * M-WebCraft Studio - asset preparation
 * Copies the uploaded portrait & logo into public/ as optimised web assets.
 * - muhammed-ambali-portrait.jpg : full-body portrait (hero)      ~1000px wide
 * - muhammed-ambali-about.jpg    : upper-body crop (about section) ~880px wide
 * - m-webcraft-studio-logo.png   : original logo, untouched content
 * - src/app/icon.png             : square crop of the "M" symbol (favicon)
 * The face/identity is never altered; the about asset is a pure geometry crop
 * of the same photograph (upper body), as requested by the brief.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const uploadDir = "/home/z/my-project/upload";
const publicDir = "/home/z/my-project/public";
const appDir = "/home/z/my-project/src/app";

const portraitPath = path.join(uploadDir, "NEW PIC.jpeg");
const logoPath = path.join(uploadDir, "M-WEBCRAFT STUDIO.png");

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });

  // ---------- Portrait ----------
  const meta = await sharp(portraitPath).metadata();
  console.log("Portrait metadata:", meta.width, "x", meta.height);

  // Full portrait for hero (max width 1000, keep aspect)
  await sharp(portraitPath)
    .resize({ width: 1000, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(publicDir, "muhammed-ambali-portrait.jpg"));
  console.log("Saved muhammed-ambali-portrait.jpg");

  // Upper-body crop for the About section (same photo, different crop).
  // Keep the head + torso: top ~62% of the image, slight inset from sides.
  const w = meta.width ?? 800;
  const h = meta.height ?? 1200;
  const cropH = Math.round(h * 0.62);
  const cropW = Math.round(w * 0.94);
  const left = Math.round((w - cropW) / 2);
  await sharp(portraitPath)
    .extract({ left, top: 0, width: cropW, height: cropH })
    .resize({ width: 880, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(publicDir, "muhammed-ambali-about.jpg"));
  console.log("Saved muhammed-ambali-about.jpg");

  // ---------- Logo ----------
  await sharp(logoPath).png().toFile(path.join(publicDir, "m-webcraft-studio-logo.png"));
  const logoMeta = await sharp(path.join(publicDir, "m-webcraft-studio-logo.png")).metadata();
  console.log("Saved logo", logoMeta.width, "x", logoMeta.height);

  // ---------- Favicon: square crop around the "M" symbol ----------
  const lw = logoMeta.width ?? 1240;
  const lh = logoMeta.height ?? 1240;
  const side = Math.min(lw, Math.round(lh * 0.44));
  const fLeft = Math.round((lw - side) / 2);
  const fTop = Math.round(lh * 0.14);
  await sharp(logoPath)
    .extract({ left: fLeft, top: fTop, width: side, height: side })
    .resize(256, 256)
    .png()
    .toFile(path.join(appDir, "icon.png"));
  console.log("Saved src/app/icon.png (favicon, M symbol crop)");

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
