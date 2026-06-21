"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { visionaryMeta } from "@design-system/visionary";
import { visionaryNavigation, designSystemBase, type NavItem } from "@/lib/navigation";
import { NavIcon, dsNavIcons } from "@/lib/nav-icons";

function NavLink({
  item,
  nested,
  onNavigate,
}: {
  item: NavItem;
  nested?: boolean;
  onNavigate?: () => void;
}) {
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
      onClick={onNavigate}
    >
      <NavIcon href={item.href} map={dsNavIcons} className="v-shell__link-icon" />
      {item.title}
    </Link>
  );
}

export function VisionaryShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const syncMobile = () => setIsMobile(mediaQuery.matches);

    syncMobile();
    mediaQuery.addEventListener("change", syncMobile);
    return () => mediaQuery.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      document.documentElement.style.removeProperty("--v-shell-mobile-header-height");
      return;
    }

    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--v-shell-mobile-header-height",
        `${header.offsetHeight}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [isMobile, menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className={["v-shell visionary-root", menuOpen && "v-shell--menu-open"]
        .filter(Boolean)
        .join(" ")}
    >
      <header ref={headerRef} className="v-shell__mobile-header">
        <button
          type="button"
          className="v-shell__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="v-shell-sidebar"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="v-shell__menu-toggle-icon" aria-hidden />
          ) : (
            <Menu className="v-shell__menu-toggle-icon" aria-hidden />
          )}
          <span className="v-shell__menu-toggle-label">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
        </button>
        <Link href="/" className="v-shell__mobile-hub-link" onClick={closeMenu}>
          Menu
        </Link>
        <Link href={designSystemBase} className="v-shell__mobile-title" onClick={closeMenu}>
          {visionaryMeta.name}
        </Link>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="v-shell__overlay"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <aside
        id="v-shell-sidebar"
        className="v-shell__sidebar"
        aria-label="Documentation navigation"
        aria-hidden={isMobile && !menuOpen ? true : undefined}
        inert={isMobile && !menuOpen ? true : undefined}
      >
        <div className="v-shell__brand">
          <Link href={designSystemBase} className="v-shell__brand-link" onClick={closeMenu}>
            {visionaryMeta.name}
          </Link>
          <span className="v-shell__version">(BETA)</span>
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
                          onNavigate={closeMenu}
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
                      <NavLink item={item} onNavigate={closeMenu} />
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
