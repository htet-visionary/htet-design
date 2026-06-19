export const motionPresets = {
  floatingClover: {
    name: "Floating Clover",
    description: "A gentle rise and sway, like a clover drifting on breeze.",
    animate: { y: [0, -12, 0], rotate: [0, 3, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
  morningBreeze: {
    name: "Morning Breeze",
    description: "Slow horizontal drift with soft opacity pulse.",
    animate: { x: [0, 8, 0], opacity: [0.7, 1, 0.7] },
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
  magicDust: {
    name: "Magic Dust",
    description: "Sparkling shimmer for iridescent accents.",
    animate: { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  pillowDrop: {
    name: "Pillow Drop",
    description: "Soft landing with a gentle bounce.",
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};
