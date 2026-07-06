import type { Metadata } from "next";
import { ExportDocument, ExportSection } from "@/components/export/ExportDocument";
import {
  portfolioHighlights,
  portfolioProfile,
  portfolioSocialLinks,
  workPlaceholders,
} from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: `${portfolioProfile.name} — Portfolio Summary`,
};

export default function PortfolioSummaryExportPage() {
  return (
    <ExportDocument title="Portfolio Summary" eyebrow={portfolioProfile.title}>
      <div className="v-export__hero">
        <div className="v-export__hero-copy">
          <h2 className="v-export__hero-name">{portfolioProfile.name}</h2>
          <p className="v-export__hero-role">
            {portfolioProfile.heroDisciplines.join(" · ")}
          </p>
          <p className="v-export__prose">{portfolioProfile.bio}</p>
          <p className="v-export__contact">{portfolioProfile.email}</p>
        </div>
        <img
          src={portfolioProfile.heroImage}
          alt={portfolioProfile.name}
          className="v-export__hero-photo"
        />
      </div>

      <ExportSection title="Expertise">
        {portfolioHighlights.map((highlight) => (
          <article key={highlight.label} className="v-export__card">
            <h3 className="v-export__card-title">{highlight.label}</h3>
            <p className="v-export__card-desc">{highlight.text}</p>
            <ul className="v-export__chips" aria-label={highlight.label}>
              {highlight.chips.map((chip) => (
                <li key={chip} className="v-export__chip">
                  {chip}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </ExportSection>

      <ExportSection
        title="Selected Work"
        description="Design projects spanning research, systems, and polished interfaces."
      >
        {workPlaceholders.map((project) => (
          <article key={project.title} className="v-export__card">
            <h3 className="v-export__card-title">{project.title}</h3>
            <p className="v-export__card-meta">
              {project.tag} · {project.year}
              {"roles" in project ? ` · ${project.roles.filter((r) => r !== "・").join(", ")}` : ""}
            </p>
            <p className="v-export__card-desc">{project.description}</p>
          </article>
        ))}
      </ExportSection>

      <ExportSection title="Connect">
        <ul className="v-export__list">
          <li>
            <a href={`mailto:${portfolioProfile.email}`}>{portfolioProfile.email}</a>
          </li>
          {portfolioSocialLinks.map((link) => (
            <li key={link.label}>
              {link.label}: {link.href}
            </li>
          ))}
        </ul>
      </ExportSection>

      <footer className="v-export__footer">
        © {new Date().getFullYear()} {portfolioProfile.name} — Visionary Design System
      </footer>
    </ExportDocument>
  );
}
