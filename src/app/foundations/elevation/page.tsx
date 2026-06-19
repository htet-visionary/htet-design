import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { elevation } from "@design-system/visionary";

export default function ElevationPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Elevation"
      description="Shadows and z-index communicate layering — not importance."
    >
      <SectionBlock title="Levels">
        <TokenTable
          rows={[
            {
              token: "elevation.card",
              value: elevation.card.shadow,
              note: `z-index: ${elevation.card.zIndex}`,
            },
            {
              token: "elevation.dropdown",
              value: elevation.dropdown.shadow,
              note: `z-index: ${elevation.dropdown.zIndex}`,
            },
            {
              token: "elevation.overlay",
              value: "—",
              note: `z-index: ${elevation.overlay.zIndex}`,
            },
            {
              token: "elevation.modal",
              value: elevation.modal.shadow,
              note: `z-index: ${elevation.modal.zIndex}`,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Do not stack more than one modal level.",
            "Do not introduce new shadows without approval.",
            "Dropdowns inside modals inherit modal z-index context.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
