import { componentDocPage } from "@/components/visionary/componentDocPage";
import { ToastVariantsPreview } from "@/components/visionary/FeedbackDocPreview";

export default function ToastPage() {
  return componentDocPage({
    title: "Toast",
    description: "Transient feedback messages that appear above the page.",
    preview: <ToastVariantsPreview />,
  });
}
