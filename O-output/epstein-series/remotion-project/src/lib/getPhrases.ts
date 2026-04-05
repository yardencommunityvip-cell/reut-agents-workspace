/**
 * Splits a voiceover script into 4 punchy display phrases.
 * Used by all templates so the video shows real content, not prompts.
 */
export function getPhrases(script: string): string[] {
  const sentences = script
    .replace(/\n/g, ' ')
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 12);

  if (sentences.length === 0) return [script];

  const total = sentences.length;
  const indices = [
    0,
    Math.floor(total * 0.28),
    Math.floor(total * 0.58),
    total - 1,
  ];

  return indices.map(i => sentences[Math.min(i, total - 1)]);
}
