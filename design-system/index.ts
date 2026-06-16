/**
 * Design System — soft, organic UI inspired by the mood board palette.
 * Soft Green · Misty Grey · White Rabbit · Statice Purple · Golden Iridescence
 */

export * from "./Foundations";
export * from "./Tokens";
export * from "./Components";
export * from "./Documentation";

export const designSystemMeta = {
  name: "Lucky Charm Design System",
  version: "1.1.0",
  description:
    "Soft, organic tokens and components from the Lucky Charm brand — meadow greens, lavender accents, and golden iridescence.",
  palette: [
    "Soft Green",
    "Misty Grey",
    "White Rabbit",
    "Statice Purple",
    "Golden Iridescence",
  ],
} as const;
