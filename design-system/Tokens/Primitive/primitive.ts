import { palette, gradients, brand } from "../../Foundations/Colors";
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from "../../Foundations/Typography";
import { spacing } from "../../Foundations/Spacing";
import { radius } from "../../Foundations/Radius";
import { elevation } from "../../Foundations/Elevation";

/**
 * Primitive tokens — raw design values mapped 1:1 from foundations.
 */
export const primitive = {
  brand,
  color: {
    softGreen: palette.softGreen,
    mistyGrey: palette.mistyGrey,
    whiteRabbit: palette.whiteRabbit,
    staticePurple: palette.staticePurple,
    goldenIridescence: palette.goldenIridescence,
  },
  gradient: gradients,
  font: {
    family: fontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
    letterSpacing,
  },
  spacing,
  radius,
  elevation,
} as const;

export type PrimitiveTokens = typeof primitive;
