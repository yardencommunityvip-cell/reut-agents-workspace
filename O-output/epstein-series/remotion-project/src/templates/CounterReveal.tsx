import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Episode } from '../types';
import { COLORS, FONTS, SIZES } from '../design';
import { SceneBackground } from '../components/SceneBackground';
import { KineticPhrases } from '../components/KineticPhrases';

function extractNumber(episode: Episode): number {
  const matches = episode.title.match(/\d+/g);
  if (matches) return Math.max(...matches.map(Number));
  return episode.episode * 7;
}

export const CounterReveal: React.FC<{ episode: Episode }> = ({ episode }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const target = extractNumber(episode);
  const badgeOpacity  = interpolate(frame, [0, 20],   [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity  = interpolate(frame, [15, 50],  [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterValue  = Math.floor(interpolate(frame, [30, 240], [0, target], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOpacity = interpolate(frame, [30, 60, 240, 300], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const globalOpacity = interpolate(frame, [durationInFrames - 35, durationInFrames - 5], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: globalOpacity, background: COLORS.backgroundPrimary }}>
      <SceneBackground episode={episode.episode} />

      <div style={{ position: 'absolute', top: 60, right: 60, zIndex: 10, opacity: badgeOpacity, background: COLORS.textAccent, color: COLORS.backgroundPrimary, fontFamily: FONTS.body, fontSize: 26, fontWeight: 800, padding: '10px 22px', borderRadius: 6, letterSpacing: 2 }}>
        EP. {String(episode.episode).padStart(2, '0')} / 30
      </div>

      <div style={{ position: 'absolute', top: 140, left: 60, zIndex: 10, opacity: titleOpacity, fontFamily: FONTS.body, fontSize: SIZES.caption, color: COLORS.textAccent, letterSpacing: 5, textTransform: 'uppercase', fontWeight: 700 }}>
        The Numbers
      </div>

      <div style={{ position: 'absolute', top: 188, left: 60, right: 140, zIndex: 10, opacity: titleOpacity, fontFamily: FONTS.headline, fontSize: SIZES.headlineMd, color: COLORS.textPrimary, lineHeight: 1.2, fontWeight: 700, textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
        {episode.title}
      </div>

      {/* Big counter fades out, then kinetic phrases take over */}
      <div style={{ position: 'absolute', top: '35%', left: 0, right: 0, textAlign: 'center', zIndex: 10, opacity: counterOpacity }}>
        <div style={{ fontFamily: FONTS.headline, fontSize: 180, fontWeight: 900, color: COLORS.textPrimary, lineHeight: 1, textShadow: `0 0 80px ${COLORS.textAccent}55, 0 4px 32px rgba(0,0,0,0.9)` }}>
          {counterValue.toLocaleString()}
        </div>
      </div>

      <KineticPhrases script={episode.voiceover_script} accentColor={COLORS.textAccent} />
    </AbsoluteFill>
  );
};
