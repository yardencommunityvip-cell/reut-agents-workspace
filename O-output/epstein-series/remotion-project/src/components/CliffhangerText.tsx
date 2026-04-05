import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SIZES } from '../design';

interface Props {
  text: string;
}

export const CliffhangerText: React.FC<Props> = ({ text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const startFrame = durationInFrames - 60;
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [startFrame, startFrame + 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 60,
        right: 60,
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: FONTS.headline,
          fontSize: SIZES.headlineSm,
          color: COLORS.textAccent,
          fontStyle: 'italic',
          lineHeight: 1.4,
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: FONTS.body,
          fontSize: SIZES.caption,
          color: COLORS.textPrimary,
          opacity: 0.7,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}
      >
        Next Episode →
      </div>
    </div>
  );
};
