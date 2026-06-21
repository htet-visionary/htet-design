import type { ReactNode } from "react";

export type CardShellState = "default" | "hover";

export function DocCardShell({ state = "default" }: { state?: CardShellState }) {
  return (
    <article
      className={[
        "v-cmp-card",
        "v-cmp-card--shell",
        state !== "default" ? "v-cmp-card--hover" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    />
  );
}

type CardGroupItem = {
  label: string;
  children: ReactNode;
};

function CardGroup({ items, label }: { items: CardGroupItem[]; label: string }) {
  return (
    <ul className="v-foundation-preview v-cmp-btn-group" aria-label={label}>
      {items.map((item) => (
        <li key={item.label} className="v-cmp-btn-group__row">
          <span className="v-cmp-btn-group__label">{item.label}</span>
          <span className="v-cmp-btn-group__specimen">{item.children}</span>
        </li>
      ))}
    </ul>
  );
}

export function CardVariantsPreview() {
  return (
    <CardGroup
      label="Variants"
      items={[
        { label: "Default", children: <DocCardShell /> },
        { label: "Hover", children: <DocCardShell state="hover" /> },
      ]}
    />
  );
}
