"use client";

import { useCallback } from "react";
import { PortfolioHeroReveal } from "@/components/portfolio/PortfolioHeroReveal";
import { portfolioProfile } from "@/lib/portfolio-content";

export function PortfolioHero() {
  const handleScroll = useCallback(() => {
    const target = document.getElementById("about-bio");

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="v-portfolio-hero">
      <div className="v-portfolio-hero__blobs" aria-hidden>
        <span className="v-portfolio-hero__blob v-portfolio-hero__blob--warm" />
        <span className="v-portfolio-hero__blob v-portfolio-hero__blob--pink" />
        <span className="v-portfolio-hero__blob v-portfolio-hero__blob--cool" />
      </div>

      <div className="v-portfolio-hero__stage">
        <div className="v-portfolio-hero__intro">
          <h1 className="v-portfolio-hero__name">
            {portfolioProfile.heroHeadline.map((line) => (
              <span key={line} className="v-portfolio-hero__name-line">
                {line}
              </span>
            ))}
          </h1>
          <div className="v-portfolio-hero__rule" aria-hidden />
          <ul className="v-portfolio-hero__disciplines">
            {portfolioProfile.heroDisciplines.map((discipline) => (
              <li key={discipline} className="v-portfolio-hero__discipline">
                {discipline}
              </li>
            ))}
          </ul>
        </div>

        <figure className="v-portfolio-hero__visual">
          <PortfolioHeroReveal
            alt={`${portfolioProfile.name} on a mountain overlook with Mount Fuji in the distance`}
          />
        </figure>

        <div className="v-portfolio-hero__aside">
          <button
            type="button"
            className="v-portfolio-hero__scroll"
            onClick={handleScroll}
            aria-label="Scroll to bio"
          >
            <span className="v-portfolio-hero__scroll-label">Scroll</span>
            <span className="v-portfolio-hero__scroll-indicator" aria-hidden>
              <span className="v-portfolio-hero__scroll-line" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
