/**
 * Product theme overrides — remap semantic slots only.
 * Source: docs/design.md Product Themes
 */
import { green, lavender, warning } from "../primitive";

export type ThemeOverrides = {
  actionAccent?: string;
  actionAccentHover?: string;
  actionAccentActive?: string;
  brandAccent?: string;
  brandDefault?: string;
  highlight?: string;
};

export const luckyCharmTheme = {
  id: "lucky-charm",
  name: "Lucky Charm",
  primary: green[500],
  accent: lavender[500],
  highlight: "iridescence",
  overrides: {
    actionAccent: lavender[500],
    actionAccentHover: lavender[600],
    actionAccentActive: lavender[700],
    brandAccent: lavender[500],
    brandDefault: green[500],
  },
} as const;

export const dreamFundTheme = {
  id: "dream-fund",
  name: "Dream Fund",
  primary: green[500],
  accent: warning[500],
  overrides: {
    actionAccent: warning[600],
    actionAccentHover: warning[700],
    actionAccentActive: warning[700],
    brandAccent: warning[500],
    brandDefault: green[500],
  },
} as const;

export const themes = {
  luckyCharm: luckyCharmTheme,
  dreamFund: dreamFundTheme,
} as const;

export type Themes = typeof themes;
