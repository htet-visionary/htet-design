"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { visionaryMeta } from "@design-system/visionary";
import { visionaryNavigation } from "@/lib/navigation";

export function VisionaryShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="v-shell visionary-root">
      <aside className="v-shell__sidebar" aria-label="Documentation navigation">
        <div className="v-shell__brand">
          <Link href="/" className="v-shell__brand-link">
            {visionaryMeta.name}
          </Link>
          <span className="v-shell__version">v{visionaryMeta.version}</span>
        </div>

        <nav className="v-shell__nav">
          {visionaryNavigation.map((group) => (
            <div key={group.title} className="v-shell__group">
              <p className="v-shell__group-title">{group.title}</p>
              <ul className="v-shell__list">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "v-shell__link",
                        isActive(item.href) && "v-shell__link--active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="v-shell__main">{children}</div>
    </div>
  );
}
