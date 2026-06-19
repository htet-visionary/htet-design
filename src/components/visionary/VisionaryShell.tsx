"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { visionaryMeta } from "@design-system/visionary";
import { visionaryNavigation, type NavItem } from "@/lib/navigation";

function NavLink({ item, nested }: { item: NavItem; nested?: boolean }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  function isActive(href: string, exact?: boolean) {
    const [path, fragment] = href.split("#");
    if (href === "/") return pathname === "/";

    if (exact) {
      return pathname === path && !fragment;
    }

    const pathMatch = pathname === path || pathname.startsWith(`${path}/`);
    if (!fragment) return pathMatch;
    return pathMatch && hash === `#${fragment}`;
  }

  const active = isActive(item.href, item.exact);

  return (
    <Link
      href={item.href}
      className={[
        "v-shell__link",
        nested && "v-shell__link--nested",
        active && "v-shell__link--active",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {item.title}
    </Link>
  );
}

export function VisionaryShell({ children }: { children: ReactNode }) {
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

              {group.subgroups?.map((subgroup) => (
                <div key={subgroup.title} className="v-shell__subgroup">
                  <p className="v-shell__subgroup-title">{subgroup.title}</p>
                  <ul className="v-shell__list">
                    {subgroup.items.map((item) => (
                      <li key={item.href}>
                        <NavLink item={item} nested />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {group.items && group.items.length > 0 && (
                <ul className="v-shell__list">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <NavLink item={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <div className="v-shell__main">{children}</div>
    </div>
  );
}
