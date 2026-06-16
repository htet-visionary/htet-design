/**
 * Border radius — soft, pill-shaped corners from the Lucky Charm design.
 */

export const radius = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.75rem",
  card: "1.25rem",
  cardLg: "1.75rem",
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;
