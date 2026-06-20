import { slugify } from "@/lib/slugify";
import type { ReactNode } from "react";
import {
  ColorRamp,
  RuleList,
  SectionBlock,
} from "@/components/visionary/DocParts";
import { ComponentTokenTable } from "@/components/visionary/ComponentTokenTable";
import { SemanticTokenTable } from "@/components/visionary/SemanticTokenTable";
import { component, primitive, semantic } from "@design-system/visionary";

function rampToSteps(ramp: Record<string | number, string>) {
  return Object.entries(ramp).map(([step, hex]) => ({ step, hex }));
}

function Subsection({
  title,
  children,
  nested,
}: {
  title: string;
  children: ReactNode;
  nested?: boolean;
}) {
  const subsectionId = slugify(title);

  if (nested) {
    return (
      <div className="v-subsection v-subsection--nested">
        <h4 id={subsectionId} className="v-semantic-section__title v-subsection--anchor">
          {title}
        </h4>
        {children}
      </div>
    );
  }

  return (
    <div className="v-subsection">
      <h3 id={subsectionId} className="v-subsection__title v-subsection--anchor">
        {title}
      </h3>
      {children}
    </div>
  );
}

function PrimitiveGroup({
  title,
  id,
  description,
  children,
}: {
  title: string;
  id: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="v-primitive-group v-primitive-group--anchor">
      <header className="v-primitive-group__header">
        <h3 className="v-subsection__title">{title}</h3>
        <p className="v-primitive-group__desc">{description}</p>
      </header>
      <div className="v-primitive-group__body">{children}</div>
    </div>
  );
}

export function PrimitiveSection() {
  return (
    <SectionBlock
      title="Primitive"
      id="primitive"
      description="Raw color ramps grouped by Brand, Neutral, and Functional. Not for direct use in product UI."
    >
      <PrimitiveGroup
        title="Brand"
        id="primitive-brand"
        description="Core identity palettes — green, lavender, and iridescence."
      >
        <Subsection title="Green" nested>
          <ColorRamp steps={rampToSteps(primitive.green)} />
        </Subsection>
        <Subsection title="Lavender" nested>
          <ColorRamp steps={rampToSteps(primitive.lavender)} />
        </Subsection>
        <Subsection title="Iridescence" nested>
          <div className="v-swatch-gradient v-swatch-gradient--iridescence" aria-hidden />
          <ColorRamp steps={rampToSteps(primitive.iridescence)} />
        </Subsection>
      </PrimitiveGroup>

      <PrimitiveGroup
        title="Neutral"
        id="primitive-neutral"
        description="Grayscale ramps for surfaces, text, and borders."
      >
        <ColorRamp steps={rampToSteps(primitive.neutral)} />
      </PrimitiveGroup>

      <PrimitiveGroup
        title="Functional"
        id="primitive-functional"
        description="Status palettes for success, warning, error, and info feedback."
      >
        <Subsection title="Success" nested>
          <ColorRamp steps={rampToSteps(primitive.success)} />
        </Subsection>
        <Subsection title="Warning" nested>
          <ColorRamp steps={rampToSteps(primitive.warning)} />
        </Subsection>
        <Subsection title="Error" nested>
          <ColorRamp steps={rampToSteps(primitive.error)} />
        </Subsection>
        <Subsection title="Info" nested>
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
      </PrimitiveGroup>
    </SectionBlock>
  );
}

export function SemanticSection() {
  return (
    <SectionBlock
      title="Semantic"
      id="semantic"
      description="Purpose-driven UI roles shared across all Visionary products."
    >
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

export function ComponentSection() {
  return (
    <SectionBlock
      title="Component"
      id="component"
      description="Semantic roles mapped to Button, Input, Card, Alert, and Modal color slots."
    >
      <ComponentTokenTable tokens={component as unknown as Record<string, unknown>} />
    </SectionBlock>
  );
}
