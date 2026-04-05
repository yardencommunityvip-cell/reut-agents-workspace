import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const DocumentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fall1 = (frame * 1.8) % 2400 - 300;
  const fall2 = (frame * 1.3 + 600) % 2400 - 300;
  const fall3 = (frame * 2.1 + 1200) % 2400 - 300;
  const rot1 = Math.sin(frame * 0.03) * 12;
  const rot2 = Math.sin(frame * 0.04 + 2) * -8;
  const rot3 = Math.sin(frame * 0.035 + 4) * 10;
  const spotlightX = 540 + Math.sin(frame * 0.02) * 80;

  const DOCS = [
    { x: 80, y: fall1, rot: rot1, label: 'PROSECUTION MEMO', date: 'MAY 2007', pages: '205 PAGES', color: '#f5f0e8' },
    { x: 700, y: fall2, rot: rot2, label: 'NON-PROSECUTION AGREEMENT', date: 'SEP 24, 2007', pages: 'SEALED', color: '#f5f0e8' },
    { x: 380, y: fall3, rot: rot3, label: 'GIUFFRE vs MAXWELL', date: 'JAN 3, 2024', pages: '950 PAGES', color: '#fff8f0' },
    { x: 200, y: (frame * 1.5 + 900) % 2400 - 300, rot: Math.sin(frame * 0.025 + 1) * -15, label: 'FLIGHT LOG N908JE', date: '2001-2003', pages: 'EVIDENCE', color: '#f5f0e8' },
    { x: 600, y: (frame * 2.0 + 400) % 2400 - 300, rot: Math.sin(frame * 0.05 + 3) * 9, label: 'PALM BEACH PD REPORT', date: '2006', pages: 'PUBLIC RECORD', color: '#f5eee8' },
    { x: 850, y: (frame * 1.4 + 1600) % 2400 - 300, rot: Math.sin(frame * 0.03 + 5) * -11, label: 'MAXWELL INDICTMENT', date: '2020', pages: 'FEDERAL', color: '#f5f0e8' },
  ];

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="doRoom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010205" />
          <stop offset="100%" stopColor="#020307" />
        </linearGradient>
        <radialGradient id="doSpot" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C8A951" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#C8A951" stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="doGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="doPaper">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Dark background */}
      <rect width="1080" height="1920" fill="url(#doRoom)" />

      {/* Spotlight glow from above */}
      <ellipse cx={spotlightX} cy="600" rx="400" ry="700"
        fill="url(#doSpot)"
      />

      {/* Falling/floating documents */}
      {DOCS.map((doc, i) => (
        <g key={i} transform={`translate(${doc.x}, ${doc.y}) rotate(${doc.rot})`} filter="url(#doPaper)">
          {/* Document shadow */}
          <rect x="5" y="5" width="260" height="340" rx="3" fill="#000" opacity="0.4" />
          {/* Document body */}
          <rect x="0" y="0" width="260" height="340" rx="3" fill={doc.color} opacity="0.9" />

          {/* Header bar */}
          <rect x="0" y="0" width="260" height="45" rx="3" fill="#0a0a0a" opacity="0.85" />
          <text x="130" y="20" textAnchor="middle"
            fill="#C8A951" fontSize="9" fontFamily="'Courier New', monospace" fontWeight="bold"
          >UNITED STATES DISTRICT COURT</text>
          <text x="130" y="34" textAnchor="middle"
            fill="#C8A951" fontSize="8" fontFamily="'Courier New', monospace"
          >SOUTHERN DISTRICT OF FLORIDA</text>

          {/* Document label */}
          <text x="130" y="72" textAnchor="middle"
            fill="#1a0a0a" fontSize="11" fontFamily="'Courier New', monospace" fontWeight="bold"
          >{doc.label}</text>

          {/* Date */}
          <text x="130" y="90" textAnchor="middle"
            fill="#555" fontSize="9" fontFamily="'Courier New', monospace"
          >{doc.date}</text>

          {/* Document lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((j) => (
            <rect key={j}
              x="18" y={105 + j * 17}
              width={180 + (j % 3) * 25} height="2.5"
              fill="#333" opacity="0.2"
            />
          ))}

          {/* Redaction bars on some lines */}
          {i % 3 === 0 && (
            <>
              <rect x="18" y="122" width="160" height="8" fill="#000" opacity="0.85" />
              <rect x="18" y="173" width="120" height="8" fill="#000" opacity="0.85" />
            </>
          )}

          {/* Pages count */}
          <rect x="0" y="305" width="260" height="35" fill="#0a0a0a" opacity="0.7" />
          <text x="130" y="325" textAnchor="middle"
            fill="#C8A951" fontSize="10" fontFamily="'Courier New', monospace"
          >{doc.pages}</text>

          {/* Corner fold */}
          <path d="M 235 0 L 260 25 L 235 25 Z" fill="#ccc" opacity="0.3" />
          <path d="M 235 0 L 260 0 L 260 25 Z" fill="#ddd" opacity="0.2" />
        </g>
      ))}

      {/* Large desk surface at bottom */}
      <rect x="0" y="1650" width="1080" height="270" fill="#0d0a06" />
      <rect x="0" y="1648" width="1080" height="5" fill="#1a1208" />

      {/* Documents piled on desk */}
      <rect x="200" y="1620" width="680" height="40" rx="2" fill="#f5f0e8" opacity="0.08" transform="rotate(-1, 200, 1620)" />
      <rect x="220" y="1610" width="640" height="30" rx="2" fill="#f5f0e8" opacity="0.06" transform="rotate(2, 220, 1610)" />
      <rect x="180" y="1600" width="720" height="25" rx="2" fill="#f5f0e8" opacity="0.05" transform="rotate(-0.5, 180, 1600)" />

      {/* Stack of folders */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i}
          x={320 - i * 4}
          y={1560 - i * 18}
          width="440" height="65" rx="3"
          fill={`hsl(${30 + i * 5}, ${20 + i * 3}%, ${7 + i * 1.5}%)`}
          stroke="#2a1a08" strokeWidth="1"
        />
      ))}

      {/* Magnifying glass */}
      <g transform="translate(700, 1580) rotate(-25)">
        <circle cx="0" cy="0" r="55" fill="none" stroke="#C8A951" strokeWidth="4" opacity="0.5" />
        <circle cx="0" cy="0" r="52" fill="#0a1020" opacity="0.4" />
        <line x1="39" y1="39" x2="75" y2="75" stroke="#C8A951" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
        {/* Lens glare */}
        <circle cx="-15" cy="-15" r="12" fill="white" opacity="0.05" />
      </g>

      {/* Scattered notes */}
      <g transform="translate(100, 1560) rotate(-8)">
        <rect x="0" y="0" width="150" height="100" rx="2" fill="#fff8a0" opacity="0.08" />
        <text x="10" y="20" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" opacity="0.5">27 IDENTIFIED</text>
        <text x="10" y="33" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" opacity="0.5">VICTIMS — AGES</text>
        <text x="10" y="46" fill="#B22222" fontSize="9" fontFamily="'Courier New', monospace" fontWeight="bold" opacity="0.6">14-23</text>
      </g>

      {/* The DOJ seal watermark */}
      <circle cx="540" cy="960" r="200" fill="none" stroke="#C8A951"
        strokeWidth="2" opacity="0.04"
      />
      <text x="540" y="945" textAnchor="middle"
        fill="#C8A951" fontSize="14" fontFamily="'Courier New', monospace"
        opacity="0.06" letterSpacing="4"
      >DEPARTMENT OF JUSTICE</text>
      <text x="540" y="975" textAnchor="middle"
        fill="#C8A951" fontSize="11" fontFamily="'Courier New', monospace"
        opacity="0.05" letterSpacing="3"
      >TRANSPARENCY ACT 2025</text>

      {/* Vignette */}
      <defs>
        <radialGradient id="doVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#doVig)" />
    </svg>
  );
};
