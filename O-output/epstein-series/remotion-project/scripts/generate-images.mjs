/**
 * generate-images.mjs
 * Generates illustrated graphic-novel style portrait images for all 30 episodes
 * using DALL-E 3 via OpenAI API.
 *
 * Setup (PowerShell):
 *   $env:OPENAI_API_KEY="sk-..."
 *   node scripts/generate-images.mjs
 *
 * Outputs: public/images/ep_01_bg.png ... ep_30_bg.png
 *
 * Style: Graphic novel / comic book illustration — detailed inked portrait of key figure,
 * dark cinematic background, investigation board elements, true crime documentary aesthetic.
 */

import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_DIR = join(__dirname, '..', 'public', 'images');
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error('');
  console.error('  ERROR: OpenAI API key not set.');
  console.error('  Run this first in PowerShell:');
  console.error('    $env:OPENAI_API_KEY="sk-..."');
  console.error('');
  process.exit(1);
}

mkdirSync(IMG_DIR, { recursive: true });

// BASE STYLE — applied to every prompt
const BASE_STYLE = `graphic novel illustration style, detailed ink and watercolor portrait,
dark cinematic true crime documentary aesthetic, dramatic crosshatching,
moody blue-gray tones with warm amber accents, investigation board elements in background
(map with red dots and lines, case files, digital clock),
vertical portrait composition 9:16, high detail, no text, no words`;

const EPISODES = [
  {
    ep: 1,
    prompt: `Illustrated portrait of a confident middle-aged man with silver hair and a slight smirk,
wearing a dark suit, looking slightly off-camera, NYC skyline at night behind him with investigation board overlay,
red string connecting points on a map, ${BASE_STYLE}`
  },
  {
    ep: 2,
    prompt: `Cinematic illustration of a grand Palm Beach mansion at dusk, police investigation lights,
an imposing gate with shadows, tropical palms framing the scene, a detective silhouette examining the entrance,
crime scene aesthetic, ${BASE_STYLE}`
  },
  {
    ep: 3,
    prompt: `Illustrated portrait of an elegant aristocratic woman with dark hair and sharp features,
wearing pearl necklace and dark blazer, British manor library background, shadows across her face,
cold calculating expression, court documents visible behind her, ${BASE_STYLE}`
  },
  {
    ep: 4,
    prompt: `Aerial illustrated view of a small tropical island at night surrounded by dark ocean,
mysterious temple-like structure on a hill with golden lights, satellite dish silhouette,
storm clouds gathering, ominous isolated atmosphere, surveillance aesthetic, ${BASE_STYLE}`
  },
  {
    ep: 5,
    prompt: `Interior of a luxury private jet at night, leather seats, open flight log book
with names listed, windows showing city lights far below, shadowy passenger silhouettes,
investigation overlay with route lines on a map, ${BASE_STYLE}`
  },
  {
    ep: 6,
    prompt: `Illustrated portrait of a determined police detective at a desk covered in case files,
a cork board behind him with 36 photographs connected by red string, Palm Beach police station interior,
harsh desk lamp light, folders labeled VICTIMS, ${BASE_STYLE}`
  },
  {
    ep: 7,
    prompt: `Illustrated portrait of a young brave woman with determined eyes and strong posture,
standing in a courthouse corridor, holding a thick legal document, justice scales on the wall behind,
sunlight through tall windows cutting dramatic shadows, ${BASE_STYLE}`
  },
  {
    ep: 8,
    prompt: `Empty deposition room, a microphone on a polished table, a chair in spotlight,
stacked legal documents, the number 188 appearing ghost-like on the wall,
court reporter equipment, dramatic shadows, silent and oppressive atmosphere, ${BASE_STYLE}`
  },
  {
    ep: 9,
    prompt: `A massive thick legal memo labeled PROSECUTION MEMORANDUM 205 PAGES in a government office,
stack of evidence folders, FBI seal visible, a hand stamping the document SEALED,
rows of redacted pages, single desk lamp, ${BASE_STYLE}`
  },
  {
    ep: 10,
    prompt: `Illustrated portrait of a sharp-suited government attorney signing a document at a mahogany desk,
American flag in the background, a sealed envelope labeled NON-PROSECUTION AGREEMENT,
victims' faces ghosted into the shadows behind him, sense of betrayal, ${BASE_STYLE}`
  },
  {
    ep: 11,
    prompt: `Two shadowy powerful figures shaking hands across a table covered in legal documents,
their faces obscured by shadows, American flag in the corner, quote text ghosted on the wall:
ABOVE MY PAY GRADE, dark government office, sense of a secret deal, ${BASE_STYLE}`
  },
  {
    ep: 12,
    prompt: `Illustrated portrait of a shadowy intelligence figure at a dark briefing table,
CLASSIFIED stamps on stacked folders, CIA-style backdrop, redacted documents with heavy black bars,
a magnifying glass revealing partial hidden text underneath, espionage atmosphere, ${BASE_STYLE}`
  },
  {
    ep: 13,
    prompt: `Four dossier folders laid out on a table, each with a silhouetted portrait photo,
IMMUNITY GRANTED stamped in red across each folder, government office,
a fifth folder with a thick black redaction bar over the name, dramatic single spotlight, ${BASE_STYLE}`
  },
  {
    ep: 14,
    prompt: `A jail cell that looks more like an office suite — desk, telephone, window with golden sunlight,
iron bars barely visible, a man in suit walking freely through open gate,
a sheriff's deputy escort nearby, ironic comfortable prison aesthetic, ${BASE_STYLE}`
  },
  {
    ep: 15,
    prompt: `A decade timeline spanning a full wall from 2009 to 2019, red pins at key events,
newspaper headlines pinned alongside, silhouettes of powerful figures moving freely,
a journalist's determined silhouette at the end of the timeline, ${BASE_STYLE}`
  },
  {
    ep: 16,
    prompt: `Illustrated portrait of a middle-aged man with royal bearing and anxious expression,
British crown and palace corridor background, a photograph being held up in court,
the number 67 prominent in the background, shadows of legal documents, ${BASE_STYLE}`
  },
  {
    ep: 17,
    prompt: `Illustrated portrait of an older distinguished man with intense eyes and white hair,
Harvard Law library behind him with law books floor to ceiling, deposition documents in front of him,
accusation text ghosted in the shadows, a legal scale tipping dramatically, ${BASE_STYLE}`
  },
  {
    ep: 18,
    prompt: `An aviation flight log book open on a private jet seat, passenger names visible in ink,
a world map overlay with animated flight routes connecting New York / Palm Beach / Island / Europe,
the number of flights beside each name, ${BASE_STYLE}`
  },
  {
    ep: 19,
    prompt: `Illustrated portrait of a former US president's silhouette at a podium,
a private jet in the background, the White House visible through a window,
a damning email document on the desk in front, 26 flight logs fanned out, ${BASE_STYLE}`
  },
  {
    ep: 20,
    prompt: `Aerial illustration of a vast remote New Mexico ranch at dusk, 7500 acres of desert,
long driveway disappearing into darkness, FBI search vehicles arriving, floodlights scanning the compound,
victim testimony text ghosted over the landscape, ${BASE_STYLE}`
  },
  {
    ep: 21,
    prompt: `Illustrated portrait of a man in handcuffs being escorted by FBI agents on an airport tarmac at night,
private jet behind them with landing lights, dramatic low-angle composition,
silhouettes of law enforcement, Teterboro airport atmosphere, ${BASE_STYLE}`
  },
  {
    ep: 22,
    prompt: `Metropolitan Correctional Center cell block at 3am, a guard slumped asleep at a desk,
one cell at the end of the corridor lit by faint light, a clock on the wall showing 10:30 PM,
security camera with NO SIGNAL on screen, silence and dread, ${BASE_STYLE}`
  },
  {
    ep: 23,
    prompt: `A prison cell at 6:30am, sunlight cutting through bars, an overturned tray,
two conflicting medical report pages side by side — SUICIDE vs HOMICIDE,
a hyoid bone medical diagram in the corner, the silence of aftermath, ${BASE_STYLE}`
  },
  {
    ep: 24,
    prompt: `Two forensic pathologists facing each other across an autopsy table,
both in silhouette, competing medical reports on either side,
the words SUICIDE and HOMICIDAL STRANGULATION on two screens behind them,
cold clinical lighting, medical examiner's office, ${BASE_STYLE}`
  },
  {
    ep: 25,
    prompt: `Two prison guards in silhouette at their workstation, one browsing the internet on a computer,
CCTV monitors behind them showing static, a falsified check log on the desk,
empty corridors visible on the monitors, night shift dereliction, ${BASE_STYLE}`
  },
  {
    ep: 26,
    prompt: `Illustrated portrait of an aristocratic woman in a federal courtroom,
prisoner's dock, expressionless face, the jury box behind her with 12 silhouetted jurors,
GUILTY verdict projected on the wall, Brooklyn federal court grandeur, ${BASE_STYLE}`
  },
  {
    ep: 27,
    prompt: `Thousands of court documents raining down from a courthouse ceiling over a Manhattan cityscape,
a crowd of journalists and citizens reaching up to catch them,
some pages glowing with highlighted names, the words 950 PAGES visible, breaking news energy, ${BASE_STYLE}`
  },
  {
    ep: 28,
    prompt: `A warehouse filled floor to ceiling with document boxes labeled EPSTEIN FILES,
a presidential figure signing a law at a podium in the distance,
a progress bar showing 3.5M released vs 2.5M sealed, DOJ building exterior at night, ${BASE_STYLE}`
  },
  {
    ep: 29,
    prompt: `A document with almost every line heavily redacted in black bars,
a hand pulling back a corner of one redaction to reveal a few words underneath,
surrounded by darkness, question marks floating in the shadows,
the words STILL CLASSIFIED glowing faintly, ${BASE_STYLE}`
  },
  {
    ep: 30,
    prompt: `An empty spotlight chair at the center of a vast dark space,
all the faces and figures from the case floating ghostlike in the shadows around it —
Epstein, Maxwell, anonymous victims, powerful silhouettes,
the question WHO PROTECTED HIM formed by shadows on the floor,
final haunting composition, ${BASE_STYLE}`
  }
];

console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('  THE EPSTEIN FILES — DALL-E 3 IMAGE GENERATION');
console.log('  Style: Graphic Novel Portrait / True Crime Illustration');
console.log(`  Episodes: ${EPISODES.length}`);
console.log('═══════════════════════════════════════════════════════');
console.log('');

let success = 0;
let skipped = 0;
const failed = [];

for (const { ep, prompt } of EPISODES) {
  const padded = String(ep).padStart(2, '0');
  const outPath = join(IMG_DIR, `ep_${padded}_bg.png`);

  if (existsSync(outPath)) {
    console.log(`  ⏭  EP${padded} — already exists, skipping`);
    skipped++;
    continue;
  }

  console.log(`  ▶  EP${padded} generating...`);

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1792',
        quality: 'hd',
        style: 'vivid',
        response_format: 'url',
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(`API ${response.status}: ${err?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) throw new Error('Failed to download image');

    const nodeStream = Readable.fromWeb(imgRes.body);
    await pipeline(nodeStream, createWriteStream(outPath));

    console.log(`  ✓  EP${padded} → public/images/ep_${padded}_bg.png`);
    success++;

    // DALL-E 3 rate limit: 5 images/min on standard tier → wait 13s
    if (ep < EPISODES[EPISODES.length - 1].ep) {
      console.log(`      (waiting 13s for rate limit...)`);
      await new Promise(r => setTimeout(r, 13000));
    }

  } catch (err) {
    console.error(`  ✗  EP${padded} FAILED: ${err.message}`);
    failed.push(ep);
    // Short wait before next attempt even on failure
    await new Promise(r => setTimeout(r, 2000));
  }
}

console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log(`  COMPLETE`);
console.log(`  ✓ Generated: ${success}`);
console.log(`  ⏭ Skipped:  ${skipped}`);
console.log(`  ✗ Failed:   ${failed.length}${failed.length > 0 ? ' → episodes ' + failed.join(', ') : ''}`);
console.log(`  Output: remotion-project/public/images/`);
console.log('═══════════════════════════════════════════════════════');
console.log('');
