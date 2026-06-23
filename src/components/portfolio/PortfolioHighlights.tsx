import { Layers, PenLine, type LucideIcon } from "lucide-react";
import { CursorIcon } from "@/components/portfolio/CursorIcon";
import { portfolioHighlights } from "@/lib/portfolio-content";

type HighlightIcon = LucideIcon | typeof CursorIcon;

const highlightIcons: Record<(typeof portfolioHighlights)[number]["label"], HighlightIcon> = {
  "Product Design": PenLine,
  "Design System & Frontend": Layers,
  "AI-powered Workflow": CursorIcon,
};

export function PortfolioHighlights() {
  return (
    <ul className="v-portfolio-highlights">
      {portfolioHighlights.map((item, index) => {
        const Icon = highlightIcons[item.label];
        const isCursorIcon = Icon === CursorIcon;

        return (
          <li
            key={item.label}
            className="v-portfolio-highlights__item"
            data-reveal
            data-reveal-delay={String(120 + index * 70)}
          >
            <span className="v-portfolio-highlights__icon" aria-hidden>
              {isCursorIcon ? (
                <CursorIcon />
              ) : (
                <Icon strokeWidth={1.75} />
              )}
            </span>
            <div className="v-portfolio-highlights__body">
              <h3 className="v-portfolio-highlights__title">{item.label}</h3>
              <p className="v-portfolio-highlights__text">{item.text}</p>
              <ul className="v-portfolio-highlights__chips" aria-label={`${item.label} skills`}>
                {item.chips.map((chip) => (
                  <li key={chip}>
                    <span className="v-cmp-chip">{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
