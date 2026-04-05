import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const JailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const panX = interpolate(frame, [0, durationInFrames], [0, -20]);
  const lightSwing = Math.sin(frame * 0.04) * 15;
  const lightOpacity = 0.7 + Math.sin(frame * 0.06) * 0.1;
  const clockSecond = Math.floor(frame / 30) % 60;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="jCorr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030506" />
          <stop offset="100%" stopColor="#010203" />
        </linearGradient>
        <linearGradient id="jCell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080a0c" />
          <stop offset="100%" stopColor="#040506" />
        </linearGradient>
        <radialGradient id="jBulb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#C8A951" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="jGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="jHarsh">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background corridor */}
      <rect width="1080" height="1920" fill="url(#jCorr)" />

      {/* Corridor perspective - walls */}
      {/* Left wall vanishing to center */}
      <polygon points="0,0 540,400 540,1920 0,1920" fill="#060808" />
      <polygon points="1080,0 540,400 540,1920 1080,1920" fill="#070a0c" />
      {/* Floor */}
      <polygon points="0,1920 1080,1920 540,400" fill="#050707" />
      {/* Ceiling */}
      <polygon points="0,0 1080,0 540,400" fill="#040606" />

      {/* Corridor tiles on floor */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i}
          x1={0} y1={1920 - i * 250}
          x2={1080} y2={1920 - i * 250}
          stroke="#080a0c" strokeWidth="2" opacity="0.5"
        />
      ))}

      {/* Cell bars on both sides */}
      {/* Left side bars */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i}
          x1={30 + i * 18}
          y1="0"
          x2={30 + i * 18}
          y2="1920"
          stroke="#1a1c1e"
          strokeWidth="6"
          opacity="0.8"
        />
      ))}
      {/* Left horizontal bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={300 + i * 350} x2="180" y2={300 + i * 350} stroke="#1a1c1e" strokeWidth="4" opacity="0.7" />
      ))}

      {/* Right side bars */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i}
          x1={900 + i * 18}
          y1="0"
          x2={900 + i * 18}
          y2="1920"
          stroke="#1a1c1e"
          strokeWidth="6"
          opacity="0.8"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="900" y1={300 + i * 350} x2="1080" y2={300 + i * 350} stroke="#1a1c1e" strokeWidth="4" opacity="0.7" />
      ))}

      {/* The CELL - center focus (end of corridor) */}
      <g transform={`translate(${panX}, 0)`}>
        {/* Cell door frame */}
        <rect x="380" y="400" width="320" height="800" fill="#060a0c" stroke="#1a1c1e" strokeWidth="5" />

        {/* Cell bars on door */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i}
            x1={395 + i * 45}
            y1="400"
            x2={395 + i * 45}
            y2="1200"
            stroke="#1a2025"
            strokeWidth="7"
            opacity="0.9"
          />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={i} x1="380" y1={580 + i * 250} x2="700" y2={580 + i * 250} stroke="#1a2025" strokeWidth="5" opacity="0.8" />
        ))}

        {/* Lock mechanism */}
        <rect x="685" y="740" width="30" height="50" rx="4" fill="#222" />
        <circle cx="700" cy="755" r="8" fill="#1a1a1a" />

        {/* Cell interior */}
        <rect x="390" y="410" width="300" height="790" fill="#050608" />

        {/* Bunk bed silhouette */}
        <rect x="410" y="1050" width="200" height="15" rx="3" fill="#121416" opacity="0.9" />
        <rect x="410" y="900" width="200" height="15" rx="3" fill="#121416" opacity="0.9" />
        <line x1="410" y1="900" x2="410" y2="1150" stroke="#121416" strokeWidth="5" />
        <line x1="610" y1="900" x2="610" y2="1150" stroke="#121416" strokeWidth="5" />
        {/* Mattress outline */}
        <rect x="415" y="1065" width="190" height="30" rx="2" fill="#0a0c0e" />

        {/* Toilet/sink silhouette */}
        <ellipse cx="650" cy="1120" rx="25" ry="20" fill="#0a0c0e" />
        <rect x="625" y="1050" width="50" height="30" rx="3" fill="#0a0c0e" />

        {/* Small barred window in cell - high up */}
        <rect x="460" y="450" width="80" height="55" rx="2" fill="#080e16" />
        {/* Moonlight through window */}
        <rect x="460" y="450" width="80" height="55" rx="2" fill="#0a1830" opacity="0.6" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1={472 + i * 22} y1="450" x2={472 + i * 22} y2="505" stroke="#1a2030" strokeWidth="3" />
        ))}
        <line x1="460" y1="478" x2="540" y2="478" stroke="#1a2030" strokeWidth="2" />
        {/* Light shaft from window */}
        <polygon
          points="460,505 540,505 600,850 400,850"
          fill="#C8A951"
          opacity="0.025"
        />
      </g>

      {/* Swinging overhead light */}
      <g transform={`translate(${540 + lightSwing}, 0)`}>
        <line x1="0" y1="0" x2="0" y2="300" stroke="#1a1a1a" strokeWidth="3" />
        <ellipse cx="0" cy="300" rx="15" ry="10" fill="#1a1a1a" />
        {/* Bulb */}
        <circle cx="0" cy="315" r="18" fill="#fff8e0" opacity={lightOpacity} filter="url(#jGlow)" />
        {/* Light cone */}
        <polygon
          points="-180,1920 180,1920 80,330 -80,330"
          fill="url(#jBulb)"
          opacity={lightOpacity * 0.4}
        />
      </g>

      {/* Security camera */}
      <g transform="translate(200, 150)">
        <rect x="-20" y="-15" width="40" height="25" rx="4" fill="#0a0c0e" />
        <circle cx="10" cy="-3" r="8" fill="#050608" />
        <circle cx="10" cy="-3" r="5" fill="#0a0a0a" />
        {/* Red LED - blinking */}
        <circle cx="-12" cy="-3" r="4" fill="#B22222" opacity={Math.sin(frame * 0.2) > 0 ? 0.8 : 0.1} />
      </g>

      {/* Camera - other side */}
      <g transform="translate(880, 150)">
        <rect x="-20" y="-15" width="40" height="25" rx="4" fill="#0a0c0e" />
        <circle cx="10" cy="-3" r="8" fill="#050608" />
        <circle cx="10" cy="-3" r="5" fill="#0a0a0a" />
        {/* Camera 2 is OFF */}
        <circle cx="-12" cy="-3" r="4" fill="#333" opacity="0.4" />
        <text x="-16" y="20" fill="#B22222" fontSize="9" fontFamily="monospace" opacity="0.6">NO SIGNAL</text>
      </g>

      {/* Wall clock */}
      <g transform="translate(800, 280)">
        <circle cx="0" cy="0" r="55" fill="#0a0c0e" stroke="#1a1c1e" strokeWidth="4" />
        <circle cx="0" cy="0" r="50" fill="#050608" />
        {/* Clock face numbers */}
        {[12, 3, 6, 9].map((n, i) => (
          <text key={i}
            x={Math.sin((i * 90 * Math.PI) / 180) * 35}
            y={-Math.cos((i * 90 * Math.PI) / 180) * 35 + 5}
            textAnchor="middle"
            fill="#C8A951"
            fontSize="12"
            fontFamily="'Courier New', monospace"
            opacity="0.6"
          >{n}</text>
        ))}
        {/* Hour hand ~22:30 */}
        <line x1="0" y1="0" x2="-18" y2="-20" stroke="#C8A951" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        {/* Minute hand */}
        <line x1="0" y1="0"
          x2={Math.sin((clockSecond * 6 * Math.PI) / 180) * 36}
          y2={-Math.cos((clockSecond * 6 * Math.PI) / 180) * 36}
          stroke="#C8A951" strokeWidth="2" strokeLinecap="round" opacity="0.6"
        />
        <circle cx="0" cy="0" r="3" fill="#C8A951" opacity="0.7" />
      </g>

      {/* Guard desk in far distance (at corridor vanishing point) */}
      <g transform="translate(470, 380)">
        <rect x="0" y="0" width="140" height="50" rx="3" fill="#080a0c" opacity="0.7" />
        {/* Guard slumped */}
        <ellipse cx="70" cy="-5" rx="25" ry="15" fill="#060808" opacity="0.7" />
        {/* Computer screen glow */}
        <rect x="50" y="-20" width="40" height="28" rx="3" fill="#0a1830" opacity="0.4" />
        <rect x="52" y="-18" width="36" height="24" rx="2" fill="#0d2040" opacity="0.5" />
      </g>

      {/* Vignette */}
      <defs>
        <radialGradient id="jVig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.88" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#jVig)" />
    </svg>
  );
};
