"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { docsNavigation } from "../docs-nav";

export function DocsSidebar() {
  const [activeId, setActiveId] = useState("introduction");

  useEffect(() => {
    const sectionElements = docsNavigation
      .flatMap((group) => group.items)
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="ds-docs-sidebar">
      <div className="ds-docs-sidebar__inner">
        <Link href="/" className="ds-docs-sidebar__back">
          ← Back to menu
        </Link>

        <div className="ds-docs-sidebar__brand">
          <span className="ds-docs-sidebar__logo">
            Lucky <em>Charm</em>
          </span>
          <span className="ds-docs-sidebar__version">Design System</span>
        </div>

        <nav className="ds-docs-sidebar__nav" aria-label="Documentation">
          {docsNavigation.map((group) => (
            <div key={group.title} className="ds-docs-sidebar__group">
              <p className="ds-docs-sidebar__group-title">{group.title}</p>
              <ul className="ds-docs-sidebar__list">
                {group.items.map((item) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeId === id;

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={[
                          "ds-docs-sidebar__link",
                          isActive && "ds-docs-sidebar__link--active",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-current={isActive ? "location" : undefined}
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
