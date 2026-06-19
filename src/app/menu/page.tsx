import type { Metadata } from "next";
import { GlobalNav } from "@/components/GlobalNav";
import { SectionCard } from "@/components/SectionCard";
import {
  archiveSubpages,
  getArchiveSubpagesForSection,
  sections,
} from "@/lib/sections";

export const metadata: Metadata = {
  title: "Menu — Visionary",
  description: "Browse Visionary Design System and archive sections.",
};

export default function MenuPage() {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <GlobalNav />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Menu
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
          Visionary Design System is the primary entry point. Archives preserve
          earlier explorations without modification.
        </p>

        <nav aria-label="Section menu" className="mt-8 grid gap-4 sm:mt-10">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              subpages={getArchiveSubpagesForSection(section.id)}
            />
          ))}
        </nav>

        {archiveSubpages.length > 0 && (
          <p className="mt-8 text-xs text-zinc-500">
            Nested archive pages such as Color Foundations (v0) appear under
            their parent section above.
          </p>
        )}
      </main>
    </div>
  );
}
