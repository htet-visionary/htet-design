/**
 * Component tokens — map semantic roles to component parts.
 * Source: docs/design.md Component Foundations
 */
import { semantic } from "./semantic";

export const component = {
  button: {
    primary: {
      background: semantic.action.primary,
      backgroundHover: semantic.action.primaryHover,
      backgroundActive: semantic.action.primaryActive,
      text: semantic.text.onSolid,
      border: "transparent",
    },
    secondary: {
      background: "transparent",
      backgroundHover: semantic.background.subtle,
      text: semantic.action.accent,
      border: semantic.border.accent,
    },
    destructive: {
      background: semantic.action.destructive,
      backgroundHover: semantic.action.destructiveHover,
      text: semantic.text.onSolid,
      border: "transparent",
    },
    disabled: {
      background: semantic.disabled.background,
      text: semantic.disabled.text,
      border: semantic.disabled.border,
    },
    shared: {
      radius: "radius.md",
      paddingX: "spacing.4",
      paddingY: "spacing.3",
      font: "label",
      minHeight: "touch-target.minimum",
    },
  },
  input: {
    background: semantic.surface.primary,
    backgroundDisabled: semantic.disabled.background,
    text: semantic.text.primary,
    placeholder: semantic.text.muted,
    border: semantic.border.subtle,
    borderHover: semantic.border.strong,
    borderFocus: semantic.focus.ring,
    borderError: semantic.status.error.border,
    label: semantic.text.secondary,
    helper: semantic.text.muted,
    errorText: semantic.status.error.text,
    radius: "radius.sm",
    paddingX: "spacing.3",
    paddingY: "spacing.3",
    font: "body",
    minHeight: "touch-target.minimum",
  },
  card: {
    background: semantic.surface.primary,
    backgroundSubtle: semantic.surface.secondary,
    border: semantic.border.subtle,
    text: semantic.text.primary,
    textSecondary: semantic.text.secondary,
    radius: "radius.lg",
    padding: "spacing.6",
    elevation: "elevation.card",
  },
  alert: {
    success: {
      background: semantic.status.success.background,
      border: semantic.status.success.border,
      text: semantic.status.success.text,
      icon: semantic.status.success.icon,
    },
    warning: {
      background: semantic.status.warning.background,
      border: semantic.status.warning.border,
      text: semantic.status.warning.text,
      icon: semantic.status.warning.icon,
    },
    error: {
      background: semantic.status.error.background,
      border: semantic.status.error.border,
      text: semantic.status.error.text,
      icon: semantic.status.error.icon,
    },
    info: {
      background: semantic.status.info.background,
      border: semantic.status.info.border,
      text: semantic.status.info.text,
      icon: semantic.status.info.icon,
    },
    shared: {
      radius: "radius.md",
      padding: "spacing.4",
      font: "body",
    },
  },
  modal: {
    background: semantic.surface.primary,
    border: semantic.border.subtle,
    text: semantic.text.primary,
    scrim: semantic.overlay.scrim,
    radius: "radius.lg",
    padding: "spacing.6",
    elevation: "elevation.modal",
    zIndex: "elevation.modal.z-index",
    maxWidth: "content.narrow",
  },
} as const;

export type ComponentTokens = typeof component;
