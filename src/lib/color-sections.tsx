import type { ReactNode } from "react";
import {
  flattenObject,
  LinkGrid,
  RuleList,
  SectionBlock,
  SwatchGrid,
  TokenTable,
} from "@/components/visionary/DocParts";
import { primitive, semantic } from "@design-system/visionary";

const functionalPalettes = ["success", "warning", "error", "info"] as const;

function rampToSwatches(name: string, prefix: string, ramp: Record<string | number, string>) {
  return Object.entries(ramp).map(([step, hex]) => ({
    name: `${name} ${step}`,
    cssVar: `--v-${prefix}-${step}`,
    hex,
    token: `${prefix}.${step}`,
  }));
}

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="v-subsection">
      <h3 className="v-subsection__title">{title}</h3>
      {children}
    </div>
  );
}

export function ColorsOverviewSection() {
  return (
    <SectionBlock title="Overview">
      <p className="v-layer-diagram">Primitive → Semantic → Functional → Theme → Product UI</p>
      <RuleList
        rules={[
          "Product UI consumes semantic and component tokens — not primitives.",
          "Brand colors are not status colors unless mapped through semantic tokens.",
          "Themes remap color slots on top of primitive, semantic, and functional layers.",
        ]}
      />
    </SectionBlock>
  );
}

export function ColorsHubLinks() {
  return (
    <SectionBlock title="Sections">
      <LinkGrid
        links={[
          {
            title: "Primitive",
            href: "/foundations/colors/primitive",
            description: "Brand and neutral ramps — raw values.",
          },
          {
            title: "Semantic",
            href: "/foundations/colors/semantic",
            description: "Purpose-driven UI roles.",
          },
          {
            title: "Functional",
            href: "/foundations/colors/functional",
            description: "Success, warning, error, and info palettes.",
          },
          {
            title: "Themes",
            href: "/foundations/colors/themes",
            description: "Product color personality and overrides.",
          },
        ]}
      />
    </SectionBlock>
  );
}

export function PrimitiveSection() {
  const brandRows = ["green", "lavender", "iridescence", "neutral"].flatMap(
    (palette) =>
      Object.entries(primitive[palette as keyof typeof primitive] as Record<string, string>).map(
        ([step, hex]) => ({
          token: `${palette}.${step}`,
          value: hex,
        }),
      ),
  );

  return (
    <SectionBlock title="Primitive">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Brand and neutral ramps. Raw values — not for direct use in product UI.
      </p>
      <Subsection title="Green">
        <SwatchGrid swatches={rampToSwatches("Green", "green", primitive.green)} />
      </Subsection>
      <Subsection title="Lavender">
        <SwatchGrid swatches={rampToSwatches("Lavender", "lavender", primitive.lavender)} />
      </Subsection>
      <Subsection title="Iridescence">
        <SwatchGrid
          swatches={rampToSwatches("Iridescence", "iridescence", primitive.iridescence)}
        />
      </Subsection>
      <Subsection title="Neutral">
        <SwatchGrid swatches={rampToSwatches("Neutral", "neutral", primitive.neutral)} />
      </Subsection>
      <Subsection title="Token table">
        <TokenTable rows={brandRows} />
      </Subsection>
    </SectionBlock>
  );
}

export function SemanticSection() {
  const semanticRows = flattenObject(semantic as unknown as Record<string, unknown>);

  return (
    <SectionBlock title="Semantic">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Purpose-driven UI roles shared across all Visionary products.
      </p>
      <Subsection title="Roles">
        <TokenTable rows={semanticRows} />
      </Subsection>
      <Subsection title="Usage rules">
        <RuleList
          rules={[
            "focus.* — all interactive focus states; do not invent per-component focus colors.",
            "disabled.* — use instead of opacity hacks.",
            "link.* — inline text links; action.* for button-like navigation.",
            "text.on-solid / status.*.on-solid — text on solid fills.",
            "action.destructive* — irreversible actions, not error status surfaces.",
            "overlay.scrim* — modal and drawer backdrops.",
          ]}
        />
      </Subsection>
    </SectionBlock>
  );
}

export function FunctionalSection() {
  const functionalRows = functionalPalettes.flatMap((palette) =>
    Object.entries(primitive[palette]).map(([step, hex]) => ({
      token: `${palette}.${step}`,
      value: hex,
    })),
  );

  return (
    <SectionBlock title="Functional">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Status palettes for success, warning, error, and info feedback.
      </p>
      <Subsection title="Success">
        <SwatchGrid swatches={rampToSwatches("Success", "success", primitive.success)} />
      </Subsection>
      <Subsection title="Warning">
        <SwatchGrid swatches={rampToSwatches("Warning", "warning", primitive.warning)} />
      </Subsection>
      <Subsection title="Error">
        <SwatchGrid swatches={rampToSwatches("Error", "error", primitive.error)} />
      </Subsection>
      <Subsection title="Info">
        <SwatchGrid swatches={rampToSwatches("Info", "info", primitive.info)} />
      </Subsection>
      <Subsection title="Meaning">
        <RuleList
          rules={[
            "Success — completed, saved, positive outcomes.",
            "Warning — attention required, upcoming issues.",
            "Error — failed actions, validation problems.",
            "Info — neutral guidance, educational messages.",
            "Do not use brand colors as status colors.",
          ]}
        />
      </Subsection>
      <Subsection title="Token table">
        <TokenTable rows={functionalRows} />
      </Subsection>
    </SectionBlock>
  );
}

export function ThemesSection() {
  return (
    <SectionBlock title="Themes">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Product themes are color layers built on primitive, semantic, and functional tokens.
      </p>
      <Subsection title="Layer flow">
        <p className="v-layer-diagram">
          Primitive → Semantic → Functional → Theme → Product UI
        </p>
      </Subsection>
      <Subsection title="Product themes">
        <LinkGrid
          links={[
            {
              title: "Lucky Charm",
              href: "/foundations/colors/themes/lucky-charm",
              description: "Lavender accent and iridescence highlights.",
            },
            {
              title: "Dream Fund",
              href: "/foundations/colors/themes/dream-fund",
              description: "Warning-toned accent with fixed status tokens.",
            },
          ]}
        />
      </Subsection>
      <Subsection title="Override scope">
        <RuleList
          rules={[
            "May override: brand.*, action.accent*, action.primary* (caution), decorative highlights.",
            "Must not override: status.*, disabled.*, focus.*, overlay.*, functional scales.",
            "Load one theme per product surface.",
            "Never wire theme accent into alert or validation slots.",
          ]}
        />
      </Subsection>
    </SectionBlock>
  );
}
