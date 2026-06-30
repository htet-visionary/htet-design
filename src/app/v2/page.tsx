import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DreamFundV2Page() {
  return (
    <div className="v-dream-fund-v2">
      <header className="v-dream-fund-v2__header">
        <Link href="/dream-fund" className="v-dream-fund-v2__back">
          <ChevronLeft aria-hidden strokeWidth={2} size={16} />
          Case study
        </Link>
        <span className="v-dream-fund-v2__badge">v2 prototype</span>
      </header>

      <main className="v-dream-fund-v2__main">
        <span className="v-dream-fund-v2__clover" aria-hidden>
          🍀
        </span>
        <h1 className="v-dream-fund-v2__title">Dream Fund v2</h1>
        <p className="v-dream-fund-v2__desc">
          Screens coming soon. A stress-free, psychology-based smart allocation and dream
          tracking experience with the Lucky 4-Leaf Clover theme.
        </p>
      </main>
    </div>
  );
}
