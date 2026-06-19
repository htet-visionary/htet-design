import Link from "next/link";
import { ArchiveBadge } from "@/components/ArchiveBadge";
import type { ArchiveSubpage, Section } from "@/lib/sections";

type SectionCardProps = {
  section: Section;
  subpages?: ArchiveSubpage[];
};

export function SectionCard({ section, subpages = [] }: SectionCardProps) {
  const isComingSoon = section.status === "coming-soon";
  const hasSubpages = subpages.length > 0;

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
          {section.title}
        </h2>
        {section.archive && <ArchiveBadge className="!text-[9px]" />}
      </div>
      {isComingSoon && (
        <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
          Coming soon
        </span>
      )}
    </div>
  );

  const description = (
    <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
      {section.description}
    </p>
  );

  const subpageList = hasSubpages && (
    <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
      {subpages.map((subpage) => (
        <li key={subpage.id}>
          <Link
            href={subpage.href}
            className="group flex flex-wrap items-center gap-2 text-sm text-zinc-700 transition hover:text-zinc-900"
          >
            <span className="font-medium group-hover:underline">
              {subpage.title}
            </span>
            <ArchiveBadge className="!text-[9px]" />
          </Link>
          <p className="mt-0.5 text-xs text-zinc-500">{subpage.description}</p>
        </li>
      ))}
    </ul>
  );

  const openLink = !isComingSoon && (
    <Link
      href={section.href}
      className="mt-4 inline-block text-sm font-medium text-zinc-900 transition hover:underline"
    >
      Open section →
    </Link>
  );

  const cardClassName =
    "block rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6" +
    (isComingSoon ? " bg-zinc-50 opacity-70" : "");

  if (isComingSoon) {
    return (
      <div
        aria-label={`${section.title} — coming soon`}
        className={cardClassName}
      >
        {header}
        {description}
        <p className="mt-4 text-sm font-medium text-zinc-900">
          Not available yet
        </p>
      </div>
    );
  }

  if (hasSubpages) {
    return (
      <div className={`${cardClassName} hover:border-zinc-300 hover:shadow-sm`}>
        {header}
        {description}
        {subpageList}
        {openLink}
      </div>
    );
  }

  return (
    <Link
      href={section.href}
      className={`${cardClassName} transition hover:border-zinc-300 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900`}
    >
      {header}
      {description}
      <p className="mt-4 text-sm font-medium text-zinc-900">Open section →</p>
    </Link>
  );
}
