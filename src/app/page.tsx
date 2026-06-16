import { SectionCard } from "@/components/SectionCard";
import { SiteHeader } from "@/components/SiteHeader";
import { sections } from "@/lib/sections";

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader title="Top" />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          Choose a section to explore. New areas like portfolio can be added at
          the same level as design-system.
        </p>

        <nav aria-label="Section menu" className="mt-8 grid gap-4 sm:mt-10">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </nav>
      </main>
    </div>
  );
}
