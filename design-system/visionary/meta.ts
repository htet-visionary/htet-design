/**
 * Visionary Design System — package metadata.
 * Source of truth: design-system/docs/design.md (beta)
 */
export const visionaryMeta = {
  name: "Visionary Design System",
  version: "beta",
  description:
    "Unified design language for all Visionary products — Lucky Charm, Dream Fund, and future products.",
  products: ["Lucky Charm", "Dream Fund", "Future Products"] as const,
  principles: [
    "Clarity Before Decoration",
    "Emotion Through Simplicity",
    "Consistency Over Customization",
    "Accessibility By Default",
    "Content First",
  ] as const,
  specPath: "docs/design.md",
} as const;

export type VisionaryMeta = typeof visionaryMeta;
