import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { DreamFundMockupGallery } from "@/components/dream-fund/DreamFundMockupGallery";
import { PortfolioScrollReveal } from "@/components/portfolio/PortfolioScrollReveal";
import { SectionBlock } from "@/components/visionary/DocParts";
import {
  dreamFundV1CaseStudyMeta,
  dreamFundV1Mockups,
  dreamFundV1Persona,
  dreamFundV1Problem,
  dreamFundV1ProductIdea,
  dreamFundV1UserFlow,
  dreamFundV1Tools,
  dreamFundV1UxPrinciples,
} from "@/lib/dream-fund-v1-case-study";
import { designSystemBase } from "@/lib/navigation";
import "../portfolio/portfolio.css";
import "./dream-fund.css";

export const metadata: Metadata = {
  title: `${dreamFundV1CaseStudyMeta.title} — Case Study`,
  description: dreamFundV1CaseStudyMeta.description,
};

export default function DreamFundCaseStudyPage() {
  return (
    <div className="v-dream-fund-case v-theme-dream-fund">
      <header className="v-portfolio-topbar v-dream-fund-case__topbar">
        <div className="v-portfolio-topbar__inner">
          <Link
            href="/portfolio#work"
            className="v-site-hub-nav__back v-portfolio-topbar__hub"
          >
            <ChevronLeft className="v-site-hub-nav__back-icon" aria-hidden strokeWidth={2} />
            Back
          </Link>
        </div>
      </header>

      <PortfolioScrollReveal>
        <main className="v-portfolio-main v-dream-fund-case__main">
          <header className="v-dream-fund-case__hero">
            <div className="v-dream-fund-case__hero-stage">
              <div className="v-dream-fund-case__hero-copy" data-reveal>
                <p className="v-dream-fund-case__hero-eyebrow">{dreamFundV1CaseStudyMeta.eyebrow}</p>
                <h1 className="v-dream-fund-case__hero-title">
                  <span className="v-dream-fund-case__hero-title-dream">Dream </span>
                  <span className="v-dream-fund-case__hero-title-fund">Fund</span>
                </h1>
                <p className="v-dream-fund-case__hero-desc">{dreamFundV1CaseStudyMeta.description}</p>

                <ul className="v-dream-fund-case__hero-meta" aria-label="Project details">
                  <li className="v-dream-fund-case__hero-meta-item">{dreamFundV1CaseStudyMeta.year}</li>
                  {dreamFundV1CaseStudyMeta.roles.map((role) => (
                    <li key={role} className="v-dream-fund-case__hero-meta-item">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <figure className="v-dream-fund-case__hero-visual" data-reveal data-reveal-delay="80">
                <img
                  src={dreamFundV1CaseStudyMeta.heroImage}
                  alt={dreamFundV1CaseStudyMeta.heroImageAlt}
                  className="v-dream-fund-case__hero-image"
                />
              </figure>
            </div>
          </header>

          <div className="v-portfolio-section__inner">
            <article className="v-doc">
              <div className="v-doc__body">
                <SectionBlock title={dreamFundV1Problem.title} reveal revealDelay={160}>
                {dreamFundV1Problem.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="v-dream-fund-case__prose">
                    {paragraph}
                  </p>
                ))}
                <ul className="v-dream-fund-case__bullet-list">
                  {dreamFundV1Problem.pains.map((pain) => (
                    <li key={pain}>{pain}</li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title={dreamFundV1ProductIdea.title} reveal revealDelay={240}>
                {dreamFundV1ProductIdea.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="v-dream-fund-case__prose">
                    {paragraph}
                  </p>
                ))}
                <p className="v-dream-fund-case__prose v-dream-fund-case__prose--lead">
                  {dreamFundV1ProductIdea.outcome}
                </p>
              </SectionBlock>

              <SectionBlock
                title="User Persona"
                reveal
                revealDelay={320}
                // description="Who we designed for."
              >
                <div className="v-dream-fund-case__persona">
                  <div className="v-dream-fund-case__persona-head">
                    <p className="v-dream-fund-case__persona-name">{dreamFundV1Persona.name}</p>
                    <p className="v-dream-fund-case__persona-title">{dreamFundV1Persona.title}</p>
                  </div>
                  <dl className="v-dream-fund-case__persona-facts">
                    <div>
                      <dt>Age</dt>
                      <dd>{dreamFundV1Persona.age}</dd>
                    </div>
                    <div>
                      <dt>Role</dt>
                      <dd>{dreamFundV1Persona.role}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{dreamFundV1Persona.location}</dd>
                    </div>
                    <div>
                      <dt>Income</dt>
                      <dd>{dreamFundV1Persona.income}</dd>
                    </div>
                  </dl>
                  <p className="v-dream-fund-case__prose">{dreamFundV1Persona.summary}</p>
                  <blockquote className="v-dream-fund-case__quote">
                    <p>“{dreamFundV1Persona.quote}”</p>
                  </blockquote>
                </div>
              </SectionBlock>

              <SectionBlock
                title={dreamFundV1UserFlow.title}
                description={dreamFundV1UserFlow.description}
                reveal
                revealDelay={400}
              >
                <figure className="v-dream-fund-case__flow-figure">
                  <img
                    src="/dream-fund/user-flow.png"
                    alt="Dream Fund user flow: onboarding, capture dream, home, add fuel, smart split, dreams, insights, and dream detail"
                    className="v-dream-fund-case__flow-image"
                  />
                </figure>
              </SectionBlock>

              <SectionBlock title="UX principles" reveal revealDelay={480}>
                <ul className="v-dream-fund-case__feature-list">
                  {dreamFundV1UxPrinciples.map((principle) => (
                    <li key={principle.title} className="v-dream-fund-case__feature">
                      <h3 className="v-dream-fund-case__feature-title">{principle.title}</h3>
                      <p className="v-dream-fund-case__feature-desc">{principle.description}</p>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock
                title="High-Fidelity Mockups"
                description="Key screens from the v1 prototype — onboarding, dream capture, fuel, allocation, and insights."
                reveal
                revealDelay={560}
              />
            </div>
          </article>
        </div>

        <DreamFundMockupGallery items={dreamFundV1Mockups}/>

          <div className="v-portfolio-section__inner">
            <article className="v-doc">
              <div className="v-doc__body v-dream-fund-case__body-tail">
                <SectionBlock title="Tools & Technologies Used" reveal revealDelay={160}>
                <ul className="v-dream-fund-case__tools-list">
                  {dreamFundV1Tools.map((group) => (
                    <li key={group.category} className="v-dream-fund-case__tools-group">
                      <h3 className="v-dream-fund-case__tools-category">{group.category}</h3>
                      <ul className="v-dream-fund-case__tools-tags" aria-label={group.category}>
                        {group.tools.map((tool) => (
                          <li key={tool} className="v-dream-fund-case__tools-tag">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </SectionBlock>
            </div>
          </article>
        </div>
      </main>

        <footer className="v-dream-fund-case__footer" data-reveal>
          <Link
            href={designSystemBase}
            className="v-dream-fund-case__footer-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Design System in a new tab"
          >
            Design System
            <ArrowUpRight className="v-dream-fund-case__footer-link-icon" aria-hidden strokeWidth={2} />
          </Link>
        </footer>
      </PortfolioScrollReveal>
    </div>
  );
}
