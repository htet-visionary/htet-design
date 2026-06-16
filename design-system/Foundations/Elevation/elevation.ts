/**
 * Elevation — soft green and purple tinted shadows from the Lucky Charm design.
 */

export const elevation = {
  none: "none",
  xs: "0 1px 2px rgba(61, 53, 48, 0.04)",
  sm: "0 2px 8px rgba(61, 53, 48, 0.06)",
  md: "0 4px 16px rgba(61, 53, 48, 0.08)",
  lg: "0 8px 32px rgba(61, 53, 48, 0.1)",
  card: "0 12px 32px rgba(91, 122, 85, 0.12)",
  cardHover: "0 8px 20px rgba(142, 111, 174, 0.15)",
  primaryHover: "0 8px 24px rgba(142, 111, 174, 0.3)",
  iridescent:
    "0 4px 24px rgba(255, 153, 153, 0.2), 0 2px 8px rgba(153, 221, 255, 0.15)",
} as const;

export type ElevationToken = keyof typeof elevation;
