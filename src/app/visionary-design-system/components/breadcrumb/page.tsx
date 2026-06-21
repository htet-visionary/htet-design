import { componentDocPage } from "@/components/visionary/componentDocPage";
import { BreadcrumbVariantsPreview } from "@/components/visionary/NavComponentsDocPreview";

export default function BreadcrumbPage() {
  return componentDocPage({
    title: "Breadcrumb",
    description: "Hierarchical location trail within the product.",
    preview: <BreadcrumbVariantsPreview />,
  });
}
