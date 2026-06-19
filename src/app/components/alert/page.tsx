import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { component } from "@design-system/visionary";

export default function AlertPage() {
  const { success, warning, error, info, shared } = component.alert;

  return (
    <DocPage
      eyebrow="Components"
      title="Alert"
      description="Status communication — not calls to action."
    >
      <SectionBlock title="Status tokens">
        <TokenTable
          rows={[
            { token: "success.background", value: success.background },
            { token: "warning.background", value: warning.background },
            { token: "error.background", value: error.background },
            { token: "info.background", value: info.background },
            { token: "shared.radius", value: shared.radius },
            { token: "shared.font", value: shared.font },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Usage rules">
        <RuleList
          rules={[
            "Alerts communicate status. They are not calls to action.",
            "One alert type per message.",
            "Error alerts describe the problem and how to fix it.",
            "Dismissible alerts require an accessible close control.",
            "Do not use alert colors for button fills.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
