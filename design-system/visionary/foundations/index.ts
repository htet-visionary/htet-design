/**
 * Foundation scales — spacing, radius, typography, icons, elevation, motion, layout.
 * Source: docs/design.md
 */

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  24: 96,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const fonts = {
  display: {
    family: "Playfair Display",
    fallback: "Georgia, serif",
  },
  reading: {
    family: "Lora",
    fallback: "Georgia, serif",
  },
  interface: {
    family: "DM Sans",
    fallback: "system-ui, sans-serif",
  },
} as const;

export const typography = {
  hero: {
    font: "display",
    size: 72,
    weight: 400,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  headingXl: {
    font: "display",
    size: 56,
    weight: 400,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  headingLg: {
    font: "display",
    size: 40,
    weight: 400,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  headingMd: {
    font: "display",
    size: 32,
    weight: 400,
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },
  headingSm: {
    font: "display",
    size: 24,
    weight: 400,
    lineHeight: 1.3,
    letterSpacing: "0",
  },
  bodyLg: {
    font: "reading",
    size: 18,
    weight: 400,
    lineHeight: 1.6,
    letterSpacing: "0",
  },
  body: {
    font: "reading",
    size: 16,
    weight: 400,
    lineHeight: 1.6,
    letterSpacing: "0",
  },
  label: {
    font: "interface",
    size: 14,
    weight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.01em",
  },
  caption: {
    font: "interface",
    size: 12,
    weight: 400,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
  },
} as const;

export const reading = {
  maxWidth: "65ch",
  optimalWidth: "60ch",
} as const;

export const icons = {
  library: "Lucide",
  strokeWidth: 2,
  size: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },
  gap: {
    inline: spacing[2],
  },
  color: {
    default: "text.secondary",
    muted: "text.muted",
    primary: "action.primary",
    onSolid: "text.on-solid",
    statusSuccess: "status.success.icon",
    statusWarning: "status.warning.icon",
    statusError: "status.error.icon",
    statusInfo: "status.info.icon",
  },
} as const;

export const elevation = {
  card: {
    shadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
    zIndex: 1,
  },
  dropdown: {
    shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    zIndex: 100,
  },
  overlay: {
    zIndex: 150,
  },
  modal: {
    shadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
    zIndex: 200,
  },
} as const;

export const motion = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 400,
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const touchTarget = {
  minimum: 44,
  recommended: 48,
  spacingBetween: spacing[2],
} as const;

export const focusRing = {
  width: 2,
  style: "solid",
  offset: 2,
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const container = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1120,
  full: "100%",
} as const;

export const content = {
  narrow: 560,
  reading: 680,
  wide: 960,
} as const;

export const grid = {
  columns: 12,
  gutter: spacing[4],
  gutterLg: spacing[6],
  margin: spacing[4],
  marginLg: spacing[8],
} as const;

export const foundations = {
  spacing,
  radius,
  fonts,
  typography,
  reading,
  icons,
  elevation,
  motion,
  touchTarget,
  focusRing,
  breakpoints,
  container,
  content,
  grid,
} as const;

export type Foundations = typeof foundations;
