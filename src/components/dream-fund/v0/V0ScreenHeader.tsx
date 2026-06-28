"use client";

import type { ReactNode } from "react";

type V0ScreenHeaderProps = {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  progress?: number | null;
  variant?: "bar" | "brand";
  brand?: {
    greeting: string;
    name: string;
  };
};

function HeaderSlot({
  children,
  align = "center",
}: {
  children?: ReactNode;
  align?: "start" | "center" | "end";
}) {
  return (
    <div
      className={[
        "v-dream-fund-v0__header-slot",
        align === "start" ? "v-dream-fund-v0__header-slot--start" : "",
        align === "end" ? "v-dream-fund-v0__header-slot--end" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? <span className="v-dream-fund-v0__header-slot-placeholder" aria-hidden />}
    </div>
  );
}

export function V0ScreenHeader({
  title,
  left,
  right,
  progress = null,
  variant = "bar",
  brand,
}: V0ScreenHeaderProps) {
  return (
    <header
      className={[
        "v-dream-fund-v0__header",
        variant === "brand" ? "v-dream-fund-v0__header--brand" : "",
        variant === "bar" && title ? "v-dream-fund-v0__header--titled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {variant === "brand" && brand ? (
        <div className="v-dream-fund-v0__header-brand">
          <p className="v-dream-fund-v0__header-brand-greeting">{brand.greeting}</p>
          <h1 className="v-dream-fund-v0__header-brand-name">{brand.name}</h1>
        </div>
      ) : (
        <div className="v-dream-fund-v0__header-bar">
          <HeaderSlot align="start">{left}</HeaderSlot>
          {title ? (
            <h1 className="v-dream-fund-v0__header-title">{title}</h1>
          ) : (
            <div className="v-dream-fund-v0__header-title-spacer" aria-hidden />
          )}
          <HeaderSlot align="end">{right}</HeaderSlot>
        </div>
      )}

      {typeof progress === "number" ? (
        <div className="v-dream-fund-v0__progress" aria-hidden>
          <div className="v-dream-fund-v0__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      ) : null}
    </header>
  );
}

export function V0HeaderIconButton({
  label,
  onClick,
  children,
  expanded,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      className="v-dream-fund-v0__icon-btn"
      aria-label={label}
      aria-expanded={expanded}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
