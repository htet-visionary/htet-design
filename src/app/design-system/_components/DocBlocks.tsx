import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="ds-section-label">{children}</p>;
}

export function DocBlock({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="ds-doc-block scroll-mt-20">
      <h2 className="ds-doc-block__title">{title}</h2>
      {description && <p className="ds-doc-block__desc">{description}</p>}
      {children && <div className="ds-doc-block__content">{children}</div>}
    </section>
  );
}

export function PreviewBox({ children }: { children: ReactNode }) {
  return (
    <div className="ds-preview">
      <div className="ds-preview__inner">{children}</div>
    </div>
  );
}

export function TokenRow({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="ds-token-row">
      <span className="ds-token-row__name">{name}</span>
      <code className="ds-token-row__value">{value}</code>
    </div>
  );
}
