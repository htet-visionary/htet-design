type ArchiveBadgeProps = {
  className?: string;
};

export function ArchiveBadge({ className = "" }: ArchiveBadgeProps) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center rounded-full border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Archive
    </span>
  );
}
