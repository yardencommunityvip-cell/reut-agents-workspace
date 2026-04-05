import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, SIZES } from '../design';
import { getPhrases } from '../lib/getPhrases';

interface Props {
  script: string;
  accentColor?: string;
}

export const KineticPhrases: React.FC<Props> = ({
  script,
  accentColor = COLORS.textAccent,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const phrases = getPhrases(script);
  const phraseDuration = Math.floor((durationInFrames - 80) / phrases.length);

  const cliffOpacity = interpolate(
    frame,
    [durationInFrames - 70, durationInFrames - 45],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const cliffY = interpolate(
    frame,
    [durationInFrames - 70, durationInFrames - 45],
    [24, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {phrases.map((phrase, i) => {
        const startFrame = 55 + i * phraseDuration;
        const endFrame = startFrame + phraseDuration - 8;

        const opacity = interpolate(
          frame,
          [startFrame, startFrame + 22, endFrame - 18, endFrame],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const translateY = interpolate(
          frame,
          [startFrame, startFrame + 22],
          [26, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const isLast = i === phrases.length - 1;

        return (
          <div key={i} style={{
            position: 'absolute',
            top: '40%',
            left: 60, right: 60,
            transform: `translateY(${translateY}px)`,
            opacity,
            zIndex: 10,
          }}>
            {/* Accent bar */}
            <div style={{
              width: 56, height: 4,
              background: isLast ? COLORS.textDanger : accentColor,
              marginBottom: 22, borderRadius: 2,
              boxShadow: `0 0 14px ${isLast ? COLORS.textDanger : accentColor}99`,
            }} />

            {/* Main phrase */}
            <div style={{
              fontFamily: FONTS.headline,
              fontSize: SIZES.headlineSm + 6,
              color: COLORS.textPrimary,
              lineHeight: 1.3,
              fontWeight: 700,
              textShadow: '0 2px 28px rgba(0,0,0,0.95)',
            }}>
              {phrase}
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
              {phrases.map((_, j) => (
                <div key={j} style={{
                  width: j === i ? 28 : 8,
                  height: 8, borderRadius: 4,
                  background: j === i ? accentColor : 'rgba(255,255,255,0.22)',
                }} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Source line */}
      <div style={{
        position: 'absolute', bottom: 195, left: 60, zIndex: 10,
        fontFamily: FONTS.body, fontSize: 19,
        color: COLORS.textPrimary, opacity: 0.38,
        letterSpacing: 2, textTransform: 'uppercase',
      }}>
        Source: Public Court Documents
      </div>

      {/* Gold rule */}
      <div style={{
        position: 'absolute', bottom: 240, left: 60, right: 60, height: 1,
        background: `linear-gradient(90deg, ${accentColor}77, transparent)`,
        zIndex: 10,
        opacity: interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }} />

      {/* Cliffhanger */}
      <div style={{
        position: 'absolute', bottom: 115, left: 60, right: 60,
        opacity: cliffOpacity,
        transform: `translateY(${cliffY}px)`,
        zIndex: 10, textAlign: 'center',
      }}>
        <div style={{
          fontFamily: FONTS.headline, fontSize: SIZES.headlineSm,
          color: accentColor, fontStyle: 'italic', lineHeight: 1.4,
          textShadow: '0 2px 20px rgba(0,0,0,0.85)',
        }}>
          Next episode →
        </div>
      </div>
    </>
  );
};
