export interface Episode {
  episode: number;
  title: string;
  duration_target: string;
  voiceover_script: string;
  word_count: number;
  visual_prompts: string[];
  music_vibe: string;
  elevenlabs_voice: string;
  remotion_template: string;
}
