"use client";

import type { ReactNode } from "react";

type V0FlowScreenProps = {
  children: ReactNode;
  className?: string;
};

type V0FlowHeadProps = {
  title?: string;
  desc?: string;
};

export function V0FlowScreen({ children, className }: V0FlowScreenProps) {
  return (
    <div
      className={["v-dream-fund-v0__flow-screen", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

export function V0FlowHead({ title, desc }: V0FlowHeadProps) {
  if (!title && !desc) {
    return null;
  }

  return (
    <header className="v-dream-fund-v0__flow-head">
      {title ? <h1 className="v-dream-fund-v0__title">{title}</h1> : null}
      {desc ? <p className="v-dream-fund-v0__desc">{desc}</p> : null}
    </header>
  );
}

export function V0EmptyState({
  children,
  inline = false,
}: {
  children: ReactNode;
  inline?: boolean;
}) {
  return (
    <p
      className={[
        "v-dream-fund-v0__empty",
        inline ? "v-dream-fund-v0__empty--inline" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
