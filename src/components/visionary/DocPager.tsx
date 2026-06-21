"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getNavNeighbors } from "@/lib/navigation";

export function DocPager() {
  const pathname = usePathname();
  const { previous, next } = getNavNeighbors(pathname);

  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="v-doc-pager" aria-label="Documentation pages">
      {previous ? (
        <Link href={previous.href} className="v-doc-pager__link v-doc-pager__link--prev">
          <ChevronLeft className="v-doc-pager__icon" aria-hidden strokeWidth={2} />
          <span className="v-doc-pager__text">
            <span className="v-doc-pager__label">Previous</span>
            <span className="v-doc-pager__title">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span className="v-doc-pager__spacer" aria-hidden />
      )}

      {next ? (
        <Link href={next.href} className="v-doc-pager__link v-doc-pager__link--next">
          <span className="v-doc-pager__text">
            <span className="v-doc-pager__label">Next</span>
            <span className="v-doc-pager__title">{next.title}</span>
          </span>
          <ChevronRight className="v-doc-pager__icon" aria-hidden strokeWidth={2} />
        </Link>
      ) : (
        <span className="v-doc-pager__spacer" aria-hidden />
      )}
    </nav>
  );
}
