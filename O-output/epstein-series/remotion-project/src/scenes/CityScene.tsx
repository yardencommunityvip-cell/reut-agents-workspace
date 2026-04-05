import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const CityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const panX = interpolate(frame, [0, durationInFrames], [0, -80]);
  const moonY = interpolate(frame, [0, durationInFrames], [0, -25]);

  // Window flicker — high base opacity so windows are always visible
  const flicker = (seed: number) =>
    0.5 + Math.sin(frame * 0.12 + seed) * 0.35;

  // Red warning light blink on skyscraper tips
  const blink = Math.floor(frame / 20) % 2;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010510" />
          <stop offset="45%" stopColor="#060e22" />
          <stop offset="80%" stopColor="#1a1000" />
          <stop offset="100%" stopColor="#2a1500" />
        </linearGradient>
        <linearGradient id="cityGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A951" stopOpacity="0" />
          <stop offset="100%" stopColor="#C8A951" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8d5a0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="winGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Night sky */}
      <rect width="1080" height="1920" fill="url(#sky)" />

      {/* Stars — bright enough to see */}
      {[...Array(80)].map((_, i) => (
        <circle key={i}
          cx={(i * 173) % 1080}
          cy={(i * 97) % 600}
          r={Math.sin(i * 2) > 0.5 ? 2 : 1}
          fill="white"
          opacity={0.35 + Math.sin(frame * 0.06 + i) * 0.3}
        />
      ))}

      {/* Moon with glow halo */}
      <g transform={`translate(0, ${moonY})`} filter="url(#softGlow)">
        <circle cx="830" cy="160" r="70" fill="#e8d5a0" opacity="0.9" />
        <circle cx="808" cy="143" r="70" fill="#060e22" opacity="1" />
      </g>

      {/* Amber city horizon glow */}
      <ellipse cx="540" cy="1920" rx="700" ry="400" fill="#C8A951" opacity="0.12" filter="url(#softGlow)" />

      {/* City skyline — tall buildings filling the frame */}
      <g transform={`translate(${panX}, 0)`}>

        {/* === BACK ROW — shorter buildings, start high === */}

        {/* Back bldg A */}
        <rect x="-60" y="600" width="90" height="1320" fill="#111828" />
        {[...Array(16)].map((_, i) => (
          <rect key={i} x={-52 + (i % 3) * 26} y={615 + Math.floor(i / 3) * 80}
            width="16" height="50" rx="2"
            fill="#C8A951" opacity={flicker(i * 4) * 0.7} filter="url(#winGlow)" />
        ))}

        {/* Back bldg B */}
        <rect x="200" y="700" width="80" height="1220" fill="#0e1624" />
        {[...Array(12)].map((_, i) => (
          <rect key={i} x={208 + (i % 3) * 22} y={715 + Math.floor(i / 3) * 85}
            width="14" height="52" rx="2"
            fill="#C8A951" opacity={flicker(i * 6 + 2) * 0.65} />
        ))}

        {/* Back bldg C */}
        <rect x="600" y="650" width="100" height="1270" fill="#0d1520" />
        {[...Array(18)].map((_, i) => (
          <rect key={i} x={608 + (i % 3) * 28} y={668 + Math.floor(i / 3) * 82}
            width="18" height="50" rx="2"
            fill="#C8A951" opacity={flicker(i * 5 + 7) * 0.7} />
        ))}

        {/* Back bldg D */}
        <rect x="960" y="720" width="110" height="1200" fill="#111e2e" />
        {[...Array(15)].map((_, i) => (
          <rect key={i} x={968 + (i % 3) * 30} y={735 + Math.floor(i / 3) * 80}
            width="20" height="48" rx="2"
            fill="#C8A951" opacity={flicker(i * 8 + 3) * 0.7} />
        ))}

        {/* === MAIN ROW — dominant buildings === */}

        {/* BUILDING 1 — far left, tall */}
        <rect x="-30" y="380" width="145" height="1540" fill="#182030" />
        {/* Stepped top */}
        <rect x="-10" y="340" width="105" height="50" fill="#141c28" />
        <rect x="10" y="300" width="65" height="50" fill="#101820" />
        <rect x="30" y="270" width="25" height="35" fill="#C8A951" opacity="0.8" />
        {/* Windows — large and bright */}
        {[...Array(45)].map((_, i) => (
          <rect key={i} x={-18 + (i % 5) * 26} y={395 + Math.floor(i / 5) * 54}
            width="18" height="36" rx="2"
            fill="#C8A951" opacity={flicker(i * 3 + 1)} filter="url(#winGlow)" />
        ))}

        {/* BUILDING 2 — medium left */}
        <rect x="130" y="550" width="200" height="1370" fill="#1a2538" />
        {/* Top setback */}
        <rect x="150" y="520" width="160" height="40" fill="#14202e" />
        <rect x="180" y="490" width="100" height="35" fill="#101a28" />
        {[...Array(42)].map((_, i) => (
          <rect key={i} x={138 + (i % 6) * 30} y={560 + Math.floor(i / 6) * 55}
            width="20" height="38" rx="2"
            fill="#C8A951" opacity={flicker(i * 7 + 2)} filter="url(#winGlow)" />
        ))}

        {/* BUILDING 3 — HERO CENTER SKYSCRAPER */}
        <rect x="350" y="120" width="200" height="1800" fill="#0e1828" />
        {/* Setback 1 */}
        <rect x="380" y="90" width="140" height="40" fill="#0c1622" />
        {/* Setback 2 */}
        <rect x="400" y="50" width="100" height="48" fill="#0a1420" />
        {/* Antenna */}
        <line x1="450" y1="0" x2="450" y2="55" stroke="#C8A951" strokeWidth="3" opacity="0.8" />
        <circle cx="450" cy="2" r="5" fill="#ff2200" opacity={blink === 0 ? 0.9 : 0.1} />
        {/* Observation deck / crown */}
        <rect x="370" y="100" width="160" height="25" fill="#C8A951" opacity="0.25" />
        {/* Windows — lots of them */}
        {[...Array(60)].map((_, i) => (
          <rect key={i} x={358 + (i % 5) * 36} y={140 + Math.floor(i / 5) * 55}
            width="24" height="38" rx="2"
            fill="#C8A951" opacity={flicker(i * 11 + 5)} filter="url(#winGlow)" />
        ))}
        {/* Special bright floors */}
        <rect x="352" y="480" width="196" height="18" fill="#C8A951" opacity="0.4" />
        <rect x="352" y="900" width="196" height="18" fill="#C8A951" opacity="0.35" />

        {/* BUILDING 4 — right of center */}
        <rect x="565" y="350" width="180" height="1570" fill="#162030" />
        {/* Crown */}
        <rect x="580" y="310" width="150" height="45" fill="#121c28" />
        <rect x="600" y="275" width="110" height="40" fill="#0e1824" />
        <rect x="640" y="245" width="30" height="35" fill="#C8A951" opacity="0.7" />
        <circle cx="655" cy="240" r="5" fill="#ff2200" opacity={blink === 1 ? 0.9 : 0.1} />
        {[...Array(48)].map((_, i) => (
          <rect key={i} x={573 + (i % 5) * 32} y={365 + Math.floor(i / 5) * 52}
            width="22" height="36" rx="2"
            fill="#C8A951" opacity={flicker(i * 9 + 4)} filter="url(#winGlow)" />
        ))}

        {/* BUILDING 5 — right */}
        <rect x="760" y="480" width="160" height="1440" fill="#1a2a40" />
        {/* Top */}
        <rect x="780" y="445" width="120" height="42" fill="#142032" />
        <rect x="800" y="415" width="80" height="35" fill="#10182a" />
        {[...Array(36)].map((_, i) => (
          <rect key={i} x={768 + (i % 4) * 36} y={495 + Math.floor(i / 4) * 58}
            width="24" height="40" rx="2"
            fill="#C8A951" opacity={flicker(i * 13 + 6)} filter="url(#winGlow)" />
        ))}

        {/* BUILDING 6 — far right */}
        <rect x="940" y="280" width="220" height="1640" fill="#121e30" />
        {/* Stepped crown */}
        <rect x="960" y="240" width="180" height="45" fill="#0e1828" />
        <rect x="990" y="200" width="120" height="48" fill="#0a1422" />
        <rect x="1020" y="165" width="60" height="40" fill="#060e1a" />
        <line x1="1050" y1="120" x2="1050" y2="170" stroke="#C8A951" strokeWidth="3" opacity="0.7" />
        <circle cx="1050" cy="118" r="5" fill="#ff2200" opacity={blink === 0 ? 0.9 : 0.1} />
        {[...Array(50)].map((_, i) => (
          <rect key={i} x={948 + (i % 6) * 32} y={295 + Math.floor(i / 6) * 54}
            width="22" height="38" rx="2"
            fill="#C8A951" opacity={flicker(i * 17 + 8)} filter="url(#winGlow)" />
        ))}

        {/* Extra wide building far right */}
        <rect x="1180" y="420" width="180" height="1500" fill="#16222e" />
        {[...Array(30)].map((_, i) => (
          <rect key={i} x={1188 + (i % 4) * 40} y={435 + Math.floor(i / 4) * 58}
            width="26" height="40" rx="2"
            fill="#C8A951" opacity={flicker(i * 7 + 9)} filter="url(#winGlow)" />
        ))}

        {/* Ground floor — storefronts glow */}
        <rect x="-60" y="1830" width="1400" height="90" fill="#0a0800" />
        {[...Array(14)].map((_, i) => (
          <rect key={i} x={-40 + i * 105} y={1835} width="85" height="55"
            fill="#C8A951" opacity={0.12 + Math.sin(frame * 0.04 + i) * 0.06} />
        ))}

        {/* Amber reflection on ground */}
        <rect x="-60" y="1880" width="1400" height="40" fill="#C8A951" opacity="0.06" />
      </g>

      {/* City horizon glow layer */}
      <rect x="0" y="1700" width="1080" height="220" fill="url(#cityGlow)" />

      {/* Foreground silhouette — man at window, bottom center */}
      <g opacity="0.97">
        {/* Window frame lines — subtle gold */}
        <line x1="380" y1="1560" x2="380" y2="1920" stroke="#C8A951" strokeWidth="2" opacity="0.2" />
        <line x1="700" y1="1560" x2="700" y2="1920" stroke="#C8A951" strokeWidth="2" opacity="0.2" />
        <line x1="380" y1="1560" x2="700" y2="1560" stroke="#C8A951" strokeWidth="2" opacity="0.2" />
        {/* Man silhouette */}
        <ellipse cx="540" cy="1620" rx="48" ry="58" fill="#030608" />
        <rect x="478" y="1672" width="124" height="248" rx="25" fill="#030608" />
        {/* Shoulders width */}
        <rect x="450" y="1690" width="65" height="20" rx="8" fill="#030608" />
        <rect x="565" y="1690" width="65" height="20" rx="8" fill="#030608" />
      </g>

      {/* Vignette — lighter than before */}
      <defs>
        <radialGradient id="vig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#vig)" />
    </svg>
  );
};
