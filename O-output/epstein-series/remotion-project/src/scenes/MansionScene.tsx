import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const MansionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const panX = interpolate(frame, [0, durationInFrames], [0, -25]);
  const rainOffset = (frame * 4) % 1920;
  const windowFlicker = (seed: number) => 0.3 + Math.sin(frame * 0.1 + seed) * 0.15;
  const fogOpacity = 0.3 + Math.sin(frame * 0.02) * 0.1;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020508" />
          <stop offset="50%" stopColor="#060d18" />
          <stop offset="100%" stopColor="#0a0f08" />
        </linearGradient>
        <linearGradient id="mGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080c06" />
          <stop offset="100%" stopColor="#030405" />
        </linearGradient>
        <linearGradient id="mMansion" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1018" />
          <stop offset="100%" stopColor="#08090d" />
        </linearGradient>
        <filter id="mFog">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <filter id="mGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="mLight" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#C8A951" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1080" height="1920" fill="url(#mSky)" />

      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <circle key={i}
          cx={(i * 227) % 1080} cy={(i * 71) % 400}
          r={0.8} fill="white"
          opacity={0.2 + Math.sin(frame * 0.06 + i * 2) * 0.15}
        />
      ))}

      {/* Overcast clouds */}
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i}
          cx={200 + i * 250 + Math.sin(frame * 0.01 + i) * 20}
          cy={150 + (i % 2) * 80}
          rx={180 + i * 40} ry={50 + i * 10}
          fill="#060c18" opacity="0.7"
        />
      ))}

      {/* Main mansion */}
      <g transform={`translate(${panX}, 0)`}>
        {/* Main building body */}
        <rect x="80" y="700" width="980" height="1000" fill="url(#mMansion)" />

        {/* Roof */}
        <path d="M 50 700 L 570 550 L 1090 700 Z" fill="#0a0c10" />
        {/* Roof details */}
        <path d="M 250 700 L 420 610 L 590 700 Z" fill="#0c0e14" />
        <path d="M 580 700 L 750 610 L 920 700 Z" fill="#0c0e14" />

        {/* Chimneys */}
        <rect x="330" y="510" width="40" height="100" fill="#0a0a0e" />
        <rect x="780" y="530" width="35" height="90" fill="#0a0a0e" />

        {/* Chimney smoke */}
        <ellipse cx="350" cy={500 + Math.sin(frame * 0.05) * 5}
          rx="15" ry="20" fill="#1a1a1a" opacity="0.3" filter="url(#mFog)" />

        {/* Grand entrance */}
        <rect x="440" y="1400" width="200" height="300" fill="#060808" />
        {/* Entrance arch */}
        <ellipse cx="540" cy="1400" rx="100" ry="40" fill="#060808" />
        {/* Door details */}
        <line x1="540" y1="1400" x2="540" y2="1700" stroke="#0d0d0d" strokeWidth="3" />
        {/* Door knocker */}
        <circle cx="510" cy="1550" r="8" fill="#1a1208" />
        <circle cx="570" cy="1550" r="8" fill="#1a1208" />

        {/* Pillars */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={440 + i * 50} y="1200" width="18" height="500" rx="4" fill="#0c0e12" />
        ))}
        <rect x="435" y="1195" width="215" height="20" fill="#0c0e12" />

        {/* Gate in foreground */}
        <rect x="0" y="1730" width="1100" height="8" fill="#1a1510" />
        {/* Iron fence */}
        {[...Array(22)].map((_, i) => (
          <g key={i}>
            <line x1={20 + i * 48} y1="1738" x2={20 + i * 48} y2="1650" stroke="#1a1510" strokeWidth="4" />
            {/* Spear top */}
            <polygon
              points={`${18 + i * 48},1650 ${20 + i * 48},1635 ${22 + i * 48},1650`}
              fill="#C8A951" opacity="0.4"
            />
          </g>
        ))}

        {/* Windows - ground floor */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={110 + i * 175} y={1050} width={90} height={130} fill="#C8A951" opacity={windowFlicker(i * 4)} />
            <rect x={110 + i * 175} y={1050} width={90} height={130} fill="none" stroke="#1a1510" strokeWidth="4" />
            {/* Window cross */}
            <line x1={155 + i * 175} y1="1050" x2={155 + i * 175} y2="1180" stroke="#1a1510" strokeWidth="2" />
            <line x1={110 + i * 175} y1="1115" x2={200 + i * 175} y2="1115" stroke="#1a1510" strokeWidth="2" />
          </g>
        ))}

        {/* Windows - upper floor */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={150 + i * 205} y={820} width={80} height={110} fill="#C8A951" opacity={windowFlicker(i * 7 + 3)} />
            <rect x={150 + i * 205} y={820} width={80} height={110} fill="none" stroke="#1a1510" strokeWidth="3" />
            <line x1={190 + i * 205} y1="820" x2={190 + i * 205} y2="930" stroke="#1a1510" strokeWidth="2" />
            <line x1={150 + i * 205} y1="875" x2={230 + i * 205} y2="875" stroke="#1a1510" strokeWidth="2" />
          </g>
        ))}

        {/* Mansard / attic windows */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx={210 + i * 280} cy={640} rx="35" ry="45" fill="#C8A951" opacity={windowFlicker(i * 9 + 1) * 0.7} />
            <ellipse cx={210 + i * 280} cy={640} rx="35" ry="45" fill="none" stroke="#0c0e12" strokeWidth="3" />
          </g>
        ))}

        {/* Window light glow on ground */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i}
            cx={155 + i * 175} cy={1185}
            rx="60" ry="15"
            fill="#C8A951"
            opacity={windowFlicker(i * 4) * 0.3}
            filter="url(#mGlow)"
          />
        ))}

        {/* Hedge/topiary */}
        <ellipse cx="150" cy="1730" rx="80" ry="60" fill="#0a1208" />
        <ellipse cx="950" cy="1730" rx="80" ry="60" fill="#0a1208" />
        <rect x="100" y="1720" width="900" height="40" fill="#070e06" />

        {/* Palm trees silhouette */}
        <g transform="translate(80, 1700)">
          <line x1="0" y1="0" x2="-10" y2="-250" stroke="#050906" strokeWidth="10" />
          {[0, 40, 80, 120, 160, 200, 240, 300].map((angle, j) => (
            <line key={j} x1="-10" y1="-250"
              x2={-10 + Math.cos((angle * Math.PI) / 180) * 70}
              y2={-250 + Math.sin((angle * Math.PI) / 180) * 70}
              stroke="#050906" strokeWidth="2" />
          ))}
        </g>
        <g transform="translate(1000, 1700)">
          <line x1="0" y1="0" x2="10" y2="-230" stroke="#050906" strokeWidth="10" />
          {[0, 40, 80, 120, 160, 200, 240, 300].map((angle, j) => (
            <line key={j} x1="10" y1="-230"
              x2={10 + Math.cos((angle * Math.PI) / 180) * 65}
              y2={-230 + Math.sin((angle * Math.PI) / 180) * 65}
              stroke="#050906" strokeWidth="2" />
          ))}
        </g>
      </g>

      {/* Rain */}
      {[...Array(40)].map((_, i) => (
        <line key={i}
          x1={(i * 73) % 1080}
          y1={((i * 53) + rainOffset) % 1920}
          x2={(i * 73 + 4) % 1080}
          y2={((i * 53) + rainOffset + 20) % 1920}
          stroke="#1a2030"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}

      {/* Ground fog */}
      <ellipse cx="540" cy="1780" rx="600" ry="80"
        fill="#060c10" opacity={fogOpacity} filter="url(#mFog)" />
      <ellipse cx="540" cy="1800" rx="550" ry="60"
        fill="#040810" opacity={fogOpacity * 0.7} filter="url(#mFog)" />

      {/* Foreground darkness */}
      <rect x="0" y="1750" width="1080" height="170" fill="#020304" />

      {/* Vignette */}
      <defs>
        <radialGradient id="mVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#mVig)" />
    </svg>
  );
};
