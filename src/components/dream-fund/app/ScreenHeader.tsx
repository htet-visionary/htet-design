import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function ScreenHeader({
  title,
  backHref,
  action,
}: {
  title: string;
  backHref: string;
  action?: ReactNode;
}) {
  return (
    <header className="v-dream-fund-app__screen-header">
      <Link href={backHref} className="v-dream-fund-app__screen-back">
        <ChevronLeft strokeWidth={2} aria-hidden />
        <span>Back</span>
      </Link>
      <h1 className="v-dream-fund-app__screen-title">{title}</h1>
      {action ? <div className="v-dream-fund-app__screen-action">{action}</div> : null}
    </header>
  );
}
