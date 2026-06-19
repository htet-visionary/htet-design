import { DocPage, LinkGrid, SectionBlock } from "@/components/visionary/DocParts";

export default function FoundationsPage() {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Foundations"
      description="Global scales for typography, spacing, radius, elevation, motion, and layout."
    >
      <SectionBlock title="Sections">
        <LinkGrid
          links={[
            {
              title: "Typography",
              href: "/foundations/typography",
              description: "Display, reading, and interface type scales.",
            },
            {
              title: "Spacing",
              href: "/foundations/spacing",
              description: "4px-based spacing scale and usage guidance.",
            },
            {
              title: "Radius",
              href: "/foundations/radius",
              description: "Corner radius tokens from sm to pill.",
            },
            {
              title: "Elevation",
              href: "/foundations/elevation",
              description: "Shadows and z-index layering.",
            },
            {
              title: "Motion",
              href: "/foundations/motion",
              description: "Durations, easing, enter/exit, reduced motion.",
            },
            {
              title: "Layout",
              href: "/foundations/layout",
              description: "Breakpoints, containers, grid.",
            },
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
