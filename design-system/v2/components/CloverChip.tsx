import type { ReactNode } from "react";

type CloverChipProps = {
  children: ReactNode;
  variant?: "green" | "lavender" | "golden";
};

export function CloverChip({ children, variant = "green" }: CloverChipProps) {
  const variantClass =
    variant === "lavender"
      ? "lc-chip-clover--lavender"
      : variant === "golden"
        ? "lc-chip-clover--golden"
        : "";

  return (
    <span className={`lc-chip-clover ${variantClass}`}>
      <span aria-hidden>☘</span>
      {children}
    </span>
  );
}
