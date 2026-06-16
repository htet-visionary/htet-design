import { semantic } from "../Semantic/semantic";
import { radius } from "../../Foundations/Radius";
import { spacing } from "../../Foundations/Spacing";
import { elevation } from "../../Foundations/Elevation";
import { fontSize, fontWeight, letterSpacing } from "../../Foundations/Typography";

/**
 * Component tokens — specific values for each UI component.
 */
export const component = {
  button: {
    borderRadius: radius.full,
    paddingX: spacing[8],
    paddingY: spacing[3],
    fontSize: "0.82rem",
    fontWeight: fontWeight.medium,
    gap: spacing[2],
    letterSpacing: letterSpacing.widest,
    primary: {
      background: semantic.color.action.primary,
      backgroundHover: semantic.color.action.primaryHover,
      backgroundActive: semantic.color.action.primaryActive,
      text: semantic.color.text.inverse,
      shadow: elevation.sm,
      shadowHover: elevation.primaryHover,
    },
    secondary: {
      background: semantic.color.surface.default,
      backgroundHover: semantic.color.background.secondary,
      border: semantic.color.border.default,
      text: semantic.color.text.primary,
    },
    iridescent: {
      background: semantic.color.accent.iridescent,
      text: semantic.color.text.primary,
      shadow: elevation.iridescent,
    },
    ghost: {
      background: "transparent",
      backgroundHover: semantic.color.background.secondary,
      text: semantic.color.text.secondary,
    },
    link: {
      background: "transparent",
      text: semantic.color.action.primary,
      borderBottom: semantic.color.border.strong,
      textHover: semantic.color.action.secondary,
      borderHover: semantic.color.border.accent,
    },
  },
  input: {
    borderRadius: radius.lg,
    paddingX: spacing[4],
    paddingY: spacing[3],
    fontSize: fontSize.base,
    background: semantic.color.surface.default,
    border: semantic.color.border.default,
    borderFocus: semantic.color.border.focus,
    text: semantic.color.text.primary,
    placeholder: semantic.color.text.secondary,
    shadow: elevation.xs,
  },
  card: {
    borderRadius: radius.cardLg,
    padding: spacing[8],
    background: semantic.color.surface.default,
    border: semantic.color.border.default,
    shadow: elevation.sm,
    shadowHover: elevation.card,
    accentBar: semantic.color.accent.iridescent,
  },
  navigation: {
    height: spacing[12],
    paddingX: spacing[8],
    gap: spacing[10],
    background: "rgba(255, 255, 255, 0.92)",
    borderBottom: semantic.color.border.subtle,
    linkColor: semantic.color.text.secondary,
    linkColorHover: semantic.color.action.primary,
    linkColorActive: semantic.color.text.accent,
    activeIndicator: semantic.color.action.secondary,
    backdropBlur: "12px",
  },
  pill: {
    borderRadius: radius.full,
    paddingX: spacing[4],
    paddingY: spacing[2],
    fontSize: fontSize.sm,
  },
} as const;

export type ComponentTokens = typeof component;
