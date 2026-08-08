#!/usr/bin/env node
// Optimizes public/assets images: converts referenced PNGs to resized WebP,
// removes the originals and drops unreferenced orphan assets.
// Must run AFTER generate-og-image.mjs (which reads the portrait PNG source).
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = join(root, 'public/assets');

// Images referenced by the app (name -> max width).
const referenced = {
  'chirag-hariprasad.png': 512,
  'sjp-admission.png': 1400,
  'best-cr.png': 1400,
  'first-fest-2023.png': 1400,
  '3d-printers.png': 1400,
  'graduation.png': 1400,
  'first-hackathon.png': 1400,
  'rvce-admission.png': 1400,
  '1st-patent.png': 1400,
  '1st-paper.png': 1400,
  'internship-iifl-samasta.png': 1400,
  'internship-glob-tech.png': 1400,
  'Samasta_start.png': 1400,
};

let converted = 0;

for (const [file, maxWidth] of Object.entries(referenced)) {
  const src = join(assetsDir, file);
  const dst = join(assetsDir, file.replace(/\.png$/i, '.webp'));
  try {
    const buf = readFileSync(src);
    const meta = await sharp(buf).metadata();
    const width = Math.min(meta.width, maxWidth);
    const out = await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    writeFileSync(dst, out);
    const before = buf.length;
    const after = out.length;
    console.log(
      `${file}: ${(before / 1024).toFixed(0)}KB -> ${dst.split('/').pop()} ${(after / 1024).toFixed(0)}KB (${Math.round((1 - after / before) * 100)}% smaller)`
    );
    rmSync(src);
    converted++;
  } catch (e) {
    console.error(`FAILED ${file}: ${e.message}`);
  }
}

// Remove orphans that nothing in the app references anymore.
rmSync(join(assetsDir, 'independent-fest.png'), { force: true });

console.log(`\nOptimized ${converted} images`);
