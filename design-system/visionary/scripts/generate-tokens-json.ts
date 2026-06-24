/**
 * Generates design-system/visionary/tokens.json for Tokens Studio / Figma sync.
 * Website CSS remains design-system/visionary/styles/visionary.css (not generated here).
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { foundations } from "../foundations";
import { primitive } from "../tokens/primitive";
import { semanticRefs } from "../tokens/semantic";
import { componentRefs } from "../tokens/component";
import { dreamFundTheme, luckyCharmTheme } from "../tokens/themes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "tokens.json");

const PRIMITIVE_PALETTES = new Set(Object.keys(primitive));
const TRANSPARENT_COLOR = "#00000000";

type TokenLeaf = { value: string; type: string; description?: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

function color(value: string, description?: string): TokenLeaf {
  return { value: normalizeColorLiteral(value), type: "color", ...(description ? { description } : {}) };
}

function dimension(px: number, description?: string): TokenLeaf {
  return { value: `${px}px`, type: "dimension", ...(description ? { description } : {}) };
}

function number(value: number, description?: string): TokenLeaf {
  return { value: String(value), type: "number", ...(description ? { description } : {}) };
}

function text(value: string, type = "other", description?: string): TokenLeaf {
  return { value, type, ...(description ? { description } : {}) };
}

function shadow(value: string, description?: string): TokenLeaf {
  return { value, type: "boxShadow", ...(description ? { description } : {}) };
}

function fontFamily(value: string, description?: string): TokenLeaf {
  return { value, type: "fontFamilies", ...(description ? { description } : {}) };
}

function normalizeSemanticRef(ref: string): string {
  return ref.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function camelToKebab(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function rgbaToHex8(value: string): string {
  const match = value.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
  if (!match) {
    return value;
  }

  const [, r, g, b, a] = match;
  const alpha = Math.round(Number(a) * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();

  const toHex = (channel: string) => Number(channel).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
}

function normalizeColorLiteral(value: string): string {
  if (value === "transparent") {
    return TRANSPARENT_COLOR;
  }

  if (value.startsWith("rgba(")) {
    return rgbaToHex8(value);
  }

  if (value.startsWith("#")) {
    return value.toUpperCase();
  }

  return value;
}

function buildRefMap(tree: unknown, prefix = ""): Map<string, string> {
  const map = new Map<string, string>();

  for (const [key, value] of Object.entries(tree as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      map.set(path, value);
      continue;
    }

    for (const [childPath, childValue] of buildRefMap(value, path)) {
      map.set(childPath, childValue);
    }
  }

  return map;
}

const semanticRefMap = buildRefMap(semanticRefs);

function primitiveStepRef(palette: string, step: string): string {
  const tokenStep = step === "0" ? "base" : step;
  return `primitive.${palette}.${tokenStep}`;
}

function resolvePrimitivePath(ref: string): string | null {
  if (ref.startsWith("rgba(") || ref === "transparent") {
    return null;
  }

  let current = ref;
  const visited = new Set<string>();

  while (!PRIMITIVE_PALETTES.has(current.split(".")[0])) {
    if (visited.has(current)) {
      return null;
    }

    visited.add(current);
    const next = semanticRefMap.get(current);
    if (!next) {
      return null;
    }

    current = next;
  }

  const [palette, step] = current.split(".");
  if (!palette || !step) {
    return null;
  }

  return primitiveStepRef(palette, step);
}

function colorAlias(ref: string): TokenLeaf {
  const literal = normalizeColorLiteral(ref);
  if (literal.startsWith("#")) {
    return color(literal);
  }

  const primitivePath = resolvePrimitivePath(ref);
  if (primitivePath) {
    return { value: `{${primitivePath}}`, type: "color" };
  }

  const directSemantic = semanticRefMap.get(ref);
  if (directSemantic) {
    const semanticLiteral = normalizeColorLiteral(directSemantic);
    if (semanticLiteral.startsWith("#")) {
      return color(semanticLiteral);
    }
  }

  return { value: `{semantic.${normalizeSemanticRef(ref)}}`, type: "color" };
}

function resolveRef(ref: string): string {
  if (ref.startsWith("rgba(") || ref === "transparent") {
    return normalizeColorLiteral(ref);
  }

  const primitivePath = resolvePrimitivePath(ref);
  if (primitivePath) {
    return primitivePath;
  }

  const [head] = ref.split(".");
  if (PRIMITIVE_PALETTES.has(head)) {
    const [palette, step] = ref.split(".");
    return primitiveStepRef(palette, step);
  }

  if (ref.startsWith("touch-target.")) {
    return `foundations.${ref.replace("touch-target", "touchTarget")}`;
  }

  if (ref.includes(".z-index")) {
    return `foundations.${ref.replace(".z-index", ".zIndex")}`;
  }

  if (ref.startsWith("elevation.")) {
    const parts = ref.split(".");
    const layer = parts[1];
    const prop = parts[2];

    if (!prop) {
      return `foundations.elevation.${layer}.shadow`;
    }

    if (prop === "z-index") {
      return `foundations.elevation.${layer}.zIndex`;
    }

    return `foundations.elevation.${layer}.${prop}`;
  }

  const foundationRoots = new Set([
    "spacing",
    "radius",
    "elevation",
    "motion",
    "touchTarget",
    "content",
    "container",
    "breakpoint",
    "grid",
    "font",
    "typographyScale",
    "reading",
    "icon",
    "focusRing",
  ]);

  if (foundationRoots.has(head)) {
    return `foundations.${ref}`;
  }

  const typographyStyles = new Set(Object.keys(foundations.typography).map(camelToKebab));
  if (typographyStyles.has(ref) || Object.keys(foundations.typography).includes(ref)) {
    const key = Object.keys(foundations.typography).includes(ref) ? camelToKebab(ref) : ref;
    return `foundations.typographyScale.${key}`;
  }

  return `semantic.${normalizeSemanticRef(ref)}`;
}

function refToken(ref: string, type = "color"): TokenLeaf {
  if (type === "color") {
    return colorAlias(ref);
  }

  if (ref.startsWith("rgba(") || ref === "transparent") {
    return text(normalizeColorLiteral(ref), type);
  }

  return { value: `{${resolveRef(ref)}}`, type };
}

function mapPrimitive(): TokenTree {
  const tree: TokenTree = {};

  for (const [palette, steps] of Object.entries(primitive)) {
    tree[palette] = {};

    for (const [step, hex] of Object.entries(steps)) {
      (tree[palette] as TokenTree)[step] = color(hex);

      if (step === "0") {
        (tree[palette] as TokenTree).base = color(hex, "Alias for step 0 — Figma-safe reference");
      }
    }
  }

  return tree;
}

function mapSemanticRefs(tree: unknown): TokenTree {
  const out: TokenTree = {};

  for (const [key, value] of Object.entries(tree as Record<string, unknown>)) {
    if (typeof value === "string") {
      out[key] = colorAlias(value);
      continue;
    }

    out[key] = mapSemanticRefs(value);
  }

  return out;
}

function mapComponentRefs(tree: unknown): TokenTree {
  const out: TokenTree = {};

  for (const [key, value] of Object.entries(tree as Record<string, unknown>)) {
    if (typeof value === "string") {
      out[key] = refToken(value, inferComponentType(value));
      continue;
    }

    out[key] = mapComponentRefs(value);
  }

  return out;
}

function inferComponentType(ref: string): string {
  if (ref.startsWith("rgba(") || ref === "transparent") {
    return "color";
  }

  if (ref.includes("elevation") || ref.includes("shadow")) {
    return "boxShadow";
  }

  if (
    ref.startsWith("spacing.") ||
    ref.startsWith("touch-target.") ||
    ref.startsWith("touchTarget.") ||
    ref.startsWith("content.") ||
    ref.startsWith("container.") ||
    ref.includes("padding") ||
    ref.includes("minHeight") ||
    ref.includes("maxWidth")
  ) {
    return "dimension";
  }

  if (ref.startsWith("radius.")) {
    return "borderRadius";
  }

  if (ref.includes("z-index") || ref.includes("zIndex")) {
    return "number";
  }

  if (
    ["label", "body", "caption", "hero", "headingXl", "headingLg", "headingMd", "headingSm", "bodyLg"].includes(
      ref,
    )
  ) {
    return "typography";
  }

  return "color";
}

function mapFoundations(): TokenTree {
  const {
    spacing,
    radius,
    fonts,
    typography,
    reading,
    icons,
    elevation,
    motion,
    touchTarget,
    focusRing,
    breakpoints,
    container,
    content,
    grid,
  } = foundations;

  const typographyScale: TokenTree = {};
  for (const [name, style] of Object.entries(typography)) {
    typographyScale[camelToKebab(name)] = {
      size: dimension(style.size),
      weight: number(style.weight),
      lineHeight: text(String(style.lineHeight), "lineHeights"),
      letterSpacing: text(style.letterSpacing, "letterSpacing"),
      font: text(`{foundations.font.${style.font}.stack}`, "fontFamilies"),
    };
  }

  const fontTree: TokenTree = {};
  for (const [name, font] of Object.entries(fonts)) {
    fontTree[name] = {
      family: fontFamily(font.family),
      fallback: fontFamily(font.fallback),
      stack: fontFamily(`${font.family}, ${font.fallback}`),
    };
  }

  const iconSizes: TokenTree = {};
  for (const [name, size] of Object.entries(icons.size)) {
    iconSizes[name] = dimension(size);
  }

  const iconColors: TokenTree = {};
  for (const [name, ref] of Object.entries(icons.color)) {
    iconColors[name] = colorAlias(normalizeSemanticRef(ref));
  }

  const elevationTree: TokenTree = {};
  for (const [name, layer] of Object.entries(elevation)) {
    elevationTree[name] = {
      ...("shadow" in layer ? { shadow: shadow(layer.shadow) } : {}),
      zIndex: number(layer.zIndex),
    };
  }

  const spacingTree: TokenTree = {};
  for (const [name, size] of Object.entries(spacing)) {
    spacingTree[name] = dimension(size);
  }

  const radiusTree: TokenTree = {};
  for (const [name, size] of Object.entries(radius)) {
    radiusTree[name] = { ...dimension(size), type: "borderRadius" };
  }

  return {
    spacing: spacingTree,
    radius: radiusTree,
    font: fontTree,
    typographyScale,
    reading: {
      maxWidth: text(reading.maxWidth, "other", "Maximum comfortable reading measure"),
      optimalWidth: text(reading.optimalWidth, "other", "Optimal reading measure"),
    },
    icon: {
      library: text(icons.library, "other"),
      strokeWidth: number(icons.strokeWidth),
      size: iconSizes,
      gap: {
        inline: { value: "{foundations.spacing.2}", type: "dimension" },
      },
      color: iconColors,
    },
    elevation: elevationTree,
    motion: {
      duration: Object.fromEntries(
        Object.entries(motion.duration).map(([name, ms]) => [name, dimension(ms)]),
      ),
      easing: Object.fromEntries(
        Object.entries(motion.easing).map(([name, curve]) => [name, text(curve, "other")]),
      ),
    },
    touchTarget: {
      minimum: dimension(touchTarget.minimum),
      recommended: dimension(touchTarget.recommended),
      spacingBetween: { value: "{foundations.spacing.2}", type: "dimension" },
    },
    focusRing: {
      width: dimension(focusRing.width),
      style: text(focusRing.style, "other"),
      offset: dimension(focusRing.offset),
    },
    breakpoint: Object.fromEntries(
      Object.entries(breakpoints).map(([name, px]) => [name, dimension(px)]),
    ),
    container: Object.fromEntries(
      Object.entries(container).map(([name, value]) => [
        name,
        typeof value === "number" ? dimension(value) : text(value, "other"),
      ]),
    ),
    content: Object.fromEntries(
      Object.entries(content).map(([name, px]) => [name, dimension(px)]),
    ),
    grid: {
      columns: number(grid.columns),
      gutter: dimension(grid.gutter),
      gutterLg: dimension(grid.gutterLg),
      margin: dimension(grid.margin),
      marginLg: dimension(grid.marginLg),
    },
    shell: {
      sidebarViewport: text("20%", "other"),
      mainViewport: text("60%", "other"),
      contentMarginRight: text("20%", "other"),
    },
  };
}

function mapThemeOverrides(theme: typeof luckyCharmTheme | typeof dreamFundTheme): TokenTree {
  const { overrides } = theme;

  return {
    action: {
      accent: color(overrides.actionAccent ?? theme.accent),
      accentHover: color(overrides.actionAccentHover ?? theme.accent),
      accentActive: color(overrides.actionAccentActive ?? theme.accent),
    },
    border: {
      accent: color(overrides.brandAccent ?? theme.accent),
    },
    brand: {
      default: color(overrides.brandDefault ?? theme.primary),
      accent: color(overrides.brandAccent ?? theme.accent),
    },
  };
}

const TOKEN_SET_ORDER = [
  "primitive",
  "foundations",
  "semantic",
  "component",
  "theme/lucky-charm",
  "theme/dream-fund",
] as const;

const tokens = {
  primitive: mapPrimitive(),
  foundations: mapFoundations(),
  semantic: mapSemanticRefs(semanticRefs),
  component: mapComponentRefs(componentRefs),
  "theme/lucky-charm": mapThemeOverrides(luckyCharmTheme),
  "theme/dream-fund": mapThemeOverrides(dreamFundTheme),
  $themes: [
    {
      id: "default",
      name: "Default",
      selectedTokenSets: {
        primitive: "enabled",
        foundations: "enabled",
        semantic: "enabled",
        component: "enabled",
        "theme/lucky-charm": "disabled",
        "theme/dream-fund": "disabled",
      },
    },
    {
      id: "lucky-charm",
      name: "Lucky Charm",
      selectedTokenSets: {
        primitive: "enabled",
        foundations: "enabled",
        semantic: "enabled",
        component: "enabled",
        "theme/lucky-charm": "enabled",
        "theme/dream-fund": "disabled",
      },
    },
    {
      id: "dream-fund",
      name: "Dream Fund",
      selectedTokenSets: {
        primitive: "enabled",
        foundations: "enabled",
        semantic: "enabled",
        component: "enabled",
        "theme/lucky-charm": "disabled",
        "theme/dream-fund": "enabled",
      },
    },
  ],
  $metadata: {
    tokenSetOrder: [...TOKEN_SET_ORDER],
  },
};

writeFileSync(OUT_PATH, `${JSON.stringify(tokens, null, 2)}\n`, "utf8");
console.log(`Wrote ${OUT_PATH}`);
