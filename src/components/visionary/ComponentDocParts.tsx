import type { ReactNode } from "react";

export type SpecRow = {
  property: string;
  token: string;
  value: string;
};

export type LabeledSpecimen = {
  label: string;
  children: ReactNode;
};

export type UsageExample = {
  caption: string;
  children: ReactNode;
};

export function ComponentSpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="v-foundation-preview v-cmp-spec-table" aria-label="Component specifications">
      <div className="v-cmp-spec-table__head" aria-hidden>
        <span>Property</span>
        <span>Token</span>
        <span>Value</span>
      </div>
      <ul className="v-cmp-spec-table__body">
        {rows.map((row) => (
          <li key={row.property} className="v-cmp-spec-table__row">
            <span className="v-cmp-spec-table__property">{row.property}</span>
            <code className="v-code v-code--sm v-spacing-scale__token">{row.token}</code>
            <span className="v-cmp-spec-table__value">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ComponentVariantGrid({ items }: { items: LabeledSpecimen[] }) {
  return (
    <ul className="v-foundation-preview v-cmp-doc-grid v-cmp-doc-grid--variants" aria-label="Variants">
      {items.map((item) => (
        <li key={item.label} className="v-cmp-doc-cell">
          <div className="v-cmp-doc-cell__preview">{item.children}</div>
          <span className="v-cmp-doc-cell__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function ComponentStateGrid({ items }: { items: LabeledSpecimen[] }) {
  return (
    <ul className="v-foundation-preview v-cmp-doc-grid v-cmp-doc-grid--states" aria-label="States">
      {items.map((item) => (
        <li key={item.label} className="v-cmp-doc-cell">
          <div className="v-cmp-doc-cell__preview">{item.children}</div>
          <span className="v-cmp-doc-cell__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function ComponentAnatomy({
  children,
  parts,
}: {
  children: ReactNode;
  parts: { name: string; detail: string }[];
}) {
  return (
    <div className="v-foundation-preview v-cmp-anatomy" aria-label="Anatomy">
      <div className="v-cmp-anatomy__figure">{children}</div>
      <ol className="v-cmp-anatomy__legend">
        {parts.map((part, index) => (
          <li key={part.name}>
            <span className="v-cmp-anatomy__index" aria-hidden>
              {index + 1}
            </span>
            <span className="v-cmp-anatomy__name">{part.name}</span>
            <span className="v-cmp-anatomy__detail">{part.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function UsageGuidelines({
  doItems,
  dontItems,
}: {
  doItems: UsageExample[];
  dontItems: UsageExample[];
}) {
  return (
    <div className="v-cmp-usage" aria-label="Usage guidelines">
      <section className="v-cmp-usage__col v-cmp-usage__col--do" aria-label="When to use">
        <h3 className="v-cmp-usage__heading">When to use</h3>
        <ul className="v-cmp-usage__list">
          {doItems.map((item) => (
            <li key={item.caption} className="v-cmp-usage__item">
              <div className="v-cmp-usage__preview">{item.children}</div>
              <p className="v-cmp-usage__caption">{item.caption}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="v-cmp-usage__col v-cmp-usage__col--dont" aria-label="When not to use">
        <h3 className="v-cmp-usage__heading">When not to use</h3>
        <ul className="v-cmp-usage__list">
          {dontItems.map((item) => (
            <li key={item.caption} className="v-cmp-usage__item">
              <div className="v-cmp-usage__preview">{item.children}</div>
              <p className="v-cmp-usage__caption">{item.caption}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
