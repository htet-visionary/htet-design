import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Play } from "lucide-react";
import { CaseStudyMockup } from "@/components/dream-fund/CaseStudyMockup";
import { RuleList, SectionBlock } from "@/components/visionary/DocParts";
import {
  dreamFundCaseStudyMeta,
  dreamFundCoreExperience,
  dreamFundCoreFeatures,
  dreamFundCoreNavigation,
  dreamFundFlows,
  dreamFundHomeScreen,
  dreamFundInformationArchitecture,
  dreamFundMockups,
  dreamFundMvpScope,
  dreamFundPersona,
  dreamFundProcess,
  dreamFundUserStories,
  dreamFundUxPrinciples,
} from "@/lib/dream-fund-case-study";
import "../portfolio/portfolio.css";
import "./dream-fund.css";

export const metadata: Metadata = {
  title: `${dreamFundCaseStudyMeta.title} — Case Study`,
  description: dreamFundCaseStudyMeta.description,
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
            <p className="v-doc__eyebrow">{dreamFundCaseStudyMeta.eyebrow}</p>
            <h1 className="v-doc__title">{dreamFundCaseStudyMeta.title}</h1>
            <p className="v-doc__desc">{dreamFundCaseStudyMeta.description}</p>

            <ul className="v-dream-fund-case__meta" aria-label="Project details">
              <li className="v-dream-fund-case__meta-item">{dreamFundCaseStudyMeta.year}</li>
              {dreamFundCaseStudyMeta.roles.map((role) => (
                <li key={role} className="v-dream-fund-case__meta-item">
                  {role}
                </li>
              ))}
            </ul>

            <div className="v-dream-fund-case__cta">
              <Link
                href="/dream-fund-v0"
                className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
              >
                <span className="v-cmp-btn__label">Open Dream Fund Prototype</span>
              </Link>
            </div>

            <div className="v-doc__body">
              <SectionBlock
                title="User persona"
                description={`${dreamFundPersona.name} — ${dreamFundPersona.title}`}
              >
                <div className="v-table-wrap">
                  <table className="v-table">
                    <tbody>
                      {dreamFundPersona.basics.map((row) => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {dreamFundPersona.about.map((paragraph) => (
                  <p key={paragraph} className="v-dream-fund-case__prose">
                    {paragraph}
                  </p>
                ))}

                <h3 className="v-dream-fund-case__subheading">Goals</h3>
                <RuleList rules={[...dreamFundPersona.goals]} />

                <h3 className="v-dream-fund-case__subheading">Frustrations</h3>
                <RuleList rules={[...dreamFundPersona.frustrations]} />

                <h3 className="v-dream-fund-case__subheading">Needs</h3>
                <p className="v-dream-fund-case__prose">
                  Jennie needs a financial companion that helps her:
                </p>
                <RuleList rules={[...dreamFundPersona.needs]} />

                <blockquote className="v-dream-fund-case__quote">
                  <p>“{dreamFundPersona.quote}”</p>
                </blockquote>
              </SectionBlock>

              <SectionBlock
                title="Core experience"
                description="How money moves from income to confident dream achievement."
              >
                <pre className="v-dream-fund-case__diagram" aria-label="Core experience flow">
                  {dreamFundCoreExperience}
                </pre>
              </SectionBlock>

              <SectionBlock title="User stories">
                <ol className="v-dream-fund-case__story-list">
                  {dreamFundUserStories.map((story) => (
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

              <SectionBlock title="Information architecture">
                <pre
                  className="v-dream-fund-case__diagram"
                  aria-label="Information architecture"
                >
                  {dreamFundInformationArchitecture}
                </pre>

                <h3 className="v-dream-fund-case__subheading">Core navigation</h3>
                <ul className="v-dream-fund-case__nav-pills" aria-label="Core navigation">
                  {dreamFundCoreNavigation.map((item) => (
                    <li key={item.label} className="v-dream-fund-case__nav-pill">
                      <span aria-hidden>{item.icon}</span> {item.label}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock
                title="Home screen"
                description="Primary dashboard hierarchy for Jennie's daily check-in."
              >
                <pre className="v-dream-fund-case__diagram" aria-label="Home screen structure">
                  {dreamFundHomeScreen}
                </pre>
              </SectionBlock>

              <SectionBlock title="Key flows">
                <div className="v-dream-fund-case__flow-grid">
                  {dreamFundFlows.map((flow) => (
                    <div key={flow.id} className="v-dream-fund-case__flow">
                      <h3 className="v-dream-fund-case__flow-title">{flow.title}</h3>
                      <pre className="v-dream-fund-case__diagram v-dream-fund-case__diagram--compact">
                        {flow.diagram}
                      </pre>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Core features">
                <ul className="v-dream-fund-case__feature-list">
                  {dreamFundCoreFeatures.map((feature) => (
                    <li key={feature.title} className="v-dream-fund-case__feature">
                      <h3 className="v-dream-fund-case__feature-title">{feature.title}</h3>
                      <p className="v-dream-fund-case__feature-desc">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title="UX principles">
                <RuleList rules={[...dreamFundUxPrinciples]} />
              </SectionBlock>

              <SectionBlock title="MVP scope">
                <RuleList rules={[...dreamFundMvpScope]} />
              </SectionBlock>

              <SectionBlock
                title="Process"
                description="From persona definition to prototype-ready flows."
              >
                <ol className="v-dream-fund-case__process">
                  {dreamFundProcess.map((step) => (
                    <li key={step.step} className="v-dream-fund-case__process-item">
                      <span className="v-dream-fund-case__process-step" aria-hidden>
                        {step.step}
                      </span>
                      <div>
                        <h3 className="v-dream-fund-case__process-title">{step.title}</h3>
                        <p className="v-dream-fund-case__process-desc">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </SectionBlock>

              <SectionBlock
                title="Placeholder mockups"
                description="Wireframe placeholders for key MVP screens — not final UI."
              >
                <ul className="v-dream-fund-mockup-grid">
                  {dreamFundMockups.map((mockup) => (
                    <li key={mockup.id}>
                      <CaseStudyMockup label={mockup.label} blocks={mockup.blocks} />
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock
                title="NotebookLM walkthrough"
                description="Product walkthrough generated from the business plan and architecture deck."
              >
                <div className="v-cmp-empty v-dream-fund-walkthrough">
                  <div className="v-cmp-empty__icon" aria-hidden>
                    <Play strokeWidth={2} />
                  </div>
                  <p className="v-cmp-empty__title">Dream-First Financial Companion</p>
                  <p className="v-cmp-empty__body">
                    NotebookLM walkthrough placeholder — video embed coming soon. The full
                    walkthrough covers Jennie&apos;s persona, home screen, Money Changed flows,
                    dream creation, and partner saving.
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
