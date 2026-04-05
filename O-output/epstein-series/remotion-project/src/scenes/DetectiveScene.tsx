import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const DetectiveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const lampFlicker = 0.85 + Math.sin(frame * 0.15) * 0.05;
  const panX = interpolate(frame, [0, durationInFrames], [0, -30]);
  const dustFloat = Math.sin(frame * 0.04) * 8;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="dRoom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050608" />
          <stop offset="100%" stopColor="#030405" />
        </linearGradient>
        <linearGradient id="dBoard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0e08" />
          <stop offset="100%" stopColor="#120a06" />
        </linearGradient>
        <radialGradient id="dLamp" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#c8a020" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#c8a020" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="dGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="dShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Background room */}
      <rect width="1080" height="1920" fill="url(#dRoom)" />

      {/* Desk lamp light cone */}
      <ellipse
        cx="300"
        cy="1400"
        rx="220"
        ry="500"
        fill="url(#dLamp)"
        opacity={lampFlicker}
      />

      {/* Main cork board — left pan */}
      <g transform={`translate(${panX}, 0)`}>
        {/* Cork board background */}
        <rect x="-20" y="200" width="760" height="1100" fill="url(#dBoard)" rx="4" />
        <rect x="-20" y="200" width="760" height="1100" fill="none" stroke="#3a2010" strokeWidth="6" rx="4" />

        {/* Board texture */}
        {[...Array(30)].map((_, i) => (
          <line
            key={i}
            x1={(i * 27) % 760}
            y1="200"
            x2={(i * 27 + 40) % 760}
            y2="1300"
            stroke="#3a2010"
            strokeWidth="0.5"
            opacity="0.1"
          />
        ))}

        {/* Photo placeholders - Epstein */}
        <rect x="60" y="280" width="140" height="175" fill="#1a1410" rx="3" />
        <rect x="60" y="280" width="140" height="175" fill="none" stroke="#C8A951" strokeWidth="2" rx="3" opacity="0.7" />
        {/* Face silhouette */}
        <ellipse cx="130" cy="340" rx="35" ry="42" fill="#0d0a08" />
        <rect x="95" y="378" width="70" height="70" rx="8" fill="#0d0a08" />
        <text x="130" y="475" textAnchor="middle" fill="#C8A951" fontSize="14" fontFamily="'Courier New', monospace" fontWeight="bold" opacity="0.9">EPSTEIN</text>

        {/* Photo placeholder - Maxwell */}
        <rect x="280" y="280" width="130" height="165" fill="#1a1410" rx="3" />
        <rect x="280" y="280" width="130" height="165" fill="none" stroke="#B22222" strokeWidth="2" rx="3" opacity="0.7" />
        <ellipse cx="345" cy="335" rx="30" ry="36" fill="#0d0a08" />
        <rect x="315" y="368" width="60" height="68" rx="6" fill="#0d0a08" />
        <text x="345" y="465" textAnchor="middle" fill="#B22222" fontSize="14" fontFamily="'Courier New', monospace" fontWeight="bold" opacity="0.9">MAXWELL</text>

        {/* Photo placeholder - Unknown */}
        <rect x="490" y="280" width="130" height="165" fill="#141414" rx="3" />
        <rect x="490" y="280" width="130" height="165" fill="none" stroke="#666" strokeWidth="2" rx="3" opacity="0.5" />
        {/* Redacted/blacked out */}
        <rect x="490" y="280" width="130" height="165" fill="#000" rx="3" opacity="0.8" />
        <text x="555" y="372" textAnchor="middle" fill="#C8A951" fontSize="12" fontFamily="'Courier New', monospace" opacity="0.6">REDACTED</text>
        <text x="555" y="465" textAnchor="middle" fill="#666" fontSize="11" fontFamily="'Courier New', monospace" opacity="0.5">UNKNOWN</text>

        {/* String connections */}
        <line x1="130" y1="363" x2="345" y2="353" stroke="#B22222" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 2" />
        <line x1="345" y1="353" x2="555" y2="363" stroke="#B22222" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 2" />
        <line x1="130" y1="363" x2="555" y2="363" stroke="#C8A951" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />

        {/* Push pins */}
        <circle cx="130" cy="278" r="6" fill="#C8A951" opacity="0.8" />
        <circle cx="345" cy="278" r="6" fill="#B22222" opacity="0.8" />
        <circle cx="555" cy="278" r="6" fill="#888" opacity="0.7" />

        {/* Document notes */}
        <rect x="40" y="500" width="220" height="160" fill="#f5f0d8" rx="2" transform="rotate(-2, 40, 500)" opacity="0.85" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1="55" y1={520 + i * 18} x2={200 + (i % 2) * 30} y2={520 + i * 18} stroke="#333" strokeWidth="1.5" opacity="0.3" transform="rotate(-2, 40, 500)" />
        ))}
        <text x="55" y="518" fill="#B22222" fontSize="11" fontFamily="'Courier New', monospace" fontWeight="bold" transform="rotate(-2, 40, 500)">PALM BEACH PD</text>
        <text x="55" y="530" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" transform="rotate(-2, 40, 500)">36 VICTIMS — ALL MINORS</text>
        <text x="55" y="542" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" transform="rotate(-2, 40, 500)">AGES 14-17</text>
        <text x="55" y="554" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" transform="rotate(-2, 40, 500)">REPORT: 2005-2006</text>

        {/* More notes */}
        <rect x="290" y="490" width="200" height="140" fill="#f5f0d8" rx="2" transform="rotate(3, 290, 490)" opacity="0.8" />
        <text x="305" y="510" fill="#000080" fontSize="11" fontFamily="'Courier New', monospace" fontWeight="bold" transform="rotate(3, 290, 490)">OPERATION LEAP YEAR</text>
        <text x="305" y="524" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" transform="rotate(3, 290, 490)">FBI FILE — 2006</text>
        <text x="305" y="537" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" transform="rotate(3, 290, 490)">27 VICTIMS</text>
        <text x="305" y="550" fill="#B22222" fontSize="9" fontFamily="'Courier New', monospace" fontWeight="bold" transform="rotate(3, 290, 490)">60 POTENTIAL COUNTS</text>

        {/* Classified stamp */}
        <rect x="505" y="500" width="180" height="80" fill="#f5f0d8" rx="2" transform="rotate(-1, 505, 500)" opacity="0.75" />
        <text x="595" y="538" textAnchor="middle" fill="#B22222" fontSize="22" fontFamily="'Courier New', monospace" fontWeight="bold" transform="rotate(-1, 505, 500)" opacity="0.8">SEALED</text>
        <text x="595" y="558" textAnchor="middle" fill="#333" fontSize="9" fontFamily="'Courier New', monospace" transform="rotate(-1, 505, 500)">NON-PROSECUTION AGREEMENT</text>

        {/* Lower section — maps and dates */}
        <rect x="20" y="700" width="700" height="3" fill="#C8A951" opacity="0.2" />

        {/* Date cards */}
        {[
          { x: 40, y: 730, year: '2005', label: 'First report filed' },
          { x: 210, y: 740, year: '2006', label: 'FBI opens case' },
          { x: 380, y: 730, year: '2007', label: '205-page memo' },
          { x: 545, y: 740, year: '2008', label: 'SECRET DEAL' },
        ].map((item, i) => (
          <g key={i}>
            <rect x={item.x} y={item.y} width={155} height={70} fill="#0d0a06" rx="3" stroke="#3a2010" strokeWidth="1" />
            <text x={item.x + 10} y={item.y + 22} fill="#C8A951" fontSize="20" fontFamily="'Courier New', monospace" fontWeight="bold">{item.year}</text>
            <text x={item.x + 10} y={item.y + 40} fill="#aaa" fontSize="11" fontFamily="'Courier New', monospace">{item.label}</text>
          </g>
        ))}

        {/* Timeline arrows */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={155 + i * 170}
            y1="773"
            x2={195 + i * 170}
            y2="773"
            stroke="#C8A951"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            opacity="0.5"
          />
        ))}

        {/* More strings with movement */}
        <line
          x1={130}
          y1="363"
          x2={200 + Math.sin(frame * 0.03) * 5}
          y2="700"
          stroke="#B22222"
          strokeWidth="1"
          opacity={0.3 + Math.sin(frame * 0.05) * 0.1}
          strokeDasharray="5 3"
        />
        <line
          x1={345}
          y1="353"
          x2={380 + Math.sin(frame * 0.04) * 3}
          y2="700"
          stroke="#C8A951"
          strokeWidth="1"
          opacity={0.25 + Math.sin(frame * 0.06) * 0.08}
          strokeDasharray="5 3"
        />

        {/* Bottom photos row */}
        {['ACOSTA', 'REITER', 'GIUFFRE'].map((name, i) => (
          <g key={i}>
            <rect x={40 + i * 220} y={860} width="110" height="140" fill="#1a1410" rx="3" />
            <rect x={40 + i * 220} y={860} width="110" height="140" fill="none" stroke="#444" strokeWidth="1.5" rx="3" opacity="0.6" />
            <ellipse cx={95 + i * 220} cy={910} rx="25" ry="30" fill="#0d0a08" />
            <rect x={70 + i * 220} y={938} width="50" height="55" rx="5" fill="#0d0a08" />
            <text x={95 + i * 220} y={1018} textAnchor="middle" fill="#aaa" fontSize="12" fontFamily="'Courier New', monospace">{name}</text>
          </g>
        ))}

        {/* Large text at bottom */}
        <text x="380" y="1100" textAnchor="middle" fill="#B22222" fontSize="28" fontFamily="'Courier New', monospace" fontWeight="bold" opacity="0.7" letterSpacing="4">COORDINATED OPERATION</text>
        <text x="380" y="1135" textAnchor="middle" fill="#C8A951" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.5" letterSpacing="3">— CHIEF REITER, 2006 —</text>
      </g>

      {/* Desk surface bottom of frame */}
      <rect x="0" y="1580" width="1080" height="340" fill="#0a0704" />
      <rect x="0" y="1580" width="1080" height="3" fill="#1a1208" />

      {/* Desk lamp */}
      <g>
        <line x1="260" y1="1580" x2="280" y2="1380" stroke="#1a1a1a" strokeWidth="6" />
        <line x1="280" y1="1380" x2="340" y2="1320" stroke="#1a1a1a" strokeWidth="5" />
        <ellipse cx="340" cy="1310" rx="40" ry="20" fill="#222" />
        <ellipse cx="340" cy="1320" rx="35" ry="15" fill="#C8A951" opacity="0.3" filter="url(#dGlow)" />
      </g>

      {/* Coffee cup on desk */}
      <g transform="translate(700, 1590)">
        <rect x="0" y="0" width="50" height="55" rx="5" fill="#1a1208" />
        <ellipse cx="25" cy="0" rx="25" ry="8" fill="#2a1a0a" />
        <ellipse cx="25" cy="2" rx="20" ry="6" fill="#0a0604" />
      </g>

      {/* Scattered papers on desk */}
      <rect x="400" y="1595" width="280" height="160" rx="2" fill="#f5f0e8" opacity="0.06" transform="rotate(-3, 400, 1595)" />
      <rect x="440" y="1610" width="240" height="140" rx="2" fill="#f5f0e8" opacity="0.04" transform="rotate(2, 440, 1610)" />

      {/* Dust particles */}
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          cx={150 + (i * 83) % 500}
          cy={1000 + ((i * 67) % 400) + Math.sin(frame * 0.03 + i) * dustFloat}
          r={0.5 + Math.sin(i * 1.3) * 0.5}
          fill="white"
          opacity={0.05 + Math.sin(frame * 0.04 + i) * 0.04}
        />
      ))}

      {/* Vignette */}
      <defs>
        <radialGradient id="dVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#dVig)" />
    </svg>
  );
};
