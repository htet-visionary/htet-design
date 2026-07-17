import { portfolioPhilosophy } from "@/lib/portfolio-content";

export function PortfolioPhilosophy() {
  const [lead, ...rest] = portfolioPhilosophy.paragraphs;

  return (
    <div className="v-portfolio-philosophy" id="philosophy">
      <header className="v-portfolio-section-head" data-reveal>
        <span className="v-portfolio-section-head__index" aria-hidden>
          00
        </span>
        <div className="v-portfolio-section-head__content">
          <p className="v-portfolio-section-head__eyebrow">Philosophy</p>
          <h2 className="v-portfolio-section-head__title">{portfolioPhilosophy.title}</h2>
        </div>
      </header>

      <div className="v-portfolio-philosophy__body" data-reveal>
        <p className="v-portfolio-philosophy__lead">{lead}</p>
        <div className="v-portfolio-philosophy__rest">
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="v-portfolio-philosophy__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
