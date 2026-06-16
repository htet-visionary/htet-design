import Link from "next/link";
import type { Section } from "@/lib/sections";

type SectionCardProps = {
  section: Section;
};

export function SectionCard({ section }: SectionCardProps) {
  const isComingSoon = section.status === "coming-soon";

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
          {section.title}
        </h2>
        {isComingSoon && (
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
        {section.description}
      </p>
      <p className="mt-4 text-sm font-medium text-zinc-900">
        {isComingSoon ? "Not available yet" : "Open section →"}
      </p>
    </>
  );

  if (isComingSoon) {
    return (
      <div
        aria-label={`${section.title} — coming soon`}
        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 opacity-70 sm:p-6"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={section.href}
      className="group block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:p-6"
    >
      {cardContent}
    </Link>
  );
}
