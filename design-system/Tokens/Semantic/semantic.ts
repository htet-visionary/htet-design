import { palette, gradients, brand } from "../../Foundations/Colors";

/**
 * Semantic tokens — purpose-driven aliases aligned with Lucky Charm brand roles.
 */
export const semantic = {
  color: {
    background: {
      primary: brand.cream,
      secondary: brand.whiteRabbit,
      tertiary: palette.softGreen[50],
      inverse: brand.deepGreen,
    },
    surface: {
      default: brand.cream,
      raised: brand.whiteRabbit,
      sunken: palette.softGreen[50],
      overlay: "rgba(61, 53, 48, 0.4)",
    },
    text: {
      primary: brand.textDark,
      secondary: brand.textMuted,
      tertiary: palette.mistyGrey[500],
      inverse: brand.cream,
      accent: brand.staticePurple,
      link: brand.deepGreen,
    },
    border: {
      default: "rgba(183, 205, 177, 0.4)",
      subtle: "rgba(183, 205, 177, 0.3)",
      strong: "rgba(183, 205, 177, 0.6)",
      focus: brand.softGreen,
      accent: "rgba(142, 111, 174, 0.3)",
      dashed: "rgba(183, 205, 177, 0.4)",
    },
    action: {
      primary: brand.deepGreen,
      primaryHover: brand.staticePurple,
      primaryActive: palette.staticePurple[600],
      secondary: brand.staticePurple,
      secondaryHover: palette.staticePurple[600],
      secondaryActive: palette.staticePurple[700],
      disabled: palette.mistyGrey[200],
    },
    feedback: {
      success: brand.deepGreen,
      successSubtle: "rgba(183, 205, 177, 0.25)",
      warning: brand.golden,
      error: "#C47A7A",
      errorSubtle: "#F9EFEF",
      info: palette.goldenIridescence.sky,
    },
    accent: {
      iridescent: gradients.goldenIridescence,
      iridescentFooter: gradients.iridescentFooter,
      softGreen: brand.softGreen,
      staticePurple: brand.staticePurple,
      golden: brand.golden,
      lightLavender: brand.lightLavender,
    },
  },
} as const;

export type SemanticTokens = typeof semantic;
