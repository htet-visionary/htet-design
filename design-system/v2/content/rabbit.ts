export const rabbitGuide = {
  title: "The Lucky Rabbit",
  subtitle: "Illustration guidelines for our gentle mascot",
  views: [
    { id: "front", label: "Front View", pose: "🐇" },
    { id: "side", label: "Side View", pose: "🐰" },
  ],
  expressions: [
    { label: "Calm", emoji: "😌", note: "Default — peaceful, present" },
    { label: "Hopeful", emoji: "🌸", note: "Eyes slightly lifted" },
    { label: "Sleepy", emoji: "😴", note: "Soft, resting moments" },
    { label: "Joyful", emoji: "✨", note: "Subtle sparkle, never loud" },
  ],
  poses: ["Sitting", "Hopping", "Holding clover", "With tea cup", "Curled up"],
  accessories: ["Clover charm", "Lavender sprig", "Ribbon bow", "Tiny pillow"],
  doRules: [
    "Rounded forms",
    "Soft eyes",
    "Calm expressions",
    "Warm personality",
  ],
  avoidRules: [
    "Sharp features",
    "Aggressive emotions",
    "High contrast",
  ],
} as const;
