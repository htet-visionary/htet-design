import { DocPage, LinkGrid, SectionBlock } from "@/components/visionary/DocParts";

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
              href: "/foundations/colors",
              description: "Overview of primitive, semantic, functional, and theme layers.",
            },
            {
              title: "Primitive",
              href: "/foundations/colors/primitive",
              description: "Brand and neutral ramps.",
            },
            {
              title: "Semantic",
              href: "/foundations/colors/semantic",
              description: "Purpose-driven UI roles.",
            },
            {
              title: "Functional",
              href: "/foundations/colors/functional",
              description: "Status palettes for feedback.",
            },
            {
              title: "Themes",
              href: "/foundations/colors/themes",
              description: "Product color personality and overrides.",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Visual scales">
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
