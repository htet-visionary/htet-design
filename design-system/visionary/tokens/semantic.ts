/**
 * Semantic tokens — purpose-driven UI roles.
 * Source: docs/design.md
 */
import { color, literal, unwrapRefs, unwrapValues } from "./token-source";

const semanticSource = {
  background: {
    default: color("neutral", 50),
    subtle: color("neutral", 100),
  },
  surface: {
    primary: color("neutral", 0),
    secondary: color("neutral", 50),
    elevated: color("neutral", 0),
  },
  text: {
    primary: color("neutral", 800),
    secondary: color("neutral", 600),
    muted: color("neutral", 500),
    inverse: color("neutral", 0),
    onSolid: color("neutral", 0),
  },
  brand: {
    default: color("green", 500),
    accent: color("lavender", 500),
    subtle: color("green", 50),
  },
  border: {
    subtle: color("neutral", 200),
    strong: color("neutral", 300),
    brand: color("green", 200),
    accent: color("lavender", 200),
  },
  action: {
    primary: color("green", 500),
    primaryHover: color("green", 600),
    primaryActive: color("green", 700),
    accent: color("lavender", 500),
    accentHover: color("lavender", 600),
    accentActive: color("lavender", 700),
    destructive: color("error", 600),
    destructiveHover: color("error", 700),
    destructiveActive: color("error", 800),
  },
  link: {
    default: color("green", 600),
    hover: color("green", 700),
    visited: color("lavender", 700),
  },
  focus: {
    ring: color("green", 500),
    ringOffset: color("neutral", 0),
  },
  disabled: {
    background: color("neutral", 100),
    surface: color("neutral", 100),
    border: color("neutral", 200),
    text: color("neutral", 400),
    icon: color("neutral", 400),
  },
  overlay: {
    scrim: literal("rgba(36, 31, 27, 0.48)"),
    scrimLight: literal("rgba(36, 31, 27, 0.24)"),
  },
  status: {
    success: {
      background: color("success", 50),
      surface: color("success", 100),
      border: color("success", 200),
      text: color("success", 800),
      icon: color("success", 600),
      solid: color("success", 600),
      solidHover: color("success", 700),
      onSolid: color("neutral", 0),
    },
    warning: {
      background: color("warning", 50),
      surface: color("warning", 100),
      border: color("warning", 200),
      text: color("warning", 800),
      icon: color("warning", 600),
      solid: color("warning", 600),
      solidHover: color("warning", 700),
      onSolid: color("neutral", 0),
    },
    error: {
      background: color("error", 50),
      surface: color("error", 100),
      border: color("error", 200),
      text: color("error", 800),
      icon: color("error", 600),
      solid: color("error", 600),
      solidHover: color("error", 700),
      onSolid: color("neutral", 0),
    },
    info: {
      background: color("info", 50),
      surface: color("info", 100),
      border: color("info", 200),
      text: color("info", 800),
      icon: color("info", 600),
      solid: color("info", 600),
      solidHover: color("info", 700),
      onSolid: color("neutral", 0),
    },
  },
} as const;

export const semantic = unwrapValues(semanticSource);
export const semanticRefs = unwrapRefs(semanticSource);

export type SemanticTokens = typeof semantic;
