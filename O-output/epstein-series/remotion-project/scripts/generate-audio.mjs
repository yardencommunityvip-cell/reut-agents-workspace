/**
 * generate-audio.mjs
 * Generates all 30 voiceover MP3s via the ElevenLabs API.
 *
 * Setup:
 *   1. npm install node-fetch
 *   2. Set env variable: ELEVENLABS_API_KEY=your_key_here
 *   3. Run: node scripts/generate-audio.mjs
 *
 * Outputs files to: public/audio/ep_01_voiceover.mp3 ... ep_30_voiceover.mp3
 */

import { createWriteStream, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const episodes = require('../../ALL_30_EPISODES_MASTER.json');

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = join(__dirname, '..', 'public', 'audio');
const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam

if (!API_KEY) {
  console.error('ERROR: Set ELEVENLABS_API_KEY environment variable first.');
  console.error('  Windows: set ELEVENLABS_API_KEY=your_key_here');
  console.error('  Then run: node scripts/generate-audio.mjs');
  process.exit(1);
}

mkdirSync(AUDIO_DIR, { recursive: true });

console.log('');
console.log('═══════════════════════════════════════════');
console.log('  ELEVENLABS BATCH AUDIO GENERATION');
console.log(`  ${episodes.length} episodes`);
console.log('═══════════════════════════════════════════');
console.log('');

let success = 0;
let failed = [];

for (const ep of episodes) {
  const padded = String(ep.episode).padStart(2, '0');
  const outPath = join(AUDIO_DIR, `ep_${padded}_voiceover.mp3`);

  console.log(`  ▶  EP${padded}: ${ep.title}`);

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: ep.voiceover_script,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.80,
            style: 0.35,
            use_speaker_boost: true,
            speaking_rate: 0.92,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API error ${response.status}: ${err}`);
    }

    const nodeStream = Readable.fromWeb(response.body);
    await pipeline(nodeStream, createWriteStream(outPath));
    console.log(`  ✓  Saved: ep_${padded}_voiceover.mp3`);
    success++;

    // Rate limit: ElevenLabs allows ~2 req/sec on paid plans
    await new Promise(r => setTimeout(r, 600));

  } catch (err) {
    console.error(`  ✗  EP${padded} FAILED: ${err.message}`);
    failed.push(ep.episode);
  }
}

console.log('');
console.log('═══════════════════════════════════════════');
console.log(`  COMPLETE: ${success} generated, ${failed.length} failed`);
if (failed.length > 0) {
  console.log(`  Failed: episodes ${failed.join(', ')}`);
  console.log('  Re-run the script — it will skip existing files.');
}
console.log('═══════════════════════════════════════════');
console.log('');
