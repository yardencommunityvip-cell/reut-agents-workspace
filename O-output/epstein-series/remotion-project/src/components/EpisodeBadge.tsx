import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS, SIZES } from '../design';

export const EpisodeBadge: React.FC<{ episode: number }> = ({ episode }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        right: 60,
        opacity,
        background: COLORS.textAccent,
        color: COLORS.backgroundPrimary,
        fontFamily: FONTS.body,
        fontSize: SIZES.badge,
        fontWeight: 800,
        padding: '10px 22px',
        borderRadius: 6,
        letterSpacing: 2,
      }}
    >
      EP. {String(episode).padStart(2, '0')} / 30
    </div>
  );
};
