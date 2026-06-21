import { componentDocPage } from "@/components/visionary/componentDocPage";
import { MenuVariantsPreview } from "@/components/visionary/NavComponentsDocPreview";

export default function MenuPage() {
  return componentDocPage({
    title: "Menu",
    description: "Vertical list of actions or navigation links.",
    preview: <MenuVariantsPreview />,
  });
}
