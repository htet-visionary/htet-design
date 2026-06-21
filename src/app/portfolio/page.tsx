import type { Metadata } from "next";
import Image from "next/image";
import { ImageIcon, Mail } from "lucide-react";
import { PortfolioHighlights } from "@/components/portfolio/PortfolioHighlights";
import { PortfolioNav } from "@/components/portfolio/PortfolioNav";
import {
  galleryPlaceholders,
  portfolioProfile,
  skillCategories,
  workPlaceholders,
} from "@/lib/portfolio-content";
import "./portfolio.css";

export const metadata: Metadata = {
  title: `${portfolioProfile.name} — ${portfolioProfile.title}`,
  description: portfolioProfile.bio,
};

export default function PortfolioPage() {
  return (
    <div className="v-portfolio">
      <PortfolioNav />

      <main className="v-portfolio-main">
        <section id="about" className="v-portfolio-section v-portfolio-about">
          <div className="v-portfolio-section__inner">
            <div className="v-portfolio-hero">
              <div className="v-portfolio-hero__visual">
                <div className="v-portfolio-hero__frame">
                  <span className="v-portfolio-hero__frame-cap" aria-hidden />
                  <Image
                    src={portfolioProfile.heroImage}
                    alt={`${portfolioProfile.name} outdoors on a green hillside`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="v-portfolio-hero__image"
                  />
                </div>
              </div>

              <div className="v-portfolio-hero__content">
                <div className="v-portfolio-hero__intro">
                  <h1 className="v-portfolio-hero__name">{portfolioProfile.name}</h1>
                  <p className="v-portfolio-hero__title">{portfolioProfile.title}</p>
                </div>
                <p className="v-portfolio-hero__bio">{portfolioProfile.bio}</p>

                <PortfolioHighlights />
              </div>
            </div>

            <div className="v-portfolio-skills">
              {skillCategories.map((category, index) => (
                <article
                  key={category.title}
                  className={[
                    "v-portfolio-skills__group",
                    `v-portfolio-skills__group--${index + 1}`,
                  ].join(" ")}
                >
                  <h3 className="v-portfolio-skills__title">{category.title}</h3>
                  <ul className="v-portfolio-skills__list">
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
        </section>

        <section id="work" className="v-portfolio-section v-portfolio-section--work">
          <div className="v-portfolio-section__inner">
            <header className="v-portfolio-section__header">
              <p className="v-portfolio-section__eyebrow">Selected work</p>
              <h2 className="v-portfolio-section__title">Work</h2>
              <p className="v-portfolio-section__desc">
                Product design projects spanning research, systems, and polished interfaces.
              </p>
            </header>

            <ul className="v-portfolio-work-grid">
              {workPlaceholders.map((project, index) => (
                <li key={project.title}>
                  <article className="v-cmp-card v-portfolio-work-card">
                    <div
                      className={[
                        "v-portfolio-work-card__thumb",
                        `v-portfolio-work-card__thumb--${(index % 3) + 1}`,
                      ].join(" ")}
                      aria-hidden
                    />
                    <div className="v-portfolio-work-card__body">
                      <span className="v-cmp-tag v-portfolio-work-card__tag">{project.tag}</span>
                      <h3 className="v-portfolio-work-card__title">{project.title}</h3>
                      <p className="v-portfolio-work-card__desc">{project.description}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="beyond-work" className="v-portfolio-section v-portfolio-section--gallery">
          <div className="v-portfolio-section__inner">
            <header className="v-portfolio-section__header">
              <p className="v-portfolio-section__eyebrow">Life beyond the screen</p>
              <h2 className="v-portfolio-section__title">Beyond Work Activities</h2>
              <p className="v-portfolio-section__desc">
                Travel, nature, family time, and my toy collection — moments that keep creativity
                grounded.
              </p>
            </header>

            <ul className="v-portfolio-gallery" aria-label="Photo gallery">
              {galleryPlaceholders.map((item, index) => (
                <li
                  key={item.id}
                  className={[
                    "v-portfolio-gallery__item",
                    item.aspect === "tall" ? "v-portfolio-gallery__item--tall" : "",
                    item.aspect === "wide" ? "v-portfolio-gallery__item--wide" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="v-portfolio-gallery__placeholder">
                    <ImageIcon className="v-portfolio-gallery__icon" strokeWidth={1.5} aria-hidden />
                    <span className="v-portfolio-gallery__label">Photo {index + 1}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="v-portfolio-section v-portfolio-contact">
          <div className="v-portfolio-section__inner">
            <header className="v-portfolio-section__header v-portfolio-section__header--compact">
              <p className="v-portfolio-section__eyebrow">Let&apos;s connect</p>
              <h2 className="v-portfolio-section__title">Contact</h2>
            </header>

            <div className="v-portfolio-contact__panel">
              <p className="v-portfolio-contact__message">
                Drop me a message. Let&apos;s share ideas &amp; discuss ways to collaborate!
              </p>

              <div className="v-portfolio-contact__actions">
                <div className="v-portfolio-contact__email-group">
                  <span className="v-portfolio-contact__label">Get in touch at</span>
                  <a
                    href={`mailto:${portfolioProfile.email}`}
                    className="v-portfolio-contact__email"
                  >
                    {portfolioProfile.email}
                  </a>
                </div>
                <a
                  href={`mailto:${portfolioProfile.email}`}
                  className="v-cmp-btn v-cmp-btn--primary-green v-cmp-btn--md v-portfolio-contact__cta"
                >
                  <span className="v-cmp-btn__icon" aria-hidden>
                    <Mail strokeWidth={2} />
                  </span>
                  Send a message
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="v-portfolio-footer">
        <p className="v-portfolio-footer__text">
          © {new Date().getFullYear()} {portfolioProfile.name}. Crafted with the Visionary design
          system.
        </p>
      </footer>
    </div>
  );
}
