import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

// Episodes that have voiceover audio generated
const EPISODES_WITH_AUDIO = new Set([1,2,3,4,5,6,7,8,9,10,11]);
import { Episode } from '../types';
import { DocumentReveal } from '../templates/DocumentReveal';
import { TimelineReveal } from '../templates/TimelineReveal';
import { CounterReveal } from '../templates/CounterReveal';
import { ClassifiedReveal } from '../templates/ClassifiedReveal';
import { SplitReveal } from '../templates/SplitReveal';
import { HeadlineFlash } from '../templates/HeadlineFlash';
import { ListReveal } from '../templates/ListReveal';
import { FinalFade } from '../templates/FinalFade';
import { EpisodeBadge } from '../components/EpisodeBadge';
import { COLORS } from '../design';

interface Props {
  episode: Episode;
}

const TEMPLATE_MAP: Record<string, React.FC<{ episode: Episode }>> = {
  document_reveal: DocumentReveal,
  timeline_reveal: TimelineReveal,
  counter_reveal: CounterReveal,
  classified_reveal: ClassifiedReveal,
  split_reveal: SplitReveal,
  headline_flash: HeadlineFlash,
  list_reveal: ListReveal,
  final_fade: FinalFade,
  // aliases
  flight_map: TimelineReveal,
  satellite_reveal: DocumentReveal,
  medical_reveal: SplitReveal,
  clock_reveal: CounterReveal,
  verdict_reveal: HeadlineFlash,
};

export const EpisodeVideo: React.FC<Props> = ({ episode }) => {
  const Template = TEMPLATE_MAP[episode.remotion_template] ?? DocumentReveal;
  const epNum = String(episode.episode).padStart(2, '0');
  const audioFile = `audio/ep_${epNum}_voiceover.mp3`;

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundPrimary }}>
      <Template episode={episode} />
      <EpisodeBadge episode={episode.episode} />
      {EPISODES_WITH_AUDIO.has(episode.episode) && (
        <Audio src={staticFile(audioFile)} />
      )}
    </AbsoluteFill>
  );
};
