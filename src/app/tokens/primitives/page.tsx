import {
  DocPage,
  SectionBlock,
  SwatchGrid,
  TokenTable,
} from "@/components/visionary/DocParts";
import { primitive } from "@design-system/visionary";

function rampToSwatches(name: string, prefix: string, ramp: Record<string | number, string>) {
  return Object.entries(ramp).map(([step]) => ({
    name: `${name} ${step}`,
    cssVar: `--v-${prefix}-${step}`,
    token: `${prefix}.${step}`,
  }));
}

export default function PrimitivesPage() {
  const rows = Object.entries(primitive).flatMap(([palette, ramp]) =>
    Object.entries(ramp as Record<string, string>).map(([step, hex]) => ({
      token: `${palette}.${step}`,
      value: hex,
    })),
  );

  return (
    <DocPage
      eyebrow="Tokens"
      title="Primitive colors"
      description="Raw values with no UI meaning. Do not use directly in product UI."
    >
      <SectionBlock title="Green">
        <SwatchGrid swatches={rampToSwatches("Green", "green", primitive.green)} />
      </SectionBlock>

      <SectionBlock title="Lavender">
        <SwatchGrid
          swatches={rampToSwatches("Lavender", "lavender", primitive.lavender)}
        />
      </SectionBlock>

      <SectionBlock title="Iridescence">
        <SwatchGrid
          swatches={rampToSwatches(
            "Iridescence",
            "iridescence",
            primitive.iridescence,
          )}
        />
      </SectionBlock>

      <SectionBlock title="Neutral">
        <SwatchGrid
          swatches={rampToSwatches("Neutral", "neutral", primitive.neutral)}
        />
      </SectionBlock>

      <SectionBlock title="Functional palettes">
        <TokenTable caption="Success, warning, error, info ramps" rows={rows.filter((r) =>
          ["success", "warning", "error", "info"].some((p) => r.token.startsWith(p)),
        )} />
      </SectionBlock>

      <SectionBlock title="Full token table">
        <TokenTable rows={rows} />
      </SectionBlock>
    </DocPage>
  );
}
