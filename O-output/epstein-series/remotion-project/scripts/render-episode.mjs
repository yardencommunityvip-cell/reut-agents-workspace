/**
 * render-episode.mjs
 * Renders a single episode by number.
 * Usage: node scripts/render-episode.mjs 1
 *        node scripts/render-episode.mjs 12
 */

import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const epArg = process.argv[2];
if (!epArg) {
  console.error('Usage: node scripts/render-episode.mjs <episode_number>');
  console.error('Example: node scripts/render-episode.mjs 5');
  process.exit(1);
}

const ep = parseInt(epArg, 10);
if (isNaN(ep) || ep < 1 || ep > 30) {
  console.error('Episode number must be between 1 and 30');
  process.exit(1);
}

const padded = String(ep).padStart(2, '0');
const compositionId = `Episode${padded}`;
const outFile = join(ROOT, 'out', `ep_${padded}.mp4`);

console.log(`Rendering Episode ${padded}: ${compositionId}`);
console.log(`Output: ${outFile}`);
console.log('');

try {
  execSync(
    `npx remotion render src/index.ts ${compositionId} ${outFile} --codec=h264`,
    { cwd: ROOT, stdio: 'inherit' }
  );
  console.log(`\n✓ Done: out/ep_${padded}.mp4`);
} catch {
  console.error(`\n✗ Render failed for episode ${ep}`);
  process.exit(1);
}
