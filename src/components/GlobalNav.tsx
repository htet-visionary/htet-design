"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArchiveBadge } from "@/components/ArchiveBadge";
import { getGlobalNavSections } from "@/lib/sections";

export function GlobalNav() {
  const pathname = usePathname();
  const navSections = getGlobalNavSections();

  function isActive(href: string): boolean {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      aria-label="Global navigation"
      className="border-b border-neutral-200 bg-white/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-2 px-4 py-3 sm:px-6">
        {navSections.map((section) => {
          const active = isActive(section.href);

          return (
            <Link
              key={section.id}
              href={section.href}
              className={[
                "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition",
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span>{section.title}</span>
              {section.archive && <ArchiveBadge />}
            </Link>
          );
        })}

        <Link
          href="/menu"
          className={[
            "ml-auto rounded-lg px-3 py-1.5 text-sm font-medium transition",
            pathname === "/menu"
              ? "bg-neutral-900 text-white"
              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900",
          ].join(" ")}
          aria-current={pathname === "/menu" ? "page" : undefined}
        >
          Menu
        </Link>
      </div>
    </nav>
  );
}
