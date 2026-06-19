import Link from "next/link";
import { siteMenuItems } from "@/lib/navigation";

export default function HomePage() {
  const [leftColumn, rightColumn] = [
    siteMenuItems.slice(0, 2),
    siteMenuItems.slice(2, 4),
  ];

  return (
    <main className="v-hub">
      <nav className="v-hub__grid" aria-label="Site menu">
        <ul className="v-hub__column">
          {leftColumn.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="v-hub__link">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="v-hub__divider" aria-hidden />
        <ul className="v-hub__column">
          {rightColumn.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="v-hub__link">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
