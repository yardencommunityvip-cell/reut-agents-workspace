import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const IslandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const waveOffset = frame * 1.8;
  const moonY = interpolate(frame, [0, durationInFrames], [0, -15]);
  const palmSway = Math.sin(frame * 0.05) * 4;
  const waterGlimmer = interpolate(frame, [0, durationInFrames], [0, -30]);

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="iSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010510" />
          <stop offset="55%" stopColor="#040e22" />
          <stop offset="100%" stopColor="#001020" />
        </linearGradient>
        <linearGradient id="iOcean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#031428" />
          <stop offset="100%" stopColor="#010810" />
        </linearGradient>
        <linearGradient id="iIsland" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2e10" />
          <stop offset="100%" stopColor="#0d1a08" />
        </linearGradient>
        <filter id="iGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="iSoftGlow">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1080" height="1920" fill="url(#iSky)" />

      {/* Stars */}
      {[...Array(80)].map((_, i) => (
        <circle
          key={i}
          cx={(i * 137) % 1080}
          cy={(i * 83) % 800}
          r={Math.sin(i * 2.3) > 0.3 ? 1.8 : 1}
          fill="white"
          opacity={0.2 + Math.sin(frame * 0.06 + i * 1.7) * 0.3}
        />
      ))}

      {/* Moon with reflection glow */}
      <g transform={`translate(0, ${moonY})`} filter="url(#iSoftGlow)">
        <circle cx="200" cy="280" r="60" fill="#ddd0b0" opacity="0.85" />
        <circle cx="182" cy="264" r="60" fill="#040e22" opacity="1" />
      </g>

      {/* Moon path on water */}
      <ellipse
        cx="540"
        cy={`${1200 + waterGlimmer}`}
        rx="40"
        ry="280"
        fill="#C8A951"
        opacity="0.08"
      />

      {/* Ocean */}
      <rect x="0" y="1250" width="1080" height="670" fill="url(#iOcean)" />

      {/* Ocean waves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M ${-100 + (waveOffset * (0.5 + i * 0.1)) % 1280} ${1260 + i * 30}
              q 80 ${-12 + Math.sin(frame * 0.04 + i) * 6} 160 0
              q 80 ${12 - Math.sin(frame * 0.04 + i) * 6} 160 0
              q 80 ${-12 + Math.sin(frame * 0.04 + i) * 6} 160 0
              q 80 ${12 - Math.sin(frame * 0.04 + i) * 6} 160 0
              q 80 ${-12 + Math.sin(frame * 0.04 + i) * 6} 160 0
              q 80 ${12 - Math.sin(frame * 0.04 + i) * 6} 160 0
              q 80 ${-12 + Math.sin(frame * 0.04 + i) * 6} 160 0`}
          fill="none"
          stroke="#1a4060"
          strokeWidth="1.5"
          opacity={0.4 - i * 0.05}
        />
      ))}

      {/* Island landmass */}
      <ellipse cx="540" cy="1240" rx="520" ry="80" fill="#0f1e08" />
      <ellipse cx="540" cy="1220" rx="480" ry="60" fill="url(#iIsland)" />

      {/* Palm trees */}
      {/* Left palm */}
      <g transform={`translate(240, 1100) rotate(${-8 + palmSway * 0.5})`}>
        <line x1="0" y1="0" x2="-15" y2="-180" stroke="#2a1a08" strokeWidth="12" strokeLinecap="round" />
        <line x1="-15" y1="-180" x2="-10" y2="-280" stroke="#2a1a08" strokeWidth="9" strokeLinecap="round" />
        {/* Fronds */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
          <line
            key={j}
            x1="-10"
            y1="-280"
            x2={-10 + Math.cos((angle * Math.PI) / 180) * (60 + Math.sin(frame * 0.04 + j) * 5)}
            y2={-280 + Math.sin((angle * Math.PI) / 180) * (60 + Math.sin(frame * 0.04 + j) * 5)}
            stroke="#1a3008"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Right palm */}
      <g transform={`translate(820, 1080) rotate(${12 + palmSway * 0.7})`}>
        <line x1="0" y1="0" x2="20" y2="-200" stroke="#2a1a08" strokeWidth="14" strokeLinecap="round" />
        <line x1="20" y1="-200" x2="15" y2="-310" stroke="#2a1a08" strokeWidth="10" strokeLinecap="round" />
        {[0, 50, 100, 150, 200, 250, 300, 350].map((angle, j) => (
          <line
            key={j}
            x1="15"
            y1="-310"
            x2={15 + Math.cos((angle * Math.PI) / 180) * (70 + Math.sin(frame * 0.035 + j) * 6)}
            y2={-310 + Math.sin((angle * Math.PI) / 180) * (70 + Math.sin(frame * 0.035 + j) * 6)}
            stroke="#1a3008"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Small center palm */}
      <g transform={`translate(540, 1150) rotate(${palmSway * 0.3})`}>
        <line x1="0" y1="0" x2="5" y2="-150" stroke="#2a1a08" strokeWidth="10" strokeLinecap="round" />
        {[0, 60, 120, 180, 240, 300].map((angle, j) => (
          <line
            key={j}
            x1="5"
            y1="-150"
            x2={5 + Math.cos((angle * Math.PI) / 180) * (55 + Math.sin(frame * 0.05 + j) * 4)}
            y2={-150 + Math.sin((angle * Math.PI) / 180) * (55 + Math.sin(frame * 0.05 + j) * 4)}
            stroke="#1a3008"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Temple/mysterious structure on island */}
      <g filter="url(#iGlow)">
        {/* Base structure */}
        <rect x="460" y="1100" width="120" height="120" fill="#0d1510" />
        {/* Dome/roof */}
        <ellipse cx="520" cy="1100" rx="65" ry="25" fill="#111c0e" />
        <rect x="480" y="1070" width="80" height="35" fill="#0d1510" />
        {/* Antenna */}
        <line x1="520" y1="1070" x2="520" y2="1010" stroke="#C8A951" strokeWidth="2" opacity="0.7" />
        <circle cx="520" cy="1010" r="4" fill="#C8A951" opacity={0.5 + Math.sin(frame * 0.2) * 0.4} />
        {/* Windows with golden light */}
        <rect x="475" y="1115" width="25" height="35" fill="#C8A951" opacity={0.1 + Math.sin(frame * 0.12) * 0.08} />
        <rect x="520" y="1115" width="25" height="35" fill="#C8A951" opacity={0.1 + Math.sin(frame * 0.09 + 1) * 0.08} />
        <rect x="495" y="1150" width="50" height="70" fill="#0a1010" />
      </g>

      {/* Satellite dish silhouette */}
      <g transform="translate(380, 1160)">
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#1a1a1a" strokeWidth="4" />
        <ellipse cx="0" cy="-40" rx="25" ry="10" fill="none" stroke="#1a1a1a" strokeWidth="3" transform="rotate(-30, 0, -40)" />
      </g>

      {/* Subtle helicopter spotlight from above */}
      <ellipse
        cx={`${540 + Math.sin(frame * 0.02) * 100}`}
        cy="900"
        rx="60"
        ry="200"
        fill="#ffffff"
        opacity={0.02 + Math.sin(frame * 0.08) * 0.01}
      />

      {/* Vignette */}
      <defs>
        <radialGradient id="iVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#iVig)" />

      {/* Subtle text watermark on water */}
      <text
        x="540"
        y="1420"
        textAnchor="middle"
        fill="#C8A951"
        fontSize="18"
        fontFamily="'Courier New', monospace"
        opacity="0.12"
        letterSpacing="6"
      >
        LITTLE ST. JAMES — USVI
      </text>
    </svg>
  );
};
