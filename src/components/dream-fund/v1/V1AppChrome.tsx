"use client";

import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

type V1AppChromeProps = {
  variant: "home" | "flow";
  title?: string;
  greeting?: string;
  name?: string;
  onBack?: () => void;
  mainClassName?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export function V1AppChrome({
  variant,
  title,
  greeting,
  name,
  onBack,
  mainClassName,
  footer,
  children,
}: V1AppChromeProps) {
  return (
    <div className="v-dream-fund-v1__device">
      {variant === "home" ? (
        <header className="v-dream-fund-v1__home-header">
          <p className="v-dream-fund-v1__home-greeting">{greeting}</p>
          {name ? <p className="v-dream-fund-v1__home-name">{name}</p> : null}
        </header>
      ) : (
        <header
          className={[
            "v-dream-fund-v1__header",
            title ? "v-dream-fund-v1__header--titled" : "v-dream-fund-v1__header--flow",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {onBack ? (
            <button
              type="button"
              className="v-dream-fund-v1__icon-btn"
              onClick={onBack}
              aria-label="Back"
            >
              <ChevronLeft strokeWidth={2} size={20} />
            </button>
          ) : (
            <span className="v-dream-fund-v1__header-spacer" aria-hidden />
          )}
          {title ? (
            <h1 className="v-dream-fund-v1__header-title">{title}</h1>
          ) : (
            <span className="v-dream-fund-v1__header-spacer" aria-hidden />
          )}
          <span className="v-dream-fund-v1__header-spacer" aria-hidden />
        </header>
      )}

      <main
        className={["v-dream-fund-v1__main", mainClassName ?? ""].filter(Boolean).join(" ")}
      >
        {children}
      </main>

      {footer ? <footer className="v-dream-fund-v1__footer">{footer}</footer> : null}
    </div>
  );
}
