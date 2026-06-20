/**
 * Component tokens — map semantic roles to component parts.
 * Source: docs/design.md Component Foundations
 */
import { semantic } from "./semantic";
import { literal, semanticRef, unwrapRefs, unwrapValues } from "./token-source";

const componentSource = {
  button: {
    primary: {
      background: semanticRef("action.primary", semantic.action.primary),
      backgroundHover: semanticRef("action.primaryHover", semantic.action.primaryHover),
      backgroundActive: semanticRef("action.primaryActive", semantic.action.primaryActive),
      text: semanticRef("text.onSolid", semantic.text.onSolid),
      border: literal("transparent"),
    },
    secondary: {
      background: literal("transparent"),
      backgroundHover: semanticRef("background.subtle", semantic.background.subtle),
      text: semanticRef("action.accent", semantic.action.accent),
      border: semanticRef("border.accent", semantic.border.accent),
    },
    destructive: {
      background: semanticRef("action.destructive", semantic.action.destructive),
      backgroundHover: semanticRef("action.destructiveHover", semantic.action.destructiveHover),
      text: semanticRef("text.onSolid", semantic.text.onSolid),
      border: literal("transparent"),
    },
    disabled: {
      background: semanticRef("disabled.background", semantic.disabled.background),
      text: semanticRef("disabled.text", semantic.disabled.text),
      border: semanticRef("disabled.border", semantic.disabled.border),
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
    background: semanticRef("surface.primary", semantic.surface.primary),
    backgroundDisabled: semanticRef("disabled.background", semantic.disabled.background),
    text: semanticRef("text.primary", semantic.text.primary),
    placeholder: semanticRef("text.muted", semantic.text.muted),
    border: semanticRef("border.subtle", semantic.border.subtle),
    borderHover: semanticRef("border.strong", semantic.border.strong),
    borderFocus: semanticRef("focus.ring", semantic.focus.ring),
    borderError: semanticRef("status.error.border", semantic.status.error.border),
    label: semanticRef("text.secondary", semantic.text.secondary),
    helper: semanticRef("text.muted", semantic.text.muted),
    errorText: semanticRef("status.error.text", semantic.status.error.text),
    radius: "radius.sm",
    paddingX: "spacing.3",
    paddingY: "spacing.3",
    font: "body",
    minHeight: "touch-target.minimum",
  },
  card: {
    background: semanticRef("surface.primary", semantic.surface.primary),
    backgroundSubtle: semanticRef("surface.secondary", semantic.surface.secondary),
    border: semanticRef("border.subtle", semantic.border.subtle),
    text: semanticRef("text.primary", semantic.text.primary),
    textSecondary: semanticRef("text.secondary", semantic.text.secondary),
    radius: "radius.lg",
    padding: "spacing.6",
    elevation: "elevation.card",
  },
  alert: {
    success: {
      background: semanticRef("status.success.background", semantic.status.success.background),
      border: semanticRef("status.success.border", semantic.status.success.border),
      text: semanticRef("status.success.text", semantic.status.success.text),
      icon: semanticRef("status.success.icon", semantic.status.success.icon),
    },
    warning: {
      background: semanticRef("status.warning.background", semantic.status.warning.background),
      border: semanticRef("status.warning.border", semantic.status.warning.border),
      text: semanticRef("status.warning.text", semantic.status.warning.text),
      icon: semanticRef("status.warning.icon", semantic.status.warning.icon),
    },
    error: {
      background: semanticRef("status.error.background", semantic.status.error.background),
      border: semanticRef("status.error.border", semantic.status.error.border),
      text: semanticRef("status.error.text", semantic.status.error.text),
      icon: semanticRef("status.error.icon", semantic.status.error.icon),
    },
    info: {
      background: semanticRef("status.info.background", semantic.status.info.background),
      border: semanticRef("status.info.border", semantic.status.info.border),
      text: semanticRef("status.info.text", semantic.status.info.text),
      icon: semanticRef("status.info.icon", semantic.status.info.icon),
    },
    shared: {
      radius: "radius.md",
      padding: "spacing.4",
      font: "body",
    },
  },
  modal: {
    background: semanticRef("surface.primary", semantic.surface.primary),
    border: semanticRef("border.subtle", semantic.border.subtle),
    text: semanticRef("text.primary", semantic.text.primary),
    scrim: semanticRef("overlay.scrim", semantic.overlay.scrim),
    radius: "radius.lg",
    padding: "spacing.6",
    elevation: "elevation.modal",
    zIndex: "elevation.modal.z-index",
    maxWidth: "content.narrow",
  },
} as const;

export const component = unwrapValues(componentSource);
export const componentRefs = unwrapRefs(componentSource);

export type ComponentTokens = typeof component;
