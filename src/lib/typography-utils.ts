import type { CSSProperties } from "react";
import { fonts, typography } from "@design-system/visionary";

type TypographyStyle = (typeof typography)[keyof typeof typography];
type FontRole = TypographyStyle["font"];

export function typographyTokenKey(name: string): string {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export function typographyCssVar(name: string): string {
  return `--v-type-${typographyTokenKey(name)}`;
}

export function fontRoleCssVar(role: FontRole): string {
  return `--v-font-${role}`;
}

export function typographyStyle(name: string, style: TypographyStyle): CSSProperties {
  const family = fonts[style.font].family;
  const fallback = fonts[style.font].fallback;

  return {
    fontFamily: `"${family}", ${fallback}`,
    fontSize: `${style.size}px`,
    fontWeight: style.weight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };
}

export const typographyEntries = Object.entries(typography) as [
  keyof typeof typography,
  TypographyStyle,
][];
