import { componentDocPage } from "@/components/visionary/componentDocPage";
import { AvatarVariantsPreview } from "@/components/visionary/DisplayDocPreview";

export default function AvatarPage() {
  return componentDocPage({
    title: "Avatar",
    description: "User or entity representation across sizes.",
    preview: <AvatarVariantsPreview />,
    sectionTitle: "Sizes",
  });
}
