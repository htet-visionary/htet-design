/**
 * Primitive tokens — raw values only. Not for direct use in product UI.
 * Source: docs/design.md
 */

export const green = {
  50: "#F6F8F5",
  100: "#EAF0E7",
  200: "#D9E3D4",
  300: "#C3D2BC",
  400: "#92AA89",
  500: "#5C7B56",
  600: "#4A6345",
  700: "#3C5138",
  800: "#2E3F2B",
  900: "#1E2B1C",
} as const;

export const lavender = {
  50: "#F8F4FC",
  100: "#F0E9F8",
  200: "#E1D3F1",
  300: "#CCB6E5",
  400: "#AF8FD4",
  500: "#8E6FAD",
  600: "#775A97",
  700: "#61497C",
  800: "#4C3960",
  900: "#32253F",
} as const;

export const iridescence = {
  50: "#FDFCFB",
  100: "#F7F4FA",
  200: "#F0EBF7",
  300: "#E5DDF2",
  400: "#D8CDEA",
} as const;

export const neutral = {
  0: "#FFFFFF",
  50: "#FCFBF8",
  100: "#F7F5F2",
  200: "#ECEAE8",
  300: "#DDD8D4",
  400: "#B9B3AE",
  500: "#8A837C",
  600: "#7A7068",
  700: "#5B534D",
  800: "#3D3530",
  900: "#241F1B",
} as const;

export const success = {
  50: "#F6F8F5",
  100: "#E1E8DD",
  200: "#C7D6C1",
  300: "#A7BEA0",
  400: "#87A37D",
  500: "#66835D",
  600: "#58774F",
  700: "#48633F",
  800: "#334B30",
  900: "#152417",
} as const;

export const warning = {
  50: "#FCF8EF",
  100: "#F4EBCF",
  200: "#EBDCA6",
  300: "#DFC87A",
  400: "#D2B34E",
  500: "#C0A136",
  600: "#A88729",
  700: "#80631F",
  800: "#624714",
  900: "#3E2A0C",
} as const;

export const error = {
  50: "#FCF5F6",
  100: "#F4E1E3",
  200: "#E7C8CA",
  300: "#D8A5A8",
  400: "#C77D81",
  500: "#BF5B60",
  600: "#A9494D",
  700: "#853639",
  800: "#642426",
  900: "#3F1516",
} as const;

export const info = {
  50: "#F5F7F9",
  100: "#E4EDF3",
  200: "#CEDDE8",
  300: "#AEC4D6",
  400: "#8EAABE",
  500: "#7193AD",
  600: "#5E7F9D",
  700: "#4B6683",
  800: "#344D67",
  900: "#162631",
} as const;

export const primitive = {
  green,
  lavender,
  iridescence,
  neutral,
  success,
  warning,
  error,
  info,
} as const;

export type PrimitiveTokens = typeof primitive;
