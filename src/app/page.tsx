import Link from "next/link";
import { siteMenuItems } from "@/lib/navigation";
import { NavIcon, siteMenuIcons } from "@/lib/nav-icons";

export default function HomePage() {
  return (
    <main className="v-hub">
      <nav className="v-hub__grid" aria-label="Site menu">
        {siteMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="v-hub__card"
            {...(item.openInNewTab
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <NavIcon href={item.href} map={siteMenuIcons} className="v-hub__icon" />
            <span className="v-hub__label">{item.title}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
