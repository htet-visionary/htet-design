type IllustrationPlaceholderProps = {
  variant?: "hero" | "card" | "square" | "wide" | "avatar";
  label?: string;
  className?: string;
};

export function IllustrationPlaceholder({
  variant = "card",
  label,
  className,
}: IllustrationPlaceholderProps) {
  return (
    <div
      className={[
        "v-dream-fund-app__illus",
        `v-dream-fund-app__illus--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role={label ? "img" : "presentation"}
      aria-label={label}
    />
  );
}
