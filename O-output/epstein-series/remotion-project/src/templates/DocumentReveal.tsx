import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Episode } from '../types';
import { COLORS, FONTS, SIZES } from '../design';
import { SceneBackground } from '../components/SceneBackground';

// Split voiceover into 4 punchy display phrases
function getDisplayPhrases(script: string): string[] {
  // Split on sentence boundaries
  const sentences = script
    .replace(/\n/g, ' ')
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  if (sentences.length === 0) return [script];

  // Pick 4 high-impact sentences distributed through the script
  const total = sentences.length;
  const indices = [
    0,
    Math.floor(total * 0.25),
    Math.floor(total * 0.55),
    total - 1,
  ];

  return indices.map(i => sentences[Math.min(i, total - 1)]);
}

export const DocumentReveal: React.FC<{ episode: Episode }> = ({ episode }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const phrases = getDisplayPhrases(episode.voiceover_script);

  // Each phrase gets ~12 seconds of screen time
  const phraseDuration = Math.floor(durationInFrames / (phrases.length + 1));

  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 35, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // EP badge
  const badgeOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Label + episode title
  const titleOpacity = interpolate(frame, [15, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Next episode" cliffhanger
  const cliffOpacity = interpolate(
    frame,
    [durationInFrames - 70, durationInFrames - 45],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const cliffY = interpolate(
    frame,
    [durationInFrames - 70, durationInFrames - 45],
    [30, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity: globalOpacity, background: COLORS.backgroundPrimary }}>

      {/* Animated illustrated background */}
      <SceneBackground episode={episode.episode} />

      {/* EP badge */}
      <div style={{
        position: 'absolute', top: 60, right: 60, zIndex: 10,
        opacity: badgeOpacity,
        background: COLORS.textAccent,
        color: COLORS.backgroundPrimary,
        fontFamily: FONTS.body,
        fontSize: 26, fontWeight: 800,
        padding: '10px 22px', borderRadius: 6, letterSpacing: 2,
      }}>
        EP. {String(episode.episode).padStart(2, '0')} / 30
      </div>

      {/* Top label */}
      <div style={{
        position: 'absolute', top: 140, left: 60, zIndex: 10,
        opacity: titleOpacity,
        fontFamily: FONTS.body, fontSize: SIZES.caption,
        color: COLORS.textAccent, letterSpacing: 5,
        textTransform: 'uppercase', fontWeight: 700,
      }}>
        Public Record
      </div>

      {/* Episode title */}
      <div style={{
        position: 'absolute', top: 188, left: 60, right: 140, zIndex: 10,
        opacity: titleOpacity,
        fontFamily: FONTS.headline, fontSize: SIZES.headlineMd,
        color: COLORS.textPrimary, lineHeight: 1.2, fontWeight: 700,
        textShadow: '0 2px 20px rgba(0,0,0,0.9)',
      }}>
        {episode.title}
      </div>

      {/* Kinetic phrases — main content */}
      {phrases.map((phrase, i) => {
        const startFrame = 60 + i * phraseDuration;
        const endFrame = startFrame + phraseDuration - 10;

        const opacity = interpolate(
          frame,
          [startFrame, startFrame + 25, endFrame - 20, endFrame],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const translateY = interpolate(
          frame,
          [startFrame, startFrame + 25],
          [28, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const isFirst = i === 0;
        const isLast = i === phrases.length - 1;

        return (
          <div key={i} style={{
            position: 'absolute',
            top: '42%',
            left: 60, right: 60,
            transform: `translateY(${translateY}px)`,
            opacity,
            zIndex: 10,
          }}>
            {/* Accent line */}
            <div style={{
              width: 60, height: 4,
              background: isLast ? COLORS.textDanger : COLORS.textAccent,
              marginBottom: 20,
              borderRadius: 2,
              boxShadow: `0 0 12px ${isLast ? COLORS.textDanger : COLORS.textAccent}`,
            }} />

            {/* The phrase text */}
            <div style={{
              fontFamily: FONTS.headline,
              fontSize: isFirst ? SIZES.headlineMd : SIZES.headlineSm + 4,
              color: COLORS.textPrimary,
              lineHeight: 1.35,
              fontWeight: 700,
              textShadow: '0 2px 24px rgba(0,0,0,0.95)',
              letterSpacing: isFirst ? 0 : 0.5,
            }}>
              {phrase}
            </div>

            {/* Phrase number dots */}
            <div style={{
              display: 'flex', gap: 8, marginTop: 24,
            }}>
              {phrases.map((_, j) => (
                <div key={j} style={{
                  width: j === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: j === i ? COLORS.textAccent : 'rgba(255,255,255,0.25)',
                  transition: 'width 0.3s',
                }} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Bottom gold rule */}
      <div style={{
        position: 'absolute', bottom: 230, left: 60, right: 60,
        height: 1, background: `linear-gradient(90deg, ${COLORS.textAccent}88, transparent)`,
        zIndex: 10,
        opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }} />

      {/* Source line */}
      <div style={{
        position: 'absolute', bottom: 185, left: 60,
        fontFamily: FONTS.body, fontSize: 20,
        color: COLORS.textPrimary, opacity: 0.4,
        letterSpacing: 2, textTransform: 'uppercase',
        zIndex: 10,
      }}>
        Source: Public Court Documents
      </div>

      {/* Cliffhanger */}
      <div style={{
        position: 'absolute', bottom: 110, left: 60, right: 60,
        opacity: cliffOpacity,
        transform: `translateY(${cliffY}px)`,
        zIndex: 10,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: FONTS.headline, fontSize: SIZES.headlineSm,
          color: COLORS.textAccent, fontStyle: 'italic', lineHeight: 1.4,
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}>
          Next episode →
        </div>
      </div>

    </AbsoluteFill>
  );
};
