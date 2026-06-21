import { componentDocPage } from "@/components/visionary/componentDocPage";
import { AccordionVariantsPreview } from "@/components/visionary/NavComponentsDocPreview";

export default function AccordionPage() {
  return componentDocPage({
    title: "Accordion",
    description: "Expandable panels for progressive disclosure.",
    preview: <AccordionVariantsPreview />,
    sectionTitle: "States",
  });
}
