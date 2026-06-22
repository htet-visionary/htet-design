"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const isNavigatingRef = useRef(false);
  const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateToSection = useCallback(
    (id: string, options?: { closeMenu?: boolean }) => {
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      setActiveId(id);
      isNavigatingRef.current = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }

      target.scrollIntoView({ behavior, block: "start" });

      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }

      navigateTimeoutRef.current = setTimeout(
        () => {
          isNavigatingRef.current = false;
        },
        prefersReducedMotion ? 0 : 1000,
      );

      if (options?.closeMenu) {
        setMenuOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    const sectionIds = portfolioNavItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const getScrollOffset = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--v-portfolio-scroll-offset")
        .trim();
      const parsed = Number.parseFloat(value);

      return Number.isFinite(parsed) ? parsed : 96;
    };

    const syncActiveSection = () => {
      if (isNavigatingRef.current) {
        return;
      }

      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;

      if (scrollBottom >= pageBottom - 4) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const marker = window.scrollY + getScrollOffset();
      let current = sections[0].id;

      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;

        if (top <= marker) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    const syncActiveFromHash = () => {
      const hash = window.location.hash.slice(1);

      if (hash && sectionIds.includes(hash as (typeof sectionIds)[number])) {
        setActiveId(hash);
      } else {
        syncActiveSection();
      }
    };

    syncActiveFromHash();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("hashchange", syncActiveFromHash);
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("hashchange", syncActiveFromHash);
      window.removeEventListener("resize", syncActiveSection);

      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
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

  const handleSectionNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    options?: { closeMenu?: boolean },
  ) => {
    event.preventDefault();
    navigateToSection(id, options);
  };

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
                aria-current={activeId === item.id ? "page" : undefined}
                onClick={(event) => handleSectionNavClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="v-cmp-btn v-cmp-btn--primary-green v-cmp-btn--md v-portfolio-action-btn v-portfolio-topbar__cv"
            onClick={(event) => handleSectionNavClick(event, "contact")}
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
                  aria-current={activeId === item.id ? "page" : undefined}
                  onClick={(event) =>
                    handleSectionNavClick(event, item.id, { closeMenu: true })
                  }
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
