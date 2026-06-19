import type { ReactNode } from "react";
import {
  flattenObject,
  RuleList,
  SectionBlock,
  SwatchGrid,
  TokenTable,
} from "@/components/visionary/DocParts";
import { primitive, semantic } from "@design-system/visionary";

const functionalPalettes = ["success", "warning", "error", "info"] as const;

function rampToSwatches(prefix: string, ramp: Record<string | number, string>) {
  return Object.entries(ramp).map(([step, hex]) => ({
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
      <p className="v-layer-diagram">Primitive → Semantic → Functional → Product UI</p>
      <RuleList
        rules={[
          "Product UI consumes semantic and component tokens — not primitives.",
          "Brand colors are not status colors unless mapped through semantic tokens.",
          "Functional palettes are for status feedback only.",
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
    <SectionBlock title="Primitive" id="primitive">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Brand and neutral ramps. Raw values — not for direct use in product UI.
      </p>
      <Subsection title="Green">
        <SwatchGrid swatches={rampToSwatches("green", primitive.green)} />
      </Subsection>
      <Subsection title="Lavender">
        <SwatchGrid swatches={rampToSwatches("lavender", primitive.lavender)} />
      </Subsection>
      <Subsection title="Iridescence">
        <SwatchGrid
          swatches={rampToSwatches("iridescence", primitive.iridescence)}
        />
      </Subsection>
      <Subsection title="Neutral">
        <SwatchGrid swatches={rampToSwatches("neutral", primitive.neutral)} />
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
    <SectionBlock title="Semantic" id="semantic">
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
    <SectionBlock title="Functional" id="functional">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Status palettes for success, warning, error, and info feedback.
      </p>
      <Subsection title="Success">
        <SwatchGrid swatches={rampToSwatches("success", primitive.success)} />
      </Subsection>
      <Subsection title="Warning">
        <SwatchGrid swatches={rampToSwatches("warning", primitive.warning)} />
      </Subsection>
      <Subsection title="Error">
        <SwatchGrid swatches={rampToSwatches("error", primitive.error)} />
      </Subsection>
      <Subsection title="Info">
        <SwatchGrid swatches={rampToSwatches("info", primitive.info)} />
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
