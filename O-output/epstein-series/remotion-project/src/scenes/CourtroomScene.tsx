import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const CourtroomScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const spotlightPulse = 0.7 + Math.sin(frame * 0.04) * 0.05;
  const dustFloat = Math.sin(frame * 0.03) * 6;
  const panX = interpolate(frame, [0, durationInFrames], [0, -20]);

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="cRoom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050608" />
          <stop offset="100%" stopColor="#030405" />
        </linearGradient>
        <linearGradient id="cWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1008" />
          <stop offset="100%" stopColor="#0d0804" />
        </linearGradient>
        <linearGradient id="cWoodLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221608" />
          <stop offset="100%" stopColor="#160e06" />
        </linearGradient>
        <radialGradient id="cSpot" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#C8A951" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="cGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="1080" height="1920" fill="url(#cRoom)" />

      {/* Tall courtroom windows - arched */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          {/* Window frame */}
          <rect x={80 + i * 320} y="120" width="160" height="500" fill="#060b10" rx="4" />
          {/* Arch */}
          <ellipse cx={160 + i * 320} cy="120" rx="80" ry="50" fill="#060b10" />
          {/* Light from window */}
          <rect x={90 + i * 320} y="120" width="140" height="490" fill="#0a1520" opacity="0.8" />
          {/* Window panes */}
          <line x1={160 + i * 320} y1="120" x2={160 + i * 320} y2="620" stroke="#0d1822" strokeWidth="4" />
          {[0, 1, 2, 3].map((j) => (
            <line key={j} x1={80 + i * 320} y1={240 + j * 100} x2={240 + i * 320} y2={240 + j * 100} stroke="#0d1822" strokeWidth="3" />
          ))}
          {/* Light shaft */}
          <polygon
            points={`${90 + i * 320},120 ${240 + i * 320},120 ${300 + i * 320},900 ${30 + i * 320},900`}
            fill="#C8A951"
            opacity={0.03 + Math.sin(frame * 0.02 + i) * 0.01}
          />
        </g>
      ))}

      {/* Paneled walls */}
      <g transform={`translate(${panX}, 0)`}>
        {/* Left wall panels */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-20} y={150 + i * 200} width="60" height="160" rx="3" fill="url(#cWood)" stroke="#221608" strokeWidth="1" />
        ))}
        {/* Right wall panels */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={1040} y={150 + i * 200} width="60" height="160" rx="3" fill="url(#cWood)" stroke="#221608" strokeWidth="1" />
        ))}
      </g>

      {/* American flag */}
      <g transform="translate(900, 100)">
        {/* Flag pole */}
        <line x1="0" y1="0" x2="0" y2="400" stroke="#C8A951" strokeWidth="3" opacity="0.4" />
        {/* Flag stripes */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <rect key={i} x="5" y={i * 22} width="120" height="22"
            fill={i % 2 === 0 ? '#3a0808' : '#f5f0e8'}
            opacity="0.35"
          />
        ))}
        {/* Canton */}
        <rect x="5" y="0" width="52" height="110" fill="#080830" opacity="0.5" />
        {/* Stars suggestion */}
        {[...Array(12)].map((_, i) => (
          <circle key={i}
            cx={14 + (i % 4) * 12}
            cy={12 + Math.floor(i / 4) * 22}
            r="2" fill="white" opacity="0.5"
          />
        ))}
      </g>

      {/* Judge's bench - raised platform */}
      {/* Platform */}
      <rect x="100" y="620" width="880" height="30" fill="url(#cWoodLight)" />
      <rect x="120" y="650" width="840" height="200" fill="url(#cWood)" />
      {/* Bench front paneling */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={130 + i * 168} y="655" width="148" height="190" rx="3"
          fill="url(#cWood)" stroke="#2a1a08" strokeWidth="1" />
      ))}

      {/* Spotlight on empty chair behind bench */}
      <ellipse cx="540" cy="640" rx="120" ry="40"
        fill="#C8A951" opacity={spotlightPulse * 0.15} filter="url(#cGlow)" />

      {/* Judge's chair - empty */}
      <rect x="480" y="560" width="120" height="80" rx="8" fill="#1a1208" />
      <rect x="470" y="520" width="140" height="50" rx="6" fill="#1a1208" />
      <rect x="465" y="475" width="150" height="55" rx="15" fill="#221808" />

      {/* Microphone on bench */}
      <line x1="540" y1="650" x2="540" y2="600" stroke="#888" strokeWidth="3" />
      <ellipse cx="540" cy="598" rx="12" ry="8" fill="#666" />

      {/* Gavel */}
      <rect x="590" y="640" width="50" height="15" rx="5" fill="#1a0e04" />
      <line x1="615" y1="640" x2="635" y2="620" stroke="#1a0e04" strokeWidth="5" />
      <rect x="628" y="610" width="35" height="18" rx="3" fill="#2a1608" />

      {/* Scales of justice on wall */}
      <g transform="translate(510, 280)">
        <line x1="30" y1="0" x2="30" y2="80" stroke="#C8A951" strokeWidth="2" opacity="0.5" />
        <line x1="0" y1="80" x2="60" y2="80" stroke="#C8A951" strokeWidth="2" opacity="0.5" />
        <line x1="10" y1="80" x2="10" y2="105" stroke="#C8A951" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="80" x2="50" y2="110" stroke="#C8A951" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="10" cy="110" rx="16" ry="8" fill="none" stroke="#C8A951" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="50" cy="115" rx="16" ry="8" fill="none" stroke="#C8A951" strokeWidth="1.5" opacity="0.5" transform="rotate(5, 50, 115)" />
      </g>

      {/* Gallery pews */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="60" y={900 + i * 130} width="960" height="80" rx="4" fill="url(#cWood)" />
          <rect x="60" y={900 + i * 130} width="960" height="8" rx="2" fill="url(#cWoodLight)" />
          {/* Silhouetted people in gallery */}
          {i < 3 && [0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
            <ellipse key={j}
              cx={120 + j * 115}
              cy={895 + i * 130}
              rx="22" ry="28"
              fill="#0a0804"
              opacity={0.7 + Math.sin(j * 2.3 + i) * 0.2}
            />
          ))}
        </g>
      ))}

      {/* Witness stand - left */}
      <rect x="80" y="800" width="200" height="120" rx="4" fill="url(#cWood)" />
      <rect x="80" y="800" width="200" height="8" fill="url(#cWoodLight)" />
      {/* Microphone on witness stand */}
      <line x1="180" y1="800" x2="180" y2="770" stroke="#888" strokeWidth="2" opacity="0.6" />
      <ellipse cx="180" cy="768" rx="8" ry="5" fill="#666" opacity="0.6" />

      {/* Prosecution table */}
      <rect x="80" y="860" width="350" height="50" rx="4" fill="url(#cWood)" />

      {/* Defense table */}
      <rect x="650" y="860" width="350" height="50" rx="4" fill="url(#cWood)" />

      {/* Document stacks on tables */}
      <rect x="100" y="850" width="80" height="12" rx="2" fill="#f5f0e8" opacity="0.4" />
      <rect x="100" y="844" width="75" height="8" rx="2" fill="#f5f0e8" opacity="0.35" />
      <rect x="700" y="850" width="80" height="12" rx="2" fill="#f5f0e8" opacity="0.4" />

      {/* Jury box */}
      <rect x="900" y="650" width="180" height="250" fill="url(#cWood)" rx="4" />
      {/* 12 juror silhouettes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <ellipse cx={940 + (i % 2) * 80} cy={690 + Math.floor(i / 2) * 65} rx="20" ry="25" fill="#0a0804" opacity="0.7" />
          <ellipse cx={940 + (i % 2) * 80} cy={720 + Math.floor(i / 2) * 65} rx="18" ry="22" fill="#0a0804" opacity="0.6" />
        </g>
      ))}

      {/* Spotlight cone from ceiling */}
      <polygon
        points="440,0 640,0 700,700 380,700"
        fill="url(#cSpot)"
        opacity={spotlightPulse}
      />

      {/* Dust particles in light */}
      {[...Array(15)].map((_, i) => (
        <circle key={i}
          cx={450 + (i * 67) % 200}
          cy={200 + ((i * 83) % 400) + Math.sin(frame * 0.04 + i) * dustFloat}
          r={0.8}
          fill="white"
          opacity={0.08 + Math.sin(frame * 0.05 + i) * 0.05}
        />
      ))}

      {/* Floor */}
      <rect x="0" y="1780" width="1080" height="140" fill="#0a0804" />

      {/* Vignette */}
      <defs>
        <radialGradient id="cVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.82" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#cVig)" />
    </svg>
  );
};
