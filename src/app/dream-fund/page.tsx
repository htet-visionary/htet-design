import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ImageIcon } from "lucide-react";
import { SectionBlock } from "@/components/visionary/DocParts";
import {
  dreamFundV1CaseStudyMeta,
  dreamFundV1CoreFeatures,
  dreamFundV1HifiPlaceholder,
  dreamFundV1Persona,
  dreamFundV1Problem,
  dreamFundV1ProductIdea,
  dreamFundV1UserStories,
  dreamFundV1UxPrinciples,
} from "@/lib/dream-fund-v1-case-study";
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

      <main className="v-portfolio-main v-dream-fund-case__main">
        <div className="v-portfolio-section__inner">
          <article className="v-doc">
            <p className="v-doc__eyebrow">{dreamFundV1CaseStudyMeta.eyebrow}</p>
            <h1 className="v-doc__title">{dreamFundV1CaseStudyMeta.title}</h1>
            <p className="v-doc__desc">{dreamFundV1CaseStudyMeta.description}</p>

            <ul className="v-dream-fund-case__meta" aria-label="Project details">
              <li className="v-dream-fund-case__meta-item">{dreamFundV1CaseStudyMeta.year}</li>
              {dreamFundV1CaseStudyMeta.roles.map((role) => (
                <li key={role} className="v-dream-fund-case__meta-item">
                  {role}
                </li>
              ))}
            </ul>

            <div className="v-dream-fund-case__cta">
              <Link
                href="/dream-fund-v1"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              >
                <span className="v-cmp-btn__label">Open Dream Fund Prototype</span>
              </Link>
            </div>

            <div className="v-doc__body">
              <SectionBlock title={dreamFundV1Problem.title}>
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

              <SectionBlock title={dreamFundV1ProductIdea.title}>
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
                title="User persona"
                description="A simple snapshot of who we designed for."
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

              <SectionBlock title="User stories" description="Key jobs Jennie needs Dream Fund to support.">
                <ol className="v-dream-fund-case__story-list">
                  {dreamFundV1UserStories.map((story) => (
                    <li key={story.id} className="v-dream-fund-case__story">
                      <span className="v-dream-fund-case__story-id" aria-hidden>
                        {story.id}
                      </span>
                      <p className="v-dream-fund-case__story-text">
                        <strong>As Jennie,</strong> I want to {story.want}, so {story.benefit}
                      </p>
                    </li>
                  ))}
                </ol>
              </SectionBlock>

              <SectionBlock title="UX principles">
                <ul className="v-dream-fund-case__feature-list">
                  {dreamFundV1UxPrinciples.map((principle) => (
                    <li key={principle.title} className="v-dream-fund-case__feature">
                      <h3 className="v-dream-fund-case__feature-title">{principle.title}</h3>
                      <p className="v-dream-fund-case__feature-desc">{principle.description}</p>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title="Core features" description="What the v1 prototype delivers today.">
                <ul className="v-dream-fund-case__feature-list">
                  {dreamFundV1CoreFeatures.map((feature) => (
                    <li key={feature.title} className="v-dream-fund-case__feature">
                      <h3 className="v-dream-fund-case__feature-title">{feature.title}</h3>
                      <p className="v-dream-fund-case__feature-desc">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock
                title={dreamFundV1HifiPlaceholder.title}
                description={dreamFundV1HifiPlaceholder.description}
              >
                <div className="v-cmp-empty v-dream-fund-case__hifi-placeholder">
                  <div className="v-cmp-empty__icon" aria-hidden>
                    <ImageIcon strokeWidth={2} />
                  </div>
                  <p className="v-cmp-empty__title">Hi-fi screens coming next</p>
                  <p className="v-cmp-empty__body">
                    Mockups for home, dream garden, smart split, and onboarding will be added in
                    the next iteration of this case study.
                  </p>
                </div>
              </SectionBlock>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
