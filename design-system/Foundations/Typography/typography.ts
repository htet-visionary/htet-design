/**
 * Typography from the Lucky Charm brand — Playfair Display, Lora, DM Sans.
 */

export const fontFamily = {
  display: 'var(--font-display), "Playfair Display", Georgia, serif',
  serif: 'var(--font-serif), "Lora", Georgia, serif',
  sans: 'var(--font-sans), "DM Sans", system-ui, sans-serif',
  mono: 'var(--font-geist-mono), "JetBrains Mono", monospace',
} as const;

export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  hero: "clamp(2.5rem, 5vw, 4.5rem)",
} as const;

export const fontWeight = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
} as const;

export const lineHeight = {
  tight: "1.15",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "1.85",
} as const;

export const letterSpacing = {
  tighter: "-0.03em",
  tight: "-0.02em",
  normal: "0",
  wide: "0.02em",
  wider: "0.06em",
  widest: "0.1em",
  label: "0.15em",
  eyebrow: "0.2em",
  nav: "0.06em",
} as const;

export const textStyles = {
  display: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.medium,
    fontStyle: "italic",
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading3: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  subheading: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    fontStyle: "italic",
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.wide,
  },
  body: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.wide,
  },
  bodySmall: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.label,
    textTransform: "uppercase" as const,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    textTransform: "uppercase" as const,
  },
  nav: {
    fontFamily: fontFamily.sans,
    fontSize: "0.85rem",
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.nav,
    textTransform: "uppercase" as const,
  },
} as const;
