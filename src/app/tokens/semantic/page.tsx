import {
  DocPage,
  flattenObject,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { semantic } from "@design-system/visionary";

export default function SemanticTokensPage() {
  const rows = flattenObject(semantic as unknown as Record<string, unknown>);

  return (
    <DocPage
      eyebrow="Tokens"
      title="Semantic colors"
      description="Purpose-driven UI roles shared across all Visionary products."
    >
      <SectionBlock title="Roles">
        <TokenTable rows={rows} />
      </SectionBlock>

      <SectionBlock title="Usage rules">
        <RuleList
          rules={[
            "focus.* — all interactive focus states; do not invent per-component focus colors.",
            "disabled.* — use instead of opacity hacks.",
            "link.* — inline text links; action.* for button-like navigation.",
            "text.on-solid / status.*.on-solid — text on solid fills.",
            "action.destructive* — irreversible actions, not error status surfaces.",
            "overlay.scrim* — modal and drawer backdrops.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
