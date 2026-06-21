import { DocPage, SectionBlock } from "@/components/visionary/DocParts";
import type { ReactNode } from "react";

export function componentDocPage({
  title,
  description,
  preview,
  sectionTitle = "Variants",
}: {
  title: string;
  description: string;
  preview: ReactNode;
  sectionTitle?: string;
}) {
  return (
    <DocPage eyebrow="Guidelines · Components" title={title} description={description}>
      <SectionBlock title={sectionTitle}>{preview}</SectionBlock>
    </DocPage>
  );
}
