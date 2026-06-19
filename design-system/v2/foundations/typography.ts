export const typeFamilies = {
  storyTitle: {
    name: "Story Title",
    family: "var(--font-playfair), 'Playfair Display', Georgia, serif",
    role: "Headlines, chapter titles, hero moments",
  },
  luckyNotes: {
    name: "Lucky Notes",
    family: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
    role: "Quotes, journal entries, gentle storytelling",
  },
  gentleVoice: {
    name: "Gentle Voice",
    family: "var(--font-inter), 'Inter', system-ui, sans-serif",
    role: "Body copy, labels, navigation",
  },
} as const;

export const typeExamples = [
  {
    text: "Good things are on their way.",
    family: "storyTitle" as const,
    size: "clamp(2rem, 5vw, 3.5rem)",
    style: "italic" as const,
  },
  {
    text: "Stay soft.",
    family: "luckyNotes" as const,
    size: "clamp(1.5rem, 3vw, 2.25rem)",
    style: "italic" as const,
  },
  {
    text: "Collect little moments that make you smile.",
    family: "luckyNotes" as const,
    size: "clamp(1.1rem, 2vw, 1.35rem)",
    style: "normal" as const,
  },
] as const;
