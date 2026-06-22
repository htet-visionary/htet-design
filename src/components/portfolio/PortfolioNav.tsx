"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Menu, X } from "lucide-react";
import { SiteHubNav } from "@/components/SiteHubNav";
import { siteHubPath } from "@/lib/navigation";
import {
  portfolioNavItems,
  portfolioProfile,
} from "@/lib/portfolio-content";

const MOBILE_NAV_QUERY = "(max-width: 639px)";

export function PortfolioNav() {
  const [activeId, setActiveId] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = portfolioNavItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_NAV_QUERY);
    const syncMobileNav = () => {
      setIsMobileNav(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    syncMobileNav();
    mediaQuery.addEventListener("change", syncMobileNav);
    return () => mediaQuery.removeEventListener("change", syncMobileNav);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--v-portfolio-topbar-height",
        `${header.offsetHeight}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--v-portfolio-topbar-height");
    };
  }, [menuOpen]);

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
    <>
      <header
        ref={headerRef}
        className={["v-portfolio-topbar", menuOpen && "v-portfolio-topbar--menu-open"]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="v-portfolio-topbar__inner">
          <div className="v-portfolio-topbar__mobile-nav">
            <button
              type="button"
              className="v-shell__menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="v-portfolio-drawer"
              aria-label={menuOpen ? "Close section menu" : "Open section menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="v-shell__menu-toggle-icon" aria-hidden strokeWidth={2} />
              ) : (
                <Menu className="v-shell__menu-toggle-icon" aria-hidden strokeWidth={2} />
              )}
              <span className="v-shell__menu-toggle-label">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
            </button>
          </div>

          <p className="v-shell__mobile-title v-portfolio-topbar__title">Portfolio</p>

          <Link href={siteHubPath} className="v-site-hub-nav__back v-portfolio-topbar__hub">
            <ChevronLeft className="v-site-hub-nav__back-icon" aria-hidden strokeWidth={2} />
            Menu
          </Link>

          <nav
            className="v-cmp-tabs v-portfolio-nav v-portfolio-nav--desktop"
            aria-label="Portfolio sections"
          >
            {portfolioNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={[
                  "v-cmp-tabs__tab",
                  activeId === item.id ? "v-cmp-tabs__tab--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="v-cmp-btn v-cmp-btn--primary-green v-cmp-btn--md v-portfolio-action-btn v-portfolio-topbar__cv"
          >
            Let&apos;s Connect
          </a>
        </div>
      </header>

      {menuOpen && isMobileNav && (
        <button
          type="button"
          className="v-portfolio-topbar__overlay"
          aria-label="Close section menu"
          onClick={closeMenu}
        />
      )}

      <aside
        id="v-portfolio-drawer"
        className="v-portfolio-drawer"
        aria-label="Portfolio sections"
        aria-hidden={isMobileNav && !menuOpen ? true : undefined}
        inert={isMobileNav && !menuOpen ? true : undefined}
      >
        <SiteHubNav />

        <div className="v-portfolio-drawer__brand">
          <p className="v-portfolio-drawer__name">{portfolioProfile.name}</p>
          <p className="v-portfolio-drawer__role">{portfolioProfile.title}</p>
        </div>

        <nav className="v-portfolio-drawer__nav">
          <ul className="v-shell__list">
            {portfolioNavItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className={[
                    "v-shell__link",
                    activeId === item.id ? "v-shell__link--active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={activeId === item.id ? "true" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
