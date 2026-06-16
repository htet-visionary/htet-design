import Link from "next/link";

type SiteHeaderProps = {
  backHref?: string;
  backLabel?: string;
  title?: string;
};

export function SiteHeader({
  backHref,
  backLabel = "Back to menu",
  title = "Top",
}: SiteHeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <div className="min-w-0">
          {backHref ? (
            <Link
              href={backHref}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              ← {backLabel}
            </Link>
          ) : (
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              Menu
            </p>
          )}
          <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}
