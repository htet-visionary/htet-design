import { spacing } from "@design-system/visionary";

const usageRows = [
  {
    name: "Inline gaps",
    tokens: "spacing.1–2",
    range: "4–8px",
    demoPx: spacing[2],
  },
  {
    name: "Component padding",
    tokens: "spacing.3–4",
    range: "12–16px",
    demoPx: spacing[4],
  },
  {
    name: "Between components",
    tokens: "spacing.4–6",
    range: "16–24px",
    demoPx: spacing[6],
  },
  {
    name: "Section separation",
    tokens: "spacing.8–12",
    range: "32–48px",
    demoPx: spacing[12],
  },
  {
    name: "Page rhythm",
    tokens: "spacing.12–16",
    range: "48–64px",
    demoPx: spacing[16],
  },
] as const;

export function SpacingUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Spacing usage">
      {usageRows.map((row) => (
        <li key={row.name} className="v-spacing-usage__row">
          <span className="v-spacing-usage__name">{row.name}</span>
          <span
            className="v-spacing-usage__bar"
            style={{
              width: row.demoPx,
              height: row.demoPx >= 32 ? 10 : 8,
            }}
            aria-hidden
          />
          <span className="v-spacing-usage__meta">
            <code className="v-code v-code--sm">{row.tokens}</code>
            <span aria-hidden>·</span>
            <span>{row.range}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
