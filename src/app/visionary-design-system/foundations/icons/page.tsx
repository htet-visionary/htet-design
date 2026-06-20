import {
  DocPage,
  RuleList,
  SectionBlock,
  TokenTable,
} from "@/components/visionary/DocParts";
import { IconsUsagePreview } from "@/components/visionary/FoundationPreviews";
import { icons, touchTarget } from "@design-system/visionary";
import { Sparkles } from "lucide-react";

const sizeCssVar: Record<keyof typeof icons.size, string> = {
  xs: "--v-icon-xs",
  sm: "--v-icon-sm",
  md: "--v-icon-md",
  lg: "--v-icon-lg",
  xl: "--v-icon-xl",
};

const colorCssVar: Record<keyof typeof icons.color, string> = {
  default: "--v-icon-color-default",
  muted: "--v-icon-color-muted",
  primary: "--v-icon-color-primary",
  onSolid: "--v-icon-color-on-solid",
  statusSuccess: "--v-status-success-icon",
  statusWarning: "--v-status-warning-icon",
  statusError: "--v-status-error-icon",
  statusInfo: "--v-status-info-icon",
};

export default function IconsPage() {
  const sizeRows = Object.entries(icons.size).map(([name, px]) => ({
    token: `icons.size.${name}`,
    value: `${px}px`,
    note: `var(${sizeCssVar[name as keyof typeof icons.size]})`,
  }));

  const colorRows = Object.entries(icons.color).map(([name, token]) => ({
    token: `icons.color.${name}`,
    value: token,
    note: `var(${colorCssVar[name as keyof typeof icons.color]})`,
  }));

  return (
    <DocPage
      eyebrow="Foundations"
      title="Icons"
      description="Lucide icon library with a fixed size scale, stroke weight, and semantic color roles."
    >
      <SectionBlock title="Library">
        <TokenTable
          rows={[
            {
              token: "icons.library",
              value: icons.library,
              note: "lucide-react",
            },
            {
              token: "icons.strokeWidth",
              value: String(icons.strokeWidth),
              note: "var(--v-icon-stroke)",
            },
            {
              token: "icons.gap.inline",
              value: `${icons.gap.inline}px`,
              note: "var(--v-icon-gap)",
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Size scale">
        <ul className="v-icon-specimen-grid">
          {(Object.keys(icons.size) as Array<keyof typeof icons.size>).map((name) => (
            <li key={name} className="v-icon-specimen">
              <Sparkles
                className="v-icon-specimen__glyph"
                style={{
                  width: `var(${sizeCssVar[name]})`,
                  height: `var(${sizeCssVar[name]})`,
                }}
                strokeWidth={icons.strokeWidth}
                aria-hidden
              />
              <code className="v-code v-code--sm">icons.size.{name}</code>
            </li>
          ))}
        </ul>
        <TokenTable rows={sizeRows} />
      </SectionBlock>

      <SectionBlock title="Color roles">
        <ul className="v-icon-specimen-grid v-icon-specimen-grid--colors">
          {(Object.keys(icons.color) as Array<keyof typeof icons.color>).map((name) => (
            <li key={name} className="v-icon-specimen">
              <Sparkles
                className="v-icon-specimen__glyph"
                style={{
                  width: "var(--v-icon-md)",
                  height: "var(--v-icon-md)",
                  color: `var(${colorCssVar[name]})`,
                }}
                strokeWidth={icons.strokeWidth}
                aria-hidden
              />
              <code className="v-code v-code--sm">icons.color.{name}</code>
            </li>
          ))}
        </ul>
        <TokenTable rows={colorRows} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <IconsUsagePreview />
        <TokenTable
          caption="Recommended contexts"
          rows={[
            { token: "sidebar nav", value: "icons.size.sm", note: "with icons.gap.inline" },
            { token: "inline with label", value: "icons.size.sm–md", note: "buttons, list rows" },
            { token: "link cards", value: "icons.size.lg", note: "foundations, explore grids" },
            { token: "hub / marketing tiles", value: "icons.size.xl", note: "site menu cards" },
            {
              token: "icon-only controls",
              value: "icons.size.md minimum visual",
              note: `${touchTarget.minimum}px hit area`,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Rules">
        <RuleList
          rules={[
            "Use Lucide icons only — do not mix icon libraries.",
            "Decorative icons must use aria-hidden.",
            "Icon-only controls require an accessible name (aria-label).",
            `Icon-only controls must meet touch-target.minimum (${touchTarget.minimum}px).`,
            "Apply semantic color tokens — never hard-code hex values on icons.",
          ]}
        />
      </SectionBlock>
    </DocPage>
  );
}
