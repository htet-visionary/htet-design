"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { visionaryMeta } from "@design-system/visionary";
import { visionaryNavigation, designSystemBase, type NavItem } from "@/lib/navigation";
import { NavIcon, dsNavIcons } from "@/lib/nav-icons";

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
      <NavIcon href={item.href} map={dsNavIcons} className="v-shell__link-icon" />
      {item.title}
    </Link>
  );
}

export function VisionaryShell({ children }: { children: ReactNode }) {
  return (
    <div className="v-shell visionary-root">
      <aside className="v-shell__sidebar" aria-label="Documentation navigation">
        <div className="v-shell__brand">
          <Link href={designSystemBase} className="v-shell__brand-link">
            {visionaryMeta.name}
          </Link>
          <span className="v-shell__version">
            V-{visionaryMeta.version.toUpperCase()}
          </span>
        </div>

        <nav className="v-shell__nav">
          {visionaryNavigation.map((group) => {
            const subgroupBlock =
              group.subgroups?.map((subgroup, index) => (
                <div
                  key={subgroup.title ?? subgroup.items[0]?.href ?? index}
                  className="v-shell__subgroup"
                >
                  {subgroup.title && (
                    <p className="v-shell__subgroup-title">{subgroup.title}</p>
                  )}
                  <ul className="v-shell__list">
                    {subgroup.items.map((item, itemIndex) => (
                      <li key={item.href}>
                        <NavLink
                          item={item}
                          nested={subgroup.title ? true : itemIndex > 0}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )) ?? null;

            const itemsBlock =
              group.items && group.items.length > 0 ? (
                <ul className="v-shell__list">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <NavLink item={item} />
                    </li>
                  ))}
                </ul>
              ) : null;

            return (
              <div key={group.title} className="v-shell__group">
                <p className="v-shell__group-title">{group.title}</p>
                {group.subgroupsAfterItems ? (
                  <>
                    {itemsBlock}
                    {subgroupBlock}
                  </>
                ) : (
                  <>
                    {subgroupBlock}
                    {itemsBlock}
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="v-shell__main">{children}</div>
    </div>
  );
}
