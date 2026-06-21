"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { siteHubPath } from "@/lib/navigation";

export function SiteHubNav() {
  return (
    <nav className="v-site-hub-nav" aria-label="Site menu">
      <Link href={siteHubPath} className="v-site-hub-nav__back">
        <ChevronLeft className="v-site-hub-nav__back-icon" aria-hidden strokeWidth={2} />
        Menu
      </Link>
    </nav>
  );
}
