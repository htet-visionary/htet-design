import Link from "next/link";
import { siteMenuItems } from "@/lib/navigation";
import { NavIcon, siteMenuIcons } from "@/lib/nav-icons";

const gridItems = [
  siteMenuItems[0],
  siteMenuItems[2],
  siteMenuItems[1],
  siteMenuItems[3],
];

export default function HomePage() {
  return (
    <main className="v-hub">
      <nav className="v-hub__grid" aria-label="Site menu">
        {gridItems.map((item) => (
          <Link key={item.href} href={item.href} className="v-hub__card">
            <NavIcon href={item.href} map={siteMenuIcons} className="v-hub__icon" />
            <span className="v-hub__label">{item.title}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
