/**
 * Color foundations from the Lucky Charm brand design.
 * Anchored to the palette defined in lucky-charm-website_v1.html.
 */

export const brand = {
  softGreen: "#B7CDB1",
  mistyGrey: "#BDBDBD",
  whiteRabbit: "#F7F7F7",
  staticePurple: "#8E6FAE",
  cream: "#FFFFFF",
  deepGreen: "#5B7A55",
  lightLavender: "#D4C5E2",
  softLavender: "#BBA9D4",
  golden: "#D4A853",
  textDark: "#3D3530",
  textMuted: "#7A7068",
} as const;

export const palette = {
  softGreen: {
    50: "#F4F8F3",
    100: "#E4EDE1",
    200: "#D0DFCB",
    300: "#B7CDB1",
    400: "#9DB896",
    500: "#7FA378",
    600: "#5B7A55",
    700: "#456040",
    800: "#324830",
    900: "#1F2E1D",
  },
  mistyGrey: {
    50: "#F7F7F7",
    100: "#EDEDED",
    200: "#D8D8D8",
    300: "#BDBDBD",
    400: "#A3A3A3",
    500: "#8A8A8A",
    600: "#707070",
    700: "#575757",
    800: "#3D3D3D",
    900: "#262626",
  },
  whiteRabbit: {
    50: "#FFFFFF",
    100: "#F7F7F7",
    200: "#F0F0F0",
    300: "#E8E8E8",
    400: "#DDDDDD",
    500: "#C9C9C9",
  },
  staticePurple: {
    50: "#F5F0F9",
    100: "#E8DFF2",
    200: "#D4C5E2",
    300: "#BBA9D4",
    400: "#A08BBE",
    500: "#8E6FAE",
    600: "#735A8F",
    700: "#58466E",
    800: "#3D324D",
    900: "#241F2C",
  },
  goldenIridescence: {
    gold: "#FFD700",
    rose: "#FF9999",
    sky: "#99DDFF",
    mint: "#AAFFAA",
    amber: "#D4A853",
  },
} as const;

export const gradients = {
  goldenIridescence:
    "linear-gradient(135deg, #FFD700 0%, #FF9999 35%, #99DDFF 70%, #AAFFAA 100%)",
  iridescentFooter:
    "linear-gradient(135deg, #fde8f0 0%, #e8dff7 20%, #d4eef7 40%, #d4f0e8 60%, #f7f0d4 80%, #fde8f0 100%)",
  iridescentBar:
    "linear-gradient(90deg, #ffb3c6, #c3b1e1, #b5ead7, #c7e9ff, #ffd6a5, #ffb3c6)",
  softGlow:
    "linear-gradient(180deg, rgba(183, 205, 177, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
  cardAccent:
    "linear-gradient(90deg, #B7CDB1, #8E6FAE, #D4A853, #B7CDB1)",
  stickerSection:
    "linear-gradient(135deg, rgba(183,205,177,0.15) 0%, rgba(212,197,226,0.15) 100%)",
} as const;

export type ColorScale = keyof typeof palette.softGreen;
export type PaletteName = keyof typeof palette;
export type BrandColor = keyof typeof brand;
