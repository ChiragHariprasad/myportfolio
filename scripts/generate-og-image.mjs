#!/usr/bin/env node
// Generates public/og-image.png (1200x630 social preview card)
// from the hero portrait + site branding.
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public/og-image.png');

// Prefer the optimized WebP portrait when it exists (optimize-images runs
// after this script), fall back to the original PNG on fresh clones.
let portraitPath = join(root, 'public/assets/chirag-hariprasad.webp');
try {
  readFileSync(portraitPath);
} catch {
  portraitPath = join(root, 'public/assets/chirag-hariprasad.png');
}

const W = 1200;
const H = 630;

// Circular portrait crop
const portraitBuffer = readFileSync(portraitPath);
const mask = Buffer.from(
  '<svg width="420" height="420" xmlns="http://www.w3.org/2000/svg"><circle cx="210" cy="210" r="210" fill="white"/></svg>'
);
const circular = await sharp(portraitBuffer)
  .resize(420, 420, { fit: 'cover' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// Full-bleed SVG card (text + accents), rasterized by sharp/librsvg.
const svg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12121a"/>
      <stop offset="100%" stop-color="#0a0a0f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.25" r="0.8">
      <stop offset="0%" stop-color="rgba(200,169,97,0.25)"/>
      <stop offset="100%" stop-color="rgba(200,169,97,0)"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="120" y="120" width="140" height="6" fill="#c8a961"/>
  <rect x="120" y="480" width="140" height="6" fill="#c8a961"/>
  <text x="120" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="bold" fill="#f0f0f5">Chirag Hariprasad</text>
  <text x="120" y="315" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-style="italic" fill="#c8a961">Inventor. Researcher. Engineer.</text>
  <text x="120" y="440" font-family="Verdana, Geneva, sans-serif" font-size="24" fill="#9999aa">AI/ML Systems Engineering · 4 Patents · IEEE Access · 19 Projects</text>
  <circle cx="730" cy="315" r="226" fill="none" stroke="rgba(200,169,97,0.6)" stroke-width="2"/>
  <circle cx="730" cy="315" r="241" fill="none" stroke="rgba(200,169,97,0.25)" stroke-width="1" stroke-dasharray="4 8"/>
</svg>`);

const card = await sharp(svg)
  .composite([{ input: circular, left: 730 - 210, top: 315 - 210, blend: 'over' }])
  .png()
  .toBuffer();

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, card);
console.log(`og-image.png written (${card.length} bytes)`);