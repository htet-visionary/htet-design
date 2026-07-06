import type { ReactNode } from "react";

type ExportDocumentProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function ExportDocument({ title, eyebrow, children }: ExportDocumentProps) {
  return (
    <div className="v-export" data-export-ready="true">
      <header className="v-export__header">
        {eyebrow ? <p className="v-export__eyebrow">{eyebrow}</p> : null}
        <h1 className="v-export__title">{title}</h1>
      </header>
      {children}
    </div>
  );
}

export function ExportSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="v-export__section">
      <h2 className="v-export__section-title">{title}</h2>
      {description ? <p className="v-export__section-desc">{description}</p> : null}
      {children}
    </section>
  );
}
