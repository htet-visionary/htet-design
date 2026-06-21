import { componentDocPage } from "@/components/visionary/componentDocPage";
import { TabsVariantsPreview } from "@/components/visionary/NavComponentsDocPreview";

export default function TabsPage() {
  return componentDocPage({
    title: "Tabs",
    description: "Section navigation within a shared view.",
    preview: <TabsVariantsPreview />,
  });
}
