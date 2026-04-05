import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const PlaneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const cloudX = interpolate(frame, [0, durationInFrames], [0, -180]);
  const turbulence = Math.sin(frame * 0.08) * 2;
  const cityLightsOpacity = 0.6 + Math.sin(frame * 0.04) * 0.1;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#01030c" />
          <stop offset="40%" stopColor="#020818" />
          <stop offset="100%" stopColor="#060a14" />
        </linearGradient>
        <linearGradient id="pCabin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0e12" />
          <stop offset="100%" stopColor="#080a0f" />
        </linearGradient>
        <linearGradient id="pLeather" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1208" />
          <stop offset="100%" stopColor="#0d0a06" />
        </linearGradient>
        <linearGradient id="pWindowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3060" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0a1830" stopOpacity="0.5" />
        </linearGradient>
        <filter id="pGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="pAmbiLight">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Night sky through windows */}
      <rect width="1080" height="1920" fill="url(#pSky)" />

      {/* Stars outside */}
      {[...Array(60)].map((_, i) => (
        <circle
          key={i}
          cx={(i * 179) % 1080}
          cy={(i * 73) % 500}
          r={1}
          fill="white"
          opacity={0.3 + Math.sin(frame * 0.05 + i) * 0.2}
        />
      ))}

      {/* Clouds below (seen through windows) */}
      <g transform={`translate(${cloudX}, 0)`} opacity="0.15">
        {[0, 200, 500, 800, 1100].map((cx, i) => (
          <ellipse key={i} cx={cx} cy={380 + (i % 2) * 40} rx={100 + i * 15} ry={25 + i * 5} fill="white" />
        ))}
      </g>

      {/* City lights far below */}
      <g opacity={cityLightsOpacity}>
        {[...Array(80)].map((_, i) => (
          <circle
            key={i}
            cx={(i * 139) % 1080}
            cy={500 + ((i * 83) % 180)}
            r={Math.sin(i) > 0.5 ? 2 : 1}
            fill={i % 4 === 0 ? '#C8A951' : i % 3 === 0 ? '#ffffff' : '#4080c0'}
            opacity={0.3 + Math.sin(frame * 0.07 + i) * 0.2}
          />
        ))}
      </g>

      {/* Jet wing exterior hint */}
      <path
        d="M -100 750 L 1200 720 L 1200 800 L -100 840 Z"
        fill="#0a0c10"
        opacity="0.9"
      />
      <path
        d="M 100 755 L 900 730 L 900 775 L 100 798 Z"
        fill="#141618"
        opacity="0.8"
      />
      {/* Wing lights */}
      <circle cx="920" cy="752" r="5" fill="#ff2200" opacity={0.7 + Math.sin(frame * 0.3) * 0.3} />
      <circle cx="160" cy="760" r="5" fill="#00cc44" opacity={0.7 + Math.sin(frame * 0.3 + Math.PI) * 0.3} />

      {/* Interior cabin */}
      {/* Floor */}
      <rect x="0" y="1100" width="1080" height="820" fill="#090a0d" />

      {/* Cabin walls */}
      <rect x="0" y="800" width="80" height="1120" fill="#0d0e12" />
      <rect x="1000" y="800" width="80" height="1120" fill="#0d0e12" />

      {/* Overhead panel / ceiling */}
      <path d="M 0 800 Q 540 740 1080 800 L 1080 870 Q 540 810 0 870 Z" fill="#0f1015" />

      {/* Ambient cabin lighting strip */}
      <path
        d="M 80 810 Q 540 755 1000 810"
        fill="none"
        stroke="#C8A951"
        strokeWidth="2"
        opacity={0.15 + Math.sin(frame * 0.04) * 0.05}
        filter="url(#pAmbiLight)"
      />

      {/* Oval windows - left side */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${100 + i * 0}, ${850 + i * 0})`}>
          <ellipse cx="60" cy={80 + i * 280} rx="55" ry="75" fill="url(#pWindowGlow)" />
          <ellipse cx="60" cy={80 + i * 280} rx="55" ry="75" fill="none" stroke="#1a2030" strokeWidth="6" />
          <ellipse cx="60" cy={80 + i * 280} rx="48" ry="68" fill="none" stroke="#0a1020" strokeWidth="2" />
        </g>
      ))}

      {/* Oval windows - right side */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <ellipse cx={920} cy={930 + i * 280} rx="55" ry="75" fill="url(#pWindowGlow)" />
          <ellipse cx={920} cy={930 + i * 280} rx="55" ry="75" fill="none" stroke="#1a2030" strokeWidth="6" />
          <ellipse cx={920} cy={930 + i * 280} rx="48" ry="68" fill="none" stroke="#0a1020" strokeWidth="2" />
        </g>
      ))}

      {/* Leather seats */}
      {/* Left seat cluster */}
      <g transform={`translate(0, ${turbulence})`}>
        <rect x="120" y="1150" width="200" height="160" rx="15" fill="url(#pLeather)" />
        <rect x="130" y="1090" width="180" height="70" rx="10" fill="#16100a" />
        <rect x="110" y="1150" width="30" height="100" rx="5" fill="#0f0d08" />
        <rect x="330" y="1150" width="30" height="100" rx="5" fill="#0f0d08" />
      </g>

      {/* Right seat cluster */}
      <g transform={`translate(0, ${-turbulence})`}>
        <rect x="760" y="1150" width="200" height="160" rx="15" fill="url(#pLeather)" />
        <rect x="770" y="1090" width="180" height="70" rx="10" fill="#16100a" />
        <rect x="750" y="1150" width="30" height="100" rx="5" fill="#0f0d08" />
        <rect x="970" y="1150" width="30" height="100" rx="5" fill="#0f0d08" />
      </g>

      {/* Center aisle table */}
      <rect x="440" y="1160" width="200" height="120" rx="8" fill="#1a1208" />
      <rect x="450" y="1170" width="180" height="100" rx="5" fill="#111008" />

      {/* Document on table — flight log */}
      <g transform={`translate(450, 1175) rotate(${Math.sin(frame * 0.02) * 1})`}>
        <rect width="170" height="85" rx="3" fill="#f5f0e8" opacity="0.85" />
        {/* Document lines */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x="10" y={8 + i * 10} width={100 + (i % 3) * 30} height="2" fill="#333" opacity="0.3" />
        ))}
        <rect x="10" y="8" width="60" height="4" fill="#000" opacity="0.6" />
        <text x="10" y="18" fill="#333" fontSize="5" fontFamily="monospace" opacity="0.8">FLIGHT LOG N908JE</text>
        <text x="10" y="26" fill="#333" fontSize="4" fontFamily="monospace" opacity="0.6">2002-2003 MANIFEST</text>
        {['W. CLINTON', 'G. MAXWELL', 'A. DERSHOWITZ', 'L. WEXNER', 'K. SPACEY'].map((name, i) => (
          <text key={i} x="10" y={36 + i * 9} fill="#333" fontSize="4.5" fontFamily="monospace" opacity="0.7">{name}</text>
        ))}
      </g>

      {/* Briefcase */}
      <rect x="470" y="1350" width="140" height="90" rx="5" fill="#1a1208" />
      <rect x="510" y="1345" width="60" height="15" rx="4" fill="none" stroke="#C8A951" strokeWidth="2" opacity="0.6" />
      <line x1="470" y1="1395" x2="610" y2="1395" stroke="#0f0d08" strokeWidth="2" />

      {/* Overhead bins */}
      <rect x="80" y="820" width="240" height="55" rx="5" fill="#0f1015" stroke="#1a1c22" strokeWidth="1" />
      <rect x="760" y="820" width="240" height="55" rx="5" fill="#0f1015" stroke="#1a1c22" strokeWidth="1" />
      <line x1="200" y1="820" x2="200" y2="875" stroke="#1a1c22" strokeWidth="1" />
      <line x1="880" y1="820" x2="880" y2="875" stroke="#1a1c22" strokeWidth="1" />

      {/* Reading light halos */}
      <circle cx="200" cy="890" r="30" fill="#C8A951" opacity="0.03" filter="url(#pAmbiLight)" />
      <circle cx="880" cy="890" r="30" fill="#C8A951" opacity="0.03" filter="url(#pAmbiLight)" />

      {/* Vignette */}
      <defs>
        <radialGradient id="pVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#pVig)" />
    </svg>
  );
};
