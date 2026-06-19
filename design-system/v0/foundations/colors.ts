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

const cream = primitiveRamps.cream.steps;
const green = primitiveRamps.green.steps;
const lavender = primitiveRamps.lavender.steps;
const neutral = primitiveRamps.neutral.steps;
const warning = functionalRamps.warning.steps;
const error = functionalRamps.error.steps;
const info = functionalRamps.info.steps;

export const semanticColors = [
  {
    token: "background.primary",
    value: cream[50],
    primitive: "cream.50",
    usage: "Default page background",
  },
  {
    token: "background.secondary",
    value: cream[100],
    primitive: "cream.100",
    usage: "Alternate sections and inset areas",
  },
  {
    token: "background.tertiary",
    value: green[50],
    primitive: "green.50",
    usage: "Soft tinted backgrounds and highlights",
  },
  {
    token: "surface.default",
    value: "#FFFFFF",
    primitive: "—",
    usage: "Cards, panels, and elevated surfaces",
  },
  {
    token: "surface.subtle",
    value: cream[100],
    primitive: "cream.100",
    usage: "Muted containers and grouped content",
  },
  {
    token: "surface.accent",
    value: lavender[50],
    primitive: "lavender.50",
    usage: "Accent-tinted surfaces and hover states",
  },
  {
    token: "text.primary",
    value: neutral[900],
    primitive: "neutral.900",
    usage: "Headlines and primary body copy",
  },
  {
    token: "text.secondary",
    value: neutral[600],
    primitive: "neutral.600",
    usage: "Supporting text and descriptions",
  },
  {
    token: "text.tertiary",
    value: neutral[500],
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
    token: "text.accent",
    value: lavender[500],
    primitive: "lavender.500",
    usage: "Accent labels, links, and emphasis",
  },
  {
    token: "border.default",
    value: neutral[200],
    primitive: "neutral.200",
    usage: "Standard dividers and outlines",
  },
  {
    token: "border.subtle",
    value: cream[200],
    primitive: "cream.200",
    usage: "Low-contrast separation",
  },
  {
    token: "border.accent",
    value: "rgba(142, 111, 173, 0.28)",
    primitive: "lavender.500",
    usage: "Interactive hover outlines and focus rings",
  },
  {
    token: "action.primary",
    value: green[500],
    primitive: "green.500",
    usage: "Primary buttons and links",
  },
  {
    token: "action.primary.hover",
    value: lavender[500],
    primitive: "lavender.500",
    usage: "Primary interactive hover state",
  },
  {
    token: "action.primary.active",
    value: lavender[600],
    primitive: "lavender.600",
    usage: "Primary pressed and active state",
  },
  {
    token: "action.accent",
    value: lavender[500],
    primitive: "lavender.500",
    usage: "Secondary actions and accent CTAs",
  },
  {
    token: "action.accent.hover",
    value: lavender[600],
    primitive: "lavender.600",
    usage: "Accent interactive hover state",
  },
  {
    token: "brand.green",
    value: green[500],
    primitive: "green.500",
    usage: "Core brand identity and primary emphasis",
  },
  {
    token: "brand.lavender",
    value: lavender[500],
    primitive: "lavender.500",
    usage: "Brand accent and emotional warmth",
  },
  {
    token: "accent.iridescent",
    value: brandIridescence,
    primitive: "brand gradient",
    usage: "Hero accents, dividers, and special highlights",
    gradient: true,
  },
  {
    token: "feedback.success",
    value: green[500],
    primitive: "success.500",
    usage: "Success messages and positive states",
  },
  {
    token: "feedback.success.subtle",
    value: green[50],
    primitive: "success.50",
    usage: "Success backgrounds and badges",
  },
  {
    token: "feedback.warning",
    value: warning[500],
    primitive: "warning.500",
    usage: "Warning messages and caution states",
  },
  {
    token: "feedback.warning.subtle",
    value: warning[50],
    primitive: "warning.50",
    usage: "Warning backgrounds and badges",
  },
  {
    token: "feedback.error",
    value: error[500],
    primitive: "error.500",
    usage: "Errors, destructive actions, and alerts",
  },
  {
    token: "feedback.error.subtle",
    value: error[50],
    primitive: "error.50",
    usage: "Error backgrounds and validation highlights",
  },
  {
    token: "feedback.info",
    value: info[500],
    primitive: "info.500",
    usage: "Informational messages and guidance",
  },
  {
    token: "feedback.info.subtle",
    value: info[50],
    primitive: "info.50",
    usage: "Info backgrounds and neutral callouts",
  },
] as const;

export const v0Meta = {
  name: "Design System",
  version: "0",
  page: "Color Foundations",
  description:
    "A foundational color architecture designed for a calm, luxurious, and emotionally comforting experience.",
} as const;
