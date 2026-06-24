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

type TokenLeaf = { value: string; type: string; description?: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

function color(value: string, description?: string): TokenLeaf {
  return { value: value.toUpperCase(), type: "color", ...(description ? { description } : {}) };
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

function resolveRef(ref: string): string {
  if (ref.startsWith("rgba(") || ref === "transparent") {
    return ref;
  }

  const [head] = ref.split(".");
  if (PRIMITIVE_PALETTES.has(head)) {
    return `primitive.${ref}`;
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

  if (foundationRoots.has(head)) {
    return `foundations.${ref}`;
  }

  const typographyStyles = new Set(Object.keys(foundations.typography).map(camelToKebab));
  if (typographyStyles.has(ref) || Object.keys(foundations.typography).includes(ref)) {
    const key = Object.keys(foundations.typography).includes(ref)
      ? camelToKebab(ref)
      : ref;
    return `foundations.typographyScale.${key}`;
  }

  return `semantic.${ref}`;
}

function refToken(ref: string, type = "color"): TokenLeaf {
  if (ref.startsWith("rgba(") || ref === "transparent") {
    return text(ref, type);
  }

  return { value: `{${resolveRef(ref)}}`, type };
}

function mapPrimitive(): TokenTree {
  const tree: TokenTree = {};

  for (const [palette, steps] of Object.entries(primitive)) {
    tree[palette] = {};
    for (const [step, hex] of Object.entries(steps)) {
      (tree[palette] as TokenTree)[step] = color(hex);
    }
  }

  return tree;
}

function mapSemanticRefs(tree: unknown, prefix = ""): TokenTree {
  const out: TokenTree = {};

  for (const [key, value] of Object.entries(tree as Record<string, unknown>)) {
    if (typeof value === "string") {
      out[key] = refToken(value);
      continue;
    }

    out[key] = mapSemanticRefs(value, prefix ? `${prefix}.${key}` : key);
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

  if (ref.startsWith("spacing.") || ref.includes("padding") || ref.includes("minHeight") || ref.includes("maxWidth")) {
    return "dimension";
  }

  if (ref.startsWith("radius.")) {
    return "borderRadius";
  }

  if (ref.includes("z-index") || ref.includes("zIndex")) {
    return "number";
  }

  if (["label", "body", "caption", "hero", "headingXl", "headingLg", "headingMd", "headingSm", "bodyLg"].includes(ref)) {
    return "typography";
  }

  return "color";
}

function mapFoundations(): TokenTree {
  const { spacing, radius, fonts, typography, reading, icons, elevation, motion, touchTarget, focusRing, breakpoints, container, content, grid } =
    foundations;

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
    iconColors[name] = refToken(normalizeSemanticRef(ref));
  }

  const elevationTree: TokenTree = {};
  for (const [name, layer] of Object.entries(elevation)) {
    elevationTree[name] = {
      ...( "shadow" in layer ? { shadow: shadow(layer.shadow) } : {}),
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
        primitive: "source",
        foundations: "source",
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
        primitive: "source",
        foundations: "source",
        semantic: "source",
        component: "source",
        "theme/lucky-charm": "enabled",
        "theme/dream-fund": "disabled",
      },
    },
    {
      id: "dream-fund",
      name: "Dream Fund",
      selectedTokenSets: {
        primitive: "source",
        foundations: "source",
        semantic: "source",
        component: "source",
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
