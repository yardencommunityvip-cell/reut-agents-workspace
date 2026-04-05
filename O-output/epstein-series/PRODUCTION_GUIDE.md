# Epstein Files — 30-Part Micro-Drama Series
## Production Guide

---

## Series Overview

| Property | Value |
|---|---|
| Episodes | 30 |
| Format | 60-second vertical video (9:16) |
| Language | English |
| Target Platforms | TikTok / Instagram Reels / YouTube Shorts |
| Voice | ElevenLabs — Adam (deep, authoritative) |
| Animation | Remotion 4.x |
| Content basis | Court documents, sworn testimony, DOJ releases — all public record |

---

## File Structure

```
epstein-series/
├── ALL_30_EPISODES_MASTER.json     ← Single source of truth, all 30 episodes
├── episodes_01_05.json             ← Episodes 1–5
├── episodes_06_10.json             ← Episodes 6–10
├── episodes_11_15.json             ← Episodes 11–15
├── episodes_16_20.json             ← Episodes 16–20
├── episodes_21_25.json             ← Episodes 21–25
├── episodes_26_30.json             ← Episodes 26–30
├── elevenlabs_config.json          ← ElevenLabs voice settings + batch config
├── remotion_config.json            ← Remotion templates + design system
└── PRODUCTION_GUIDE.md             ← This file
```

---

## Series Arc

| Block | Episodes | Story Thread |
|---|---|---|
| The Empire | 1–5 | Who is Epstein, Palm Beach, Maxwell, the island, the plane |
| The Victims | 6–10 | 36 girls, Giuffre, Maxwell's deposition, 205 pages, the betrayal |
| The Deal | 11–15 | The NPA, intelligence claim, 4 names, the private jail, freedom |
| The Names | 16–20 | Andrew, Dershowitz, flight logs decoded, Clinton, Zorro Ranch |
| The Death | 21–25 | Arrest 2019, suicide watch removed, Aug 10, medical dispute, guards |
| The Aftermath | 26–30 | Maxwell trial, Jan 2024 papers, Transparency Act, hidden files, finale |

---

## Step 1: Generate Audio with ElevenLabs

1. Open `elevenlabs_config.json` for voice settings
2. For each episode in `ALL_30_EPISODES_MASTER.json`:
   - Use field: `voiceover_script`
   - Voice: Adam (`pNInz6obpgDQGcFmaJgB`)
   - Output: `ep_01_voiceover.mp3` through `ep_30_voiceover.mp3`
3. Target duration per episode: ~52–58 seconds
4. If any episode runs long, slow down speaking_rate to 0.88

**ElevenLabs API batch call (Node.js):**
```js
const episodes = require('./ALL_30_EPISODES_MASTER.json');
const ElevenLabs = require('elevenlabs-node');

const voice = new ElevenLabs({ apiKey: process.env.ELEVENLABS_API_KEY });

for (const ep of episodes) {
  await voice.textToSpeech({
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    text: ep.voiceover_script,
    modelId: 'eleven_multilingual_v2',
    outputPath: `./audio/ep_${String(ep.episode).padStart(2,'0')}_voiceover.mp3`
  });
}
```

---

## Step 2: Build Visuals with Remotion

1. Open `remotion_config.json` for design system and template definitions
2. Each episode has a `remotion_template` field — map to the corresponding template
3. Each episode has `visual_prompts` — these drive the asset list per episode
4. Use `design_system.color_palette` for all components

**Required assets per episode:**
- Background image or document (from `visual_prompts[0]`)
- Key highlight text (from `visual_prompts[1–3]`)
- Episode badge (auto-generated from template)
- Lower third source citation (from episode data)

---

## Step 3: Music

Map `music_vibe` to royalty-free track categories:

| Vibe | Recommended Style |
|---|---|
| Minimalist piano, slow burn | Hans Zimmer — ambient style |
| Rising tension | Thriller underscore, no melody |
| Sad, heavy, solo piano | Sad piano, single instrument |
| Cold, minimalist | Sparse strings, no percussion |
| Espionage, cold ambient | Synth pad, minor key |
| Urgent, fast, clock ticking | Percussion only, accelerating |
| Breaking news energy | Staccato brass |
| Documentary closing | Full orchestral, slow swell |

Recommended source: **Epidemic Sound** or **Artlist.io**
Volume: 15% under voiceover (set in `remotion_config.json → audio_sync`)

---

## Step 4: Thumbnails

Per `remotion_config.json → thumbnail_spec`:
- 1080x1920 portrait
- Dark background + dramatic document or public image
- Bold white title, gold episode number badge
- One line hook — most striking sentence from `voiceover_script`
- Font: Playfair Display Bold

**Suggested hook lines per episode:**

| EP | Thumbnail Hook |
|---|---|
| 1 | "No degree. No license. One of the wealthiest men on earth." |
| 2 | "36 girls. Same story. Nobody stopped it." |
| 3 | "She said 'I don't recall' — 188 times." |
| 4 | "The island. 180,000 images. Still being processed." |
| 5 | "26 flights. Never questioned." |
| 10 | "The victims were never told." |
| 11 | "Above my pay grade." |
| 12 | "Epstein belonged to the intelligence community." |
| 14 | "He paid for his own guards." |
| 23 | "The camera outside his cell: not functioning." |
| 24 | "50 years of investigations. Never seen this fracture pattern." |
| 30 | "3.5 million pages. One answer still missing." |

---

## Step 5: Distribution

**Posting cadence:** 2 episodes/day = series complete in 15 days

**Caption template:**
```
EP {N}/30 — {TITLE}

Everything in this episode comes from public court documents,
sworn testimony, and official DOJ releases.

Sources in bio.

#EpsteinFiles #TrueCrime #CourtDocuments #{EPISODE_KEYWORD}
```

**Hashtag rotation:**
- EpsteinFiles / EpsteinDocuments / TrueCrime
- JeffreyEpstein / GhislaineMaxwell
- CourtDocuments / PublicRecord
- Episode-specific: #PrinceAndrew / #LolitaExpress / #ZorroRanch

---

## Legal Note

All content in this series is derived from:
- Public court filings (Giuffre v. Maxwell, SDNY)
- Federal indictments (US v. Maxwell, 2020)
- DOJ published records (justice.gov/epstein)
- Sworn testimony entered into evidence
- Published journalism (Miami Herald, NYT, PBS, NPR)

No speculation is presented as fact. Allegations are labeled as allegations.
Settled cases are presented with their outcomes.
