import { componentDocPage } from "@/components/visionary/componentDocPage";
import { NavigationVariantsPreview } from "@/components/visionary/NavComponentsDocPreview";

export default function NavigationPage() {
  return componentDocPage({
    title: "Navigation",
    description: "Primary sidebar or rail navigation patterns.",
    preview: <NavigationVariantsPreview />,
  });
}
