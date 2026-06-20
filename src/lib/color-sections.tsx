import { slugify } from "@/lib/slugify";
import type { ReactNode } from "react";
import {
  ColorRamp,
  RuleList,
  SectionBlock,
} from "@/components/visionary/DocParts";
import { SemanticTokenTable } from "@/components/visionary/SemanticTokenTable";
import { primitive, semantic } from "@design-system/visionary";

function rampToSteps(ramp: Record<string | number, string>) {
  return Object.entries(ramp).map(([step, hex]) => ({ step, hex }));
}

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  const subsectionId = slugify(title);

  return (
    <div className="v-subsection">
      <h3 id={subsectionId} className="v-subsection__title v-subsection--anchor">
        {title}
      </h3>
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
  return (
    <SectionBlock title="Primitive" id="primitive">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Brand and neutral ramps. Raw values — not for direct use in product UI.
      </p>
      <Subsection title="Green">
        <ColorRamp steps={rampToSteps(primitive.green)} />
      </Subsection>
      <Subsection title="Lavender">
        <ColorRamp steps={rampToSteps(primitive.lavender)} />
      </Subsection>
      <Subsection title="Iridescence">
        <div
          className="v-swatch-gradient v-swatch-gradient--iridescence"
          aria-hidden
        />
        <ColorRamp steps={rampToSteps(primitive.iridescence)} />
      </Subsection>
      <Subsection title="Neutral">
        <ColorRamp steps={rampToSteps(primitive.neutral)} />
      </Subsection>
    </SectionBlock>
  );
}

export function SemanticSection() {
  return (
    <SectionBlock title="Semantic" id="semantic">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Purpose-driven UI roles shared across all Visionary products.
      </p>
      <Subsection title="Roles">
        <SemanticTokenTable tokens={semantic as unknown as Record<string, unknown>} />
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
  return (
    <SectionBlock title="Functional" id="functional">
      <p className="v-doc__desc" style={{ marginBottom: 0 }}>
        Status palettes for success, warning, error, and info feedback.
      </p>
      <Subsection title="Success">
        <ColorRamp steps={rampToSteps(primitive.success)} />
      </Subsection>
      <Subsection title="Warning">
        <ColorRamp steps={rampToSteps(primitive.warning)} />
      </Subsection>
      <Subsection title="Error">
        <ColorRamp steps={rampToSteps(primitive.error)} />
      </Subsection>
      <Subsection title="Info">
        <ColorRamp steps={rampToSteps(primitive.info)} />
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
    </SectionBlock>
  );
}
