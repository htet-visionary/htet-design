import type { ReactNode } from "react";

export type DocGroupItem = {
  label: string;
  children: ReactNode;
};

export function ComponentDocGroup({ items, label }: { items: DocGroupItem[]; label: string }) {
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

export function variantsPreview(label: string, items: DocGroupItem[]) {
  return <ComponentDocGroup label={label} items={items} />;
}
