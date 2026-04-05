import React, { useState } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

interface Props {
  episode: number;
  zoomDirection?: 'in' | 'out';
  panDirection?: 'left' | 'right' | 'none';
}

// Gradient fallbacks per episode — used until DALL-E images are generated
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0d0d0d 100%)',
  'linear-gradient(135deg, #0a0f1a 0%, #0d1f0d 50%, #0a0a0a 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #0a0a1a 50%, #0d0d0d 100%)',
  'linear-gradient(135deg, #001a1a 0%, #0a0a0a 50%, #1a1200 100%)',
  'linear-gradient(135deg, #0a0a1a 0%, #1a0a0a 50%, #0a0a0a 100%)',
  'linear-gradient(135deg, #0d0d0d 0%, #1a1200 50%, #0a0f1a 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #0a0a0a 50%, #001a1a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #0d0d1a 50%, #1a0a0a 100%)',
  'linear-gradient(135deg, #0d1a0d 0%, #0a0a0a 50%, #1a1200 100%)',
  'linear-gradient(135deg, #1a1a0a 0%, #0a0a1a 50%, #0a0a0a 100%)',
];

export const KenBurnsBackground: React.FC<Props> = ({
  episode,
  zoomDirection = 'in',
  panDirection = 'left',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const padded = String(episode).padStart(2, '0');
  const src = staticFile(`images/ep_${padded}_bg.png`);
  const [imgError, setImgError] = useState(false);

  const scale = zoomDirection === 'in'
    ? interpolate(frame, [0, durationInFrames], [1.0, 1.15])
    : interpolate(frame, [0, durationInFrames], [1.15, 1.0]);

  const translateX = panDirection === 'left'
    ? interpolate(frame, [0, durationInFrames], [0, -3])
    : panDirection === 'right'
    ? interpolate(frame, [0, durationInFrames], [0, 3])
    : 0;

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fallbackGradient = FALLBACK_GRADIENTS[(episode - 1) % FALLBACK_GRADIENTS.length];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity }}>
      {imgError ? (
        /* Fallback gradient when image not yet generated */
        <div style={{
          width: '100%', height: '100%',
          background: fallbackGradient,
          transform: `scale(${scale}) translateX(${translateX}%)`,
          transformOrigin: 'center center',
        }} />
      ) : (
        <Img
          src={src}
          onError={() => setImgError(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale}) translateX(${translateX}%)`,
            transformOrigin: 'center center',
          }}
        />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.88) 100%)',
      }} />
    </div>
  );
};
