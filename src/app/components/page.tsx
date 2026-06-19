import { DocPage, LinkGrid, SectionBlock } from "@/components/visionary/DocParts";

export default function ComponentsHubPage() {
  return (
    <DocPage
      eyebrow="System"
      title="Component foundations"
      description="Token slots and usage rules. Not visual design — foundations only."
    >
      <SectionBlock title="Components">
        <LinkGrid
          links={[
            {
              title: "Button",
              href: "/components/button",
              description: "Primary, secondary, destructive, disabled variants.",
            },
            {
              title: "Input",
              href: "/components/input",
              description: "Labels, errors, focus, disabled states.",
            },
            {
              title: "Card",
              href: "/components/card",
              description: "Grouped content with elevation rules.",
            },
            {
              title: "Alert",
              href: "/components/alert",
              description: "Status communication — not CTAs.",
            },
            {
              title: "Modal",
              href: "/components/modal",
              description: "Scrim, focus trap, destructive confirmations.",
            },
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
