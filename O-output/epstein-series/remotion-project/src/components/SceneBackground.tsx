/**
 * SceneBackground.tsx
 * Maps each episode number to the correct animated SVG scene.
 * Each scene is a full-screen animated illustration — no images required.
 * When DALL-E images are generated, KenBurnsBackground will layer them on top.
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

import { CityScene } from '../scenes/CityScene';
import { IslandScene } from '../scenes/IslandScene';
import { PlaneScene } from '../scenes/PlaneScene';
import { DetectiveScene } from '../scenes/DetectiveScene';
import { MansionScene } from '../scenes/MansionScene';
import { CourtroomScene } from '../scenes/CourtroomScene';
import { JailScene } from '../scenes/JailScene';
import { AirportScene } from '../scenes/AirportScene';
import { ClassifiedScene } from '../scenes/ClassifiedScene';
import { DocumentScene } from '../scenes/DocumentScene';

// Maps episode number → animated scene type
const EPISODE_SCENE_MAP: Record<number, React.FC> = {
  1:  CityScene,       // NYC night — Epstein's rise from Brooklyn
  2:  MansionScene,    // Palm Beach mansion — where it started
  3:  MansionScene,    // Maxwell's world — dark elegant mansion
  4:  IslandScene,     // Little St. James island
  5:  PlaneScene,      // Lolita Express flight logs
  6:  DetectiveScene,  // Palm Beach PD — 36 girls, investigation board
  7:  CourtroomScene,  // Virginia Giuffre — sworn affidavit
  8:  CourtroomScene,  // Maxwell deposition — 188 "I don't recall"
  9:  DetectiveScene,  // 205-page prosecution memo
  10: MansionScene,    // Non-prosecution agreement — victims not told
  11: DocumentScene,   // The deal — documents signed in secret
  12: ClassifiedScene, // Intelligence connection — "belonged to intelligence"
  13: DocumentScene,   // Four names, free immunity
  14: JailScene,       // 13 months in a private wing
  15: AirportScene,    // 2009–2019: a decade of freedom, then arrested
  16: MansionScene,    // Prince Andrew — royal scandal
  17: CourtroomScene,  // Dershowitz deposition
  18: PlaneScene,      // Flight logs decoded
  19: CityScene,       // Bill Clinton — 26 flights
  20: IslandScene,     // Zorro Ranch — New Mexico compound
  21: AirportScene,    // July 6, 2019 — last landing
  22: JailScene,       // Removal of watch — MCC cell block
  23: JailScene,       // August 10, 2019 — 6:30 AM
  24: JailScene,       // Two doctors, one bone
  25: JailScene,       // The two guards — falsified records
  26: CourtroomScene,  // Maxwell trial — Brooklyn federal court
  27: DocumentScene,   // 950 pages that broke the internet
  28: ClassifiedScene, // Transparency Act — 3.5 million pages
  29: ClassifiedScene, // What they are still hiding
  30: CityScene,       // Finale — what we still don't know
};

interface Props {
  episode: number;
}

export const SceneBackground: React.FC<Props> = ({ episode }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Get the scene component for this episode, fallback to CityScene
  const SceneComponent = EPISODE_SCENE_MAP[episode] ?? CityScene;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity,
    }}>
      <SceneComponent />
      {/* Dark overlay — light enough to see the scene, dark enough for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.65) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};
