import { SiteHeader } from "@/components/SiteHeader";
import { getSectionById } from "@/lib/sections";
import { notFound } from "next/navigation";

const section = getSectionById("design-system");

export default function DesignSystemPage() {
  if (!section) {
    notFound();
  }

  return (
    <div className="min-h-dvh">
      <SiteHeader backHref="/" title={section.title} />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
          Design system content will live here. Source files and assets are
          organized in the root-level{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800">
            /design-system
          </code>{" "}
          folder.
        </p>

        <section className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Planned
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700 sm:text-base">
            <li>Color tokens and typography scale</li>
            <li>Reusable UI components</li>
            <li>Layout and spacing guidelines</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
