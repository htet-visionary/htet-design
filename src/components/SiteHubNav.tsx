"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { designSystemBase, siteMenuItems } from "@/lib/navigation";

function isSiteSectionActive(pathname: string, href: string) {
  if (href === designSystemBase) {
    return pathname === designSystemBase || pathname.startsWith(`${designSystemBase}/`);
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHubNav() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="v-site-hub-nav" aria-label="Site sections">
      <Link href="/" className="v-site-hub-nav__back">
        <ChevronLeft className="v-site-hub-nav__back-icon" aria-hidden strokeWidth={2} />
        Menu
      </Link>

      <ul className="v-site-hub-nav__list">
        {siteMenuItems.map((item) => {
          const active = isSiteSectionActive(pathname, item.href);
          const label = item.shortTitle ?? item.title;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={["v-site-hub-nav__link", active && "v-site-hub-nav__link--active"]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
