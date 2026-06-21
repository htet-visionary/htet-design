import { DocPage, RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  ElevationDropShadowPreview,
  ElevationOverlayPreview,
} from "@/components/visionary/ElevationPreview";

export default function ElevationPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Elevation"
      description="Drop shadow and overlay communicate layering — not importance."
    >
      <SectionBlock title="Drop shadow">
        <ElevationDropShadowPreview />
      </SectionBlock>

      <SectionBlock title="Overlay">
        <ElevationOverlayPreview />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Do not stack more than one modal level.",
            "Do not introduce new shadows without approval.",
            "Use overlay.scrim for modals; scrim-light for drawers; none for floating layers.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
