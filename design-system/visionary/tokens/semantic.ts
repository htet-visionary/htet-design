/**
 * Semantic tokens — purpose-driven UI roles.
 * Source: docs/design.md
 */
import {
  green,
  lavender,
  neutral,
  success,
  warning,
  error,
  info,
} from "./primitive";

export const semantic = {
  background: {
    default: neutral[50],
    subtle: neutral[100],
  },
  surface: {
    primary: neutral[0],
    secondary: neutral[50],
    elevated: neutral[0],
  },
  text: {
    primary: neutral[800],
    secondary: neutral[600],
    muted: neutral[500],
    inverse: neutral[0],
    onSolid: neutral[0],
  },
  brand: {
    default: green[500],
    accent: lavender[500],
  },
  border: {
    subtle: neutral[200],
    strong: neutral[300],
    brand: green[200],
    accent: lavender[200],
  },
  action: {
    primary: green[500],
    primaryHover: green[600],
    primaryActive: green[700],
    accent: lavender[500],
    accentHover: lavender[600],
    accentActive: lavender[700],
    destructive: error[600],
    destructiveHover: error[700],
    destructiveActive: error[800],
  },
  link: {
    default: green[600],
    hover: green[700],
    visited: lavender[700],
  },
  focus: {
    ring: green[500],
    ringOffset: neutral[0],
  },
  disabled: {
    background: neutral[100],
    surface: neutral[100],
    border: neutral[200],
    text: neutral[400],
    icon: neutral[400],
  },
  overlay: {
    scrim: "rgba(36, 31, 27, 0.48)",
    scrimLight: "rgba(36, 31, 27, 0.24)",
  },
  status: {
    success: {
      background: success[50],
      surface: success[100],
      border: success[200],
      text: success[800],
      icon: success[600],
      solid: success[600],
      solidHover: success[700],
      onSolid: neutral[0],
    },
    warning: {
      background: warning[50],
      surface: warning[100],
      border: warning[200],
      text: warning[800],
      icon: warning[600],
      solid: warning[600],
      solidHover: warning[700],
      onSolid: neutral[0],
    },
    error: {
      background: error[50],
      surface: error[100],
      border: error[200],
      text: error[800],
      icon: error[600],
      solid: error[600],
      solidHover: error[700],
      onSolid: neutral[0],
    },
    info: {
      background: info[50],
      surface: info[100],
      border: info[200],
      text: info[800],
      icon: info[600],
      solid: info[600],
      solidHover: info[700],
      onSolid: neutral[0],
    },
  },
} as const;

export type SemanticTokens = typeof semantic;
