import { portfolioHighlights } from "@/lib/portfolio-content";

export function PortfolioHighlights() {
  return (
    <ul className="v-portfolio-highlights">
      {portfolioHighlights.map((item, index) => (
        <li
          key={item.label}
          className="v-portfolio-highlights__item"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <span className="v-portfolio-highlights__index" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="v-portfolio-highlights__body">
            <span className="v-portfolio-highlights__label">{item.label}</span>
            <p className="v-portfolio-highlights__text">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
