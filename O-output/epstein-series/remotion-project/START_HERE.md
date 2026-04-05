# Epstein Files Series — Quick Start

## Prerequisites (one-time setup)

1. **Install Node.js** (if not installed): https://nodejs.org → download LTS version

2. **Open terminal in this folder:**
   - Right-click the `remotion-project` folder
   - Select "Open in Terminal" or "Git Bash here"

3. **Install dependencies:**
   ```
   npm install
   ```

---

## Step 1: Generate Audio (ElevenLabs)

1. Go to https://elevenlabs.io → create account → get API key
2. In terminal:
   ```
   set ELEVENLABS_API_KEY=your_key_here
   node scripts/generate-audio.mjs
   ```
3. Wait ~20 minutes — all 30 MP3s save to `public/audio/`

---

## Step 2: Preview in Browser

```
npm run start
```
Opens Remotion Studio at http://localhost:3000
Browse all 30 episodes, scrub through, verify everything looks right.

---

## Step 3: Render All Videos

```
node scripts/render-all.mjs
```
Renders all 30 episodes to `out/ep_01.mp4` through `out/ep_30.mp4`
Takes ~1–2 minutes per episode (30–60 min total)

### Or render a single episode:
```
node scripts/render-episode.mjs 1
```

---

## Output Files

All rendered videos appear in the `out/` folder:
```
out/
├── ep_01.mp4   The Man Who Shouldn't Exist
├── ep_02.mp4   The Palm Beach House
├── ...
└── ep_30.mp4   What We Still Don't Know
```

Format: 1080×1920 (9:16 vertical), 60 seconds, H.264 MP4
Ready to upload directly to TikTok / Reels / YouTube Shorts.

---

## Posting Schedule

Upload 2 episodes per day → series complete in 15 days.

Caption template (in `../PRODUCTION_GUIDE.md`).

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `npm install` fails | Make sure Node.js is installed |
| Audio missing in preview | Run `generate-audio.mjs` first |
| ElevenLabs API error | Check API key, check account credit |
| Render crashes | Try `node scripts/render-episode.mjs 1` to test one |
| Video too long/short | Adjust `DURATION_SECONDS` in `src/Root.tsx` |
