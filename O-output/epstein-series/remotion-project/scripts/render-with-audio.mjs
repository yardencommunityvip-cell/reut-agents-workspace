/**
 * render-with-audio.mjs
 * Renders only episodes that have a voiceover MP3 file.
 * Run: node scripts/render-with-audio.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'out');
const AUDIO_DIR = join(ROOT, 'public', 'audio');

mkdirSync(OUT_DIR, { recursive: true });

const EPISODES = Array.from({ length: 30 }, (_, i) => i + 1);

let rendered = 0;
let skipped = 0;
let noAudio = 0;
const failed = [];

console.log('');
console.log('═══════════════════════════════════════════');
console.log('  EPSTEIN FILES — RENDER EPISODES WITH AUDIO');
console.log('═══════════════════════════════════════════');
console.log('');

for (const ep of EPISODES) {
  const padded = String(ep).padStart(2, '0');
  const audioFile = join(AUDIO_DIR, `ep_${padded}_voiceover.mp3`);
  const outFile = join(OUT_DIR, `ep_${padded}.mp4`);
  const compositionId = `Episode${padded}`;

  if (!existsSync(audioFile)) {
    console.log(`  ⏭  EP${padded} — no audio yet, skipping`);
    noAudio++;
    continue;
  }

  if (existsSync(outFile)) {
    console.log(`  ⏭  EP${padded} already rendered — skipping`);
    skipped++;
    continue;
  }

  console.log(`  ▶  Rendering EP${padded}...`);

  try {
    execSync(
      `npx remotion render src/index.ts ${compositionId} "${outFile}" --codec=h264 --log=verbose`,
      { cwd: ROOT, stdio: 'inherit' }
    );
    console.log(`  ✓  EP${padded} → out/ep_${padded}.mp4`);
    rendered++;
  } catch (err) {
    console.error(`  ✗  EP${padded} FAILED`);
    failed.push(ep);
  }
}

console.log('');
console.log('═══════════════════════════════════════════');
console.log(`  DONE: ${rendered} rendered | ${skipped} skipped | ${noAudio} awaiting audio | ${failed.length} failed`);
if (failed.length > 0) console.log(`  Failed: ${failed.join(', ')}`);
console.log(`  Output folder: out/`);
console.log('═══════════════════════════════════════════');
console.log('');
