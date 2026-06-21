import { componentDocPage } from "@/components/visionary/componentDocPage";
import { DropdownVariantsPreview } from "@/components/visionary/NavComponentsDocPreview";

export default function DropdownPage() {
  return componentDocPage({
    title: "Dropdown",
    description: "Action menus anchored to a trigger control.",
    preview: <DropdownVariantsPreview />,
    sectionTitle: "States",
  });
}
