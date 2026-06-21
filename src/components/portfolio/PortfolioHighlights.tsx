import { Code2, Languages, Layers, Sparkles } from "lucide-react";
import { portfolioHighlights } from "@/lib/portfolio-content";

const highlightIcons = {
  "Technical Skills": Layers,
  "Design & Code": Code2,
  "AI-Powered": Sparkles,
  Language: Languages,
} as const;

export function PortfolioHighlights() {
  return (
    <ul className="v-portfolio-highlights">
      {portfolioHighlights.map((item, index) => {
        const Icon = highlightIcons[item.label];

        return (
          <li
            key={item.label}
            className="v-portfolio-highlights__item"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span className="v-portfolio-highlights__icon" aria-hidden>
              <Icon strokeWidth={2} />
            </span>
            <div className="v-portfolio-highlights__body">
              <span className="v-portfolio-highlights__label">{item.label}</span>
              <p className="v-portfolio-highlights__text">{item.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
