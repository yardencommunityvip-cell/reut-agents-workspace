/**
 * render-all.mjs
 * Renders all 30 episodes sequentially.
 * Run: node scripts/render-all.mjs
 *
 * Prerequisites:
 *   1. npm install
 *   2. Place all audio files in public/audio/ep_01_voiceover.mp3 ... ep_30_voiceover.mp3
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'out');

const EPISODES = Array.from({ length: 30 }, (_, i) => i + 1);

let rendered = 0;
let skipped = 0;
let failed = [];

console.log('');
console.log('═══════════════════════════════════════════');
console.log('  EPSTEIN FILES — BATCH RENDER');
console.log('  30 episodes × 60 seconds = 30 minutes');
console.log('═══════════════════════════════════════════');
console.log('');

for (const ep of EPISODES) {
  const padded = String(ep).padStart(2, '0');
  const audioFile = join(ROOT, 'public', 'audio', `ep_${padded}_voiceover.mp3`);
  const outFile = join(OUT_DIR, `ep_${padded}.mp4`);
  const compositionId = `Episode${padded}`;

  // Skip if output already exists
  if (existsSync(outFile)) {
    console.log(`  ⏭  EP${padded} already rendered — skipping`);
    skipped++;
    continue;
  }

  // Warn if audio missing but continue (will render silent)
  if (!existsSync(audioFile)) {
    console.log(`  ⚠  EP${padded} — audio file missing: ep_${padded}_voiceover.mp3`);
  }

  console.log(`  ▶  Rendering EP${padded}...`);

  try {
    execSync(
      `npx remotion render src/index.ts ${compositionId} ${outFile} --codec=h264`,
      { cwd: ROOT, stdio: 'inherit' }
    );
    console.log(`  ✓  EP${padded} done → out/ep_${padded}.mp4`);
    rendered++;
  } catch (err) {
    console.error(`  ✗  EP${padded} FAILED`);
    failed.push(ep);
  }
}

console.log('');
console.log('═══════════════════════════════════════════');
console.log(`  COMPLETE: ${rendered} rendered, ${skipped} skipped, ${failed.length} failed`);
if (failed.length > 0) {
  console.log(`  Failed episodes: ${failed.join(', ')}`);
}
console.log('═══════════════════════════════════════════');
console.log('');
