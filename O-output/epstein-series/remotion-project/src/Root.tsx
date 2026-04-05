import React from 'react';
import { Composition } from 'remotion';
import { EpisodeVideo } from './compositions/EpisodeVideo';
import episodes from '../../ALL_30_EPISODES_MASTER.json';

const FPS = 30;
const DURATION_SECONDS = 65;
const DURATION_FRAMES = FPS * DURATION_SECONDS;
const WIDTH = 1080;
const HEIGHT = 1920;

export const Root: React.FC = () => {
  return (
    <>
      {episodes.map((episode) => (
        <Composition
          key={`ep-${episode.episode}`}
          id={`Episode${String(episode.episode).padStart(2, '0')}`}
          component={EpisodeVideo}
          durationInFrames={DURATION_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ episode }}
        />
      ))}
    </>
  );
};
