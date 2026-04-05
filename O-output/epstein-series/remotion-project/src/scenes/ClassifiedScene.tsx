import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ClassifiedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const paperFall = (seed: number) => (frame * (1.5 + seed * 0.3) + seed * 200) % 2200 - 200;
  const paperRotate = (seed: number) => Math.sin(frame * 0.04 + seed) * 8;
  const scanlineY = (frame * 3) % 1920;
  const terminalBlink = Math.floor(frame / 25) % 2 === 0;
  const panY = interpolate(frame, [0, durationInFrames], [0, -30]);

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="clRoom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010306" />
          <stop offset="100%" stopColor="#030508" />
        </linearGradient>
        <filter id="clGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="clBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="1080" height="1920" fill="url(#clRoom)" />

      {/* Scanline effect */}
      <rect x="0" y={scanlineY} width="1080" height="2"
        fill="#00ff00" opacity="0.03"
      />

      {/* Grid pattern - intelligence room */}
      {[...Array(20)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 100} x2="1080" y2={i * 100}
          stroke="#0a1020" strokeWidth="0.5" opacity="0.5" />
      ))}
      {[...Array(12)].map((_, i) => (
        <line key={`v${i}`} x1={i * 90} y1="0" x2={i * 90} y2="1920"
          stroke="#0a1020" strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Terminal/computer monitor */}
      <g transform={`translate(180, ${500 + panY})`}>
        <rect x="0" y="0" width="720" height="480" rx="6" fill="#050810" stroke="#0a1020" strokeWidth="3" />
        <rect x="8" y="8" width="704" height="464" rx="3" fill="#010306" />

        {/* Terminal text lines */}
        {[
          { text: '> ACCESSING CLASSIFIED DATABASE...', color: '#00cc44' },
          { text: '> SUBJECT: JEFFREY E. / FILE: INTEL-1992-447', color: '#C8A951' },
          { text: '> CLEARANCE LEVEL: ██████████', color: '#00cc44' },
          { text: '> STATUS: REDACTED BY ORDER OF ██████', color: '#B22222' },
          { text: '> HANDLER: [CLASSIFIED]', color: '#B22222' },
          { text: '> OPERATIONS: ██████████████', color: '#00cc44' },
          { text: '> FINANCIAL NETWORKS: 47 DOCUMENTED', color: '#C8A951' },
          { text: '> ASSOCIATES: 150+ IDENTIFIED', color: '#C8A951' },
          { text: '> ACCESS LOG: ACOSTA_ALEX — 2007.09.24', color: '#888' },
          { text: '> "LEFT ALONE PER DIRECTIVE" ████', color: '#B22222' },
          { text: '> IMMUNITY GRANTED: 4 OPERATIVES', color: '#B22222' },
          { text: '> ████████████████████████████', color: '#333' },
          { text: terminalBlink ? '> _' : '>  ', color: '#00cc44' },
        ].map((line, i) => (
          <text key={i}
            x="20" y={35 + i * 34}
            fill={line.color}
            fontSize="16"
            fontFamily="'Courier New', monospace"
            opacity="0.85"
          >{line.text}</text>
        ))}
      </g>

      {/* Falling classified documents */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i} transform={`translate(${80 + i * 135}, ${paperFall(i)}) rotate(${paperRotate(i)})`}>
          <rect x="0" y="0" width="90" height="120" rx="2"
            fill="#f5f0e8" opacity="0.12"
          />
          {/* CLASSIFIED stamp */}
          <rect x="5" y="12" width="80" height="18" rx="2"
            fill="#B22222" opacity="0.7"
          />
          <text x="10" y="25" fill="#fff" fontSize="10" fontFamily="'Courier New', monospace" fontWeight="bold">CLASSIFIED</text>
          {/* Document lines */}
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={j} x="8" y={38 + j * 14} width={40 + (j % 3) * 25} height="3"
              fill="#333" opacity="0.3"
            />
          ))}
          {/* Redaction bars */}
          <rect x="8" y="52" width="74" height="8" fill="#000" opacity="0.8" />
          <rect x="8" y="80" width="60" height="8" fill="#000" opacity="0.8" />
        </g>
      ))}

      {/* CIA/intelligence emblem suggestion */}
      <g transform="translate(540, 200)" opacity="0.12">
        <circle cx="0" cy="0" r="120" fill="none" stroke="#C8A951" strokeWidth="3" />
        <circle cx="0" cy="0" r="100" fill="none" stroke="#C8A951" strokeWidth="1" />
        {/* Eagle wings suggestion */}
        <path d="M -80 0 Q -40 -60 0 -20 Q 40 -60 80 0" fill="none" stroke="#C8A951" strokeWidth="2" />
        <path d="M -80 20 Q -40 80 0 40 Q 40 80 80 20" fill="none" stroke="#C8A951" strokeWidth="2" />
        {/* Shield */}
        <path d="M -20 -30 L 20 -30 L 20 20 L 0 35 L -20 20 Z" fill="none" stroke="#C8A951" strokeWidth="2" />
        {/* Star */}
        <polygon points="0,-15 3,-5 13,-5 5,2 8,12 0,6 -8,12 -5,2 -13,-5 -3,-5"
          fill="#C8A951" opacity="0.8"
        />
      </g>

      {/* REDACTED text watermarks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <text key={i}
          x={150 + (i * 273) % 800}
          y={300 + (i * 350) % 1200}
          fill="#B22222"
          fontSize={40 + i * 10}
          fontFamily="'Courier New', monospace"
          fontWeight="bold"
          opacity={0.04 + Math.sin(frame * 0.03 + i) * 0.02}
          transform={`rotate(${-20 + i * 15}, ${150 + (i * 273) % 800}, ${300 + (i * 350) % 1200})`}
        >CLASSIFIED</text>
      ))}

      {/* Question mark - the unanswered */}
      <text x="540" y="1600"
        textAnchor="middle"
        fill="#C8A951"
        fontSize="280"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        opacity={0.04 + Math.sin(frame * 0.04) * 0.02}
      >?</text>

      {/* Bottom status bar */}
      <rect x="0" y="1860" width="1080" height="60" fill="#010306" />
      <text x="20" y="1895"
        fill="#00cc44" fontSize="16" fontFamily="'Courier New', monospace"
        opacity="0.6"
      >CLASSIFIED // EYES ONLY // REF: EPSTEIN-INTEL-1992</text>
      <text x="900" y="1895"
        fill="#B22222" fontSize="16" fontFamily="'Courier New', monospace"
        opacity="0.6"
      >SEALED 2007</text>

      {/* Vignette */}
      <defs>
        <radialGradient id="clVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#clVig)" />
    </svg>
  );
};
