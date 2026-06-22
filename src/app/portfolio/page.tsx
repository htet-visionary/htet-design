import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioHighlights } from "@/components/portfolio/PortfolioHighlights";
import { PortfolioNav } from "@/components/portfolio/PortfolioNav";
import { PortfolioSocialLinks } from "@/components/portfolio/PortfolioSocialLinks";
import {
  activitiesIntro,
  portfolioGallery,
  portfolioProfile,
  skillCategories,
  workPlaceholders,
} from "@/lib/portfolio-content";
import "./portfolio.css";

export const metadata: Metadata = {
  title: `${portfolioProfile.name} — ${portfolioProfile.title}`,
  description: portfolioProfile.bio,
};

function PortfolioSectionHead({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="v-portfolio-section-head">
      <span className="v-portfolio-section-head__index" aria-hidden>
        {index}
      </span>
      <div className="v-portfolio-section-head__content">
        <p className="v-portfolio-section-head__eyebrow">{eyebrow}</p>
        <h2 className="v-portfolio-section-head__title">{title}</h2>
        {description ? (
          <p className="v-portfolio-section-head__desc">{description}</p>
        ) : null}
      </div>
    </header>
  );
}

export default function PortfolioPage() {
  return (
    <div className="v-portfolio">
      <PortfolioNav />

      <main className="v-portfolio-main">
        <section id="about" className="v-portfolio-section v-portfolio-about">
          <PortfolioHero />

          <div className="v-portfolio-section__inner">
            <p className="v-portfolio-about__bio" id="about-bio">
              {portfolioProfile.bio}
            </p>

            <div className="v-portfolio-highlights-panel">
              <p className="v-portfolio-highlights-panel__label">At a glance</p>
              <PortfolioHighlights />
            </div>

            <div className="v-portfolio-capabilities">
              <p className="v-portfolio-capabilities__label">Capabilities</p>
              <div className="v-portfolio-capabilities__grid">
                {skillCategories.map((category) => (
                  <article key={category.title} className="v-portfolio-capabilities__group">
                    <h3 className="v-portfolio-capabilities__title">{category.title}</h3>
                    <ul className="v-portfolio-capabilities__list">
                      {category.items.map((skill) => (
                        <li key={skill}>
                          <span className="v-cmp-chip">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="v-portfolio-section v-portfolio-work">
          <div className="v-portfolio-section__inner">
            <PortfolioSectionHead
              index="02"
              eyebrow="Selected work"
              title="Work"
              description="Product design projects spanning research, systems, and polished interfaces."
            />

            <ul className="v-portfolio-work-list">
              {workPlaceholders.map((project, index) => (
                <li key={project.title} className="v-portfolio-work-list__item">
                  <article className="v-portfolio-work-list__card">
                    <div
                      className={[
                        "v-portfolio-work-list__thumb",
                        `v-portfolio-work-list__thumb--${(index % 3) + 1}`,
                      ].join(" ")}
                      aria-hidden
                    />
                    <div className="v-portfolio-work-list__body">
                      <div className="v-portfolio-work-list__meta">
                        <span className="v-cmp-tag">{project.tag}</span>
                        <span className="v-portfolio-work-list__year">{project.year}</span>
                      </div>
                      <h3 className="v-portfolio-work-list__title">{project.title}</h3>
                      <p className="v-portfolio-work-list__desc">{project.description}</p>
                      <ul className="v-portfolio-work-list__roles">
                        {project.roles.map((role) => (
                          <li key={role}>{role}</li>
                        ))}
                      </ul>
                      <span className="v-portfolio-work-list__link">
                        View project
                        <ArrowUpRight strokeWidth={2} aria-hidden />
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="beyond-work" className="v-portfolio-section v-portfolio-activities">
          <div className="v-portfolio-section__inner">
            <PortfolioSectionHead
              index="03"
              eyebrow="Life beyond the screen"
              title="Activities"
              description={activitiesIntro}
            />

            <PortfolioGallery items={portfolioGallery} intro={activitiesIntro} />
          </div>
        </section>

        <section id="contact" className="v-portfolio-section v-portfolio-contact">
          <div className="v-portfolio-section__inner">
            <PortfolioSectionHead
              index="04"
              eyebrow="Let's connect"
              title="Contact"
              description="Drop me a message. Let's share ideas & discuss ways to collaborate."
            />

            <ul className="v-portfolio-contact-list">
              <li className="v-portfolio-contact-list__item">
                <article className="v-portfolio-contact-list__row">
                  <div className="v-portfolio-contact-list__email-group">
                    <p className="v-portfolio-contact-list__label">Get in touch at</p>
                    <div className="v-portfolio-contact-list__email-actions">
                      <a
                        href={`mailto:${portfolioProfile.email}`}
                        className="v-portfolio-contact-list__email"
                      >
                        {portfolioProfile.email}
                      </a>
                    </div>
                  </div>

                  <div className="v-portfolio-contact-list__social-group">
                    <PortfolioSocialLinks />
                  </div>
                </article>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="v-portfolio-footer">
        <div className="v-portfolio-section__inner">
          <p className="v-portfolio-footer__text">
            © {new Date().getFullYear()} {portfolioProfile.name}. Crafted with the Visionary design
            system.
          </p>
        </div>
      </footer>
    </div>
  );
}
