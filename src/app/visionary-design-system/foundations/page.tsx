import { DocPage, LinkGrid, SectionBlock } from "@/components/visionary/DocParts";
import { designSystemBase } from "@/lib/navigation";

export default function FoundationsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Foundations"
      description="Core visual language — color, typography, spacing, and layout scales."
    >
      <SectionBlock title="Colors">
        <LinkGrid
          links={[
            {
              title: "Colors",
              href: `${designSystemBase}/foundations/colors`,
              description: "Primitive, semantic, and functional palettes.",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Visual scales">
        <LinkGrid
          links={[
            {
              title: "Typography",
              href: `${designSystemBase}/foundations/typography`,
              description: "Display, reading, and interface type scales.",
            },
            {
              title: "Spacing",
              href: `${designSystemBase}/foundations/spacing`,
              description: "4px-based spacing scale and usage guidance.",
            },
            {
              title: "Radius",
              href: `${designSystemBase}/foundations/radius`,
              description: "Corner radius tokens from sm to pill.",
            },
            {
              title: "Elevation",
              href: `${designSystemBase}/foundations/elevation`,
              description: "Shadows and z-index layering.",
            },
            {
              title: "Motion",
              href: `${designSystemBase}/foundations/motion`,
              description: "Durations, easing, enter/exit, reduced motion.",
            },
            {
              title: "Layout",
              href: `${designSystemBase}/foundations/layout`,
              description: "Breakpoints, containers, grid.",
            },
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
