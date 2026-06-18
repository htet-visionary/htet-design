/**
 * Design System v0 — Color Foundations
 * Apple-inspired color architecture for the entire ecosystem.
 */

export const brandIridescence =
  "linear-gradient(135deg, #D4C5E2 0%, #F5F0E8 28%, #E8D4A8 52%, #C8DBC4 100%)";

export const brandColors = [
  {
    id: "primary-green",
    name: "Primary Brand Green",
    hex: "#5C7B56",
    usage:
      "Primary actions, key brand moments, and confident UI emphasis. The anchor of the system's calm, natural identity.",
  },
  {
    id: "brand-lavender",
    name: "Brand Lavender",
    hex: "#8E6FAD",
    usage:
      "Accent highlights, secondary emphasis, and emotional warmth. Used sparingly for premium contrast.",
  },
  {
    id: "brand-iridescence",
    name: "Brand Iridescence",
    hex: "Gradient",
    gradient: brandIridescence,
    usage:
      "Special surfaces, hero accents, and moments of quiet delight. Never used for body text or dense UI.",
  },
] as const;

export const primitiveRamps = {
  green: {
    name: "Green",
    steps: {
      50: "#F4F7F3",
      100: "#E3EBE1",
      200: "#C5D5C1",
      300: "#A3BDA0",
      400: "#7F9E7A",
      500: "#5C7B56",
      600: "#4A6345",
      700: "#3A4E36",
      800: "#2B3A28",
      900: "#1C261A",
    },
  },
  lavender: {
    name: "Lavender",
    steps: {
      50: "#F6F3F9",
      100: "#EAE3F2",
      200: "#D4C5E2",
      300: "#BBA9D4",
      400: "#A48FC1",
      500: "#8E6FAD",
      600: "#735A8F",
      700: "#58466E",
      800: "#3E324D",
      900: "#261F2F",
    },
  },
  neutral: {
    name: "Neutral",
    steps: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },
  cream: {
    name: "Cream",
    steps: {
      50: "#FDFCFB",
      100: "#F9F7F4",
      200: "#F3F0EB",
      300: "#EBE6DF",
      400: "#DDD6CC",
      500: "#C9C0B4",
      600: "#A89E90",
      700: "#877D70",
      800: "#665E54",
      900: "#454038",
    },
  },
} as const;

export const functionalRamps = {
  success: {
    name: "Success",
    usage: "Confirmations, completed states, and positive feedback.",
    steps: primitiveRamps.green.steps,
  },
  warning: {
    name: "Warning",
    usage: "Cautionary states that require attention without alarm.",
    steps: {
      50: "#FBF8EE",
      100: "#F5EDD4",
      200: "#EBDBA8",
      300: "#DFC67A",
      400: "#D4B452",
      500: "#C4A035",
      600: "#A3832A",
      700: "#826622",
      800: "#614A19",
      900: "#403011",
    },
  },
  error: {
    name: "Error",
    usage: "Destructive actions, validation errors, and critical alerts.",
    steps: {
      50: "#FAF4F4",
      100: "#F2E2E2",
      200: "#E8C9C9",
      300: "#D9A8A8",
      400: "#CC8282",
      500: "#C45C5C",
      600: "#A34A4A",
      700: "#823939",
      800: "#612929",
      900: "#401B1B",
    },
  },
  info: {
    name: "Info",
    usage: "Informational messages and neutral system guidance.",
    steps: {
      50: "#F4F6F8",
      100: "#E6EDF2",
      200: "#CCD9E3",
      300: "#AFC2D4",
      400: "#8FA9C1",
      500: "#6B8EAF",
      600: "#567391",
      700: "#425870",
      800: "#2F3F50",
      900: "#1C2731",
    },
  },
} as const;

export const functionalColors = Object.values(functionalRamps).map((ramp) => ({
  id: ramp.name.toLowerCase(),
  name: ramp.name,
  hex: ramp.steps[500],
  usage: ramp.usage,
}));

export const semanticColors = [
  {
    token: "background.primary",
    value: "#FDFCFB",
    primitive: "cream.50",
    usage: "Default page background",
  },
  {
    token: "background.secondary",
    value: "#FAFAFA",
    primitive: "neutral.50",
    usage: "Alternate sections and inset areas",
  },
  {
    token: "surface.default",
    value: "#FFFFFF",
    primitive: "—",
    usage: "Cards, panels, and elevated surfaces",
  },
  {
    token: "surface.subtle",
    value: "#F9F7F4",
    primitive: "cream.100",
    usage: "Muted containers and grouped content",
  },
  {
    token: "text.primary",
    value: "#171717",
    primitive: "neutral.900",
    usage: "Headlines and primary body copy",
  },
  {
    token: "text.secondary",
    value: "#525252",
    primitive: "neutral.600",
    usage: "Supporting text and descriptions",
  },
  {
    token: "text.tertiary",
    value: "#737373",
    primitive: "neutral.500",
    usage: "Captions, placeholders, and metadata",
  },
  {
    token: "text.inverse",
    value: "#FFFFFF",
    primitive: "—",
    usage: "Text on dark or saturated backgrounds",
  },
  {
    token: "border.default",
    value: "#E5E5E5",
    primitive: "neutral.200",
    usage: "Standard dividers and outlines",
  },
  {
    token: "border.subtle",
    value: "#F3F0EB",
    primitive: "cream.200",
    usage: "Low-contrast separation",
  },
  {
    token: "action.primary",
    value: "#5C7B56",
    primitive: "green.500",
    usage: "Primary buttons and links",
  },
  {
    token: "action.primary.hover",
    value: "#4A6345",
    primitive: "green.600",
    usage: "Primary interactive hover state",
  },
  {
    token: "action.accent",
    value: "#8E6FAD",
    primitive: "lavender.500",
    usage: "Secondary actions and accent CTAs",
  },
] as const;

export const v0Meta = {
  name: "Design System",
  version: "0",
  page: "Color Foundations",
  description:
    "A foundational color architecture designed for a calm, luxurious, and emotionally comforting experience.",
} as const;
