import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const AirportScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const panX = interpolate(frame, [0, durationInFrames], [0, -40]);
  const planeApproach = interpolate(frame, [0, durationInFrames * 0.6], [1200, 200], { extrapolateRight: 'clamp' });
  const lightStrobe = Math.floor(frame / 8) % 3 === 0;
  const engineGlow = 0.5 + Math.sin(frame * 0.2) * 0.15;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="aSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010306" />
          <stop offset="60%" stopColor="#020510" />
          <stop offset="100%" stopColor="#040710" />
        </linearGradient>
        <linearGradient id="aTarmac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0e10" />
          <stop offset="100%" stopColor="#080809" />
        </linearGradient>
        <filter id="aBlue">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="aRed">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Night sky */}
      <rect width="1080" height="1920" fill="url(#aSky)" />

      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <circle key={i}
          cx={(i * 211) % 1080} cy={(i * 67) % 500}
          r={0.8} fill="white"
          opacity={0.2 + Math.sin(frame * 0.05 + i) * 0.15}
        />
      ))}

      {/* City glow on horizon */}
      <ellipse cx="540" cy="900" rx="600" ry="150"
        fill="#C8A951" opacity="0.04"
      />

      {/* Tarmac */}
      <rect x="0" y="900" width="1080" height="1020" fill="url(#aTarmac)" />
      <rect x="0" y="898" width="1080" height="5" fill="#1a1c1e" />

      {/* Runway markings */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i}
          x={200 + i * 85}
          y="920" width="50" height="12" rx="2"
          fill="#fff" opacity="0.08"
        />
      ))}

      {/* Runway center line */}
      {[...Array(12)].map((_, i) => (
        <rect key={i}
          x={530}
          y={900 + i * 120}
          width="20" height="60" rx="2"
          fill="#fff" opacity="0.06"
        />
      ))}

      {/* Runway lights - left side */}
      {[...Array(10)].map((_, i) => (
        <circle key={i}
          cx={80}
          cy={950 + i * 100}
          r="8"
          fill="#4040ff"
          opacity={0.6 + Math.sin(frame * 0.1 + i) * 0.2}
          filter="url(#aBlue)"
        />
      ))}

      {/* Runway lights - right side */}
      {[...Array(10)].map((_, i) => (
        <circle key={i}
          cx={1000}
          cy={950 + i * 100}
          r="8"
          fill="#4040ff"
          opacity={0.6 + Math.sin(frame * 0.1 + i + 3) * 0.2}
          filter="url(#aBlue)"
        />
      ))}

      {/* The private jet - parked / just landed */}
      <g transform={`translate(${panX}, 0)`}>
        {/* Jet body */}
        <ellipse cx="540" cy="760" rx="320" ry="55" fill="#0d0e10" />
        {/* Nose */}
        <ellipse cx="855" cy="760" rx="15" ry="35" fill="#0a0b0d" />
        {/* Tail */}
        <ellipse cx="220" cy="760" rx="20" ry="30" fill="#0a0b0d" />
        {/* Tail fin */}
        <path d="M 200 760 L 230 600 L 270 760 Z" fill="#0d0e10" />
        {/* Wings */}
        <path d="M 450 770 L 300 900 L 400 910 L 550 800 Z" fill="#0a0b0c" />
        <path d="M 650 770 L 780 900 L 700 910 L 600 800 Z" fill="#0a0b0c" />

        {/* Jet windows - illuminated */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse key={i}
            cx={420 + i * 60} cy="750"
            rx="14" ry="10"
            fill="#C8A951"
            opacity={0.3 + Math.sin(frame * 0.08 + i) * 0.1}
          />
        ))}

        {/* Landing lights on nose - blinding white */}
        <circle cx="870" cy="760" r="20"
          fill="#ffffff"
          opacity={engineGlow * 0.8}
          filter="url(#aBlue)"
        />

        {/* Engine heat glow */}
        <ellipse cx="310" cy="880" rx="30" ry="12"
          fill="#ff6600" opacity={engineGlow * 0.3} filter="url(#aRed)" />
        <ellipse cx="770" cy="880" rx="30" ry="12"
          fill="#ff6600" opacity={engineGlow * 0.25} filter="url(#aRed)" />

        {/* Registration N908JE on tail */}
        <text x="230" y="660" fill="#888" fontSize="14" fontFamily="'Courier New', monospace" opacity="0.5">N908JE</text>

        {/* Stairs lowering from plane */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i}
            x1={640 + i * 25} y1={785 + i * 25}
            x2={640 + i * 25 + 20} y2={785 + i * 25}
            stroke="#1a1c1e" strokeWidth="4"
          />
        ))}
        <line x1="640" y1="785" x2="740" y2="910" stroke="#1a1c1e" strokeWidth="4" />
        <line x1="660" y1="785" x2="760" y2="910" stroke="#1a1c1e" strokeWidth="4" />
      </g>

      {/* FBI vehicles - flashing lights */}
      {/* Vehicle 1 */}
      <g transform="translate(150, 930)">
        <rect x="0" y="0" width="160" height="60" rx="8" fill="#0a0c10" />
        <rect x="10" y="-15" width="140" height="20" rx="4" fill="#0d0e12" />
        <circle cx="30" cy="65" r="18" fill="#0a0c10" />
        <circle cx="130" cy="65" r="18" fill="#0a0c10" />
        {/* FBI text */}
        <text x="55" y="35" fill="#C8A951" fontSize="16" fontFamily="'Courier New', monospace" fontWeight="bold" opacity="0.7">F.B.I.</text>
        {/* Strobe lights */}
        <rect x="20" y="-18" width="25" height="12" rx="3"
          fill={lightStrobe ? '#ff0000' : '#330000'}
          opacity="0.8"
          filter="url(#aRed)"
        />
        <rect x="115" y="-18" width="25" height="12" rx="3"
          fill={!lightStrobe ? '#0000ff' : '#000033'}
          opacity="0.8"
          filter="url(#aBlue)"
        />
      </g>

      {/* Vehicle 2 */}
      <g transform="translate(750, 950)">
        <rect x="0" y="0" width="160" height="60" rx="8" fill="#0a0c10" />
        <rect x="10" y="-15" width="140" height="20" rx="4" fill="#0d0e12" />
        <circle cx="30" cy="65" r="18" fill="#0a0c10" />
        <circle cx="130" cy="65" r="18" fill="#0a0c10" />
        <text x="55" y="35" fill="#C8A951" fontSize="16" fontFamily="'Courier New', monospace" fontWeight="bold" opacity="0.7">F.B.I.</text>
        <rect x="20" y="-18" width="25" height="12" rx="3"
          fill={!lightStrobe ? '#ff0000' : '#330000'}
          opacity="0.8"
          filter="url(#aRed)"
        />
        <rect x="115" y="-18" width="25" height="12" rx="3"
          fill={lightStrobe ? '#0000ff' : '#000033'}
          opacity="0.8"
          filter="url(#aBlue)"
        />
      </g>

      {/* FBI agent silhouettes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${250 + i * 120}, 870)`}>
          {/* Head */}
          <ellipse cx="0" cy="-35" rx="16" ry="19" fill="#050608" />
          {/* Body */}
          <rect x="-20" y="-18" width="40" height="60" rx="6" fill="#050608" />
          {/* Arms */}
          <line x1="-20" y1="5" x2="-40" y2="30" stroke="#050608" strokeWidth="10" strokeLinecap="round" />
          <line x1="20" y1="5" x2={i === 2 ? 50 : 40} y2="30" stroke="#050608" strokeWidth="10" strokeLinecap="round" />
          {/* FBI badge glint */}
          <circle cx="8" cy="10" r="5" fill="#C8A951" opacity={0.3 + Math.sin(frame * 0.1 + i) * 0.2} />
          {/* Gun - agent 2 drawn */}
          {i === 2 && <rect x="42" y="25" width="20" height="8" rx="2" fill="#0d0e10" />}
        </g>
      ))}

      {/* Ground floodlights */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={150 + i * 250} cy={910}
            r="10" fill="#fff" opacity={0.2 + Math.sin(frame * 0.1 + i) * 0.1}
          />
          <polygon
            points={`${140 + i * 250},910 ${160 + i * 250},910 ${220 + i * 250},600 ${80 + i * 250},600`}
            fill="#ffffff"
            opacity="0.015"
          />
        </g>
      ))}

      {/* Terminal building in background */}
      <rect x="0" y="600" width="180" height="300" fill="#0a0b0d" />
      <rect x="900" y="580" width="180" height="320" fill="#0a0b0d" />
      {/* Terminal lights */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={20 + i * 35} y="620" width="20" height="12" rx="2"
          fill="#C8A951" opacity={0.15 + Math.sin(frame * 0.06 + i) * 0.05} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={915 + i * 38} y="610" width="20" height="12" rx="2"
          fill="#C8A951" opacity={0.15 + Math.sin(frame * 0.06 + i + 2) * 0.05} />
      ))}

      {/* Date/location overlay */}
      <text x="540" y="1700" textAnchor="middle"
        fill="#C8A951" fontSize="16" fontFamily="'Courier New', monospace"
        opacity="0.15" letterSpacing="6"
      >
        TETERBORO AIRPORT — JULY 6, 2019
      </text>

      {/* Vignette */}
      <defs>
        <radialGradient id="aVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.82" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#aVig)" />
    </svg>
  );
};
