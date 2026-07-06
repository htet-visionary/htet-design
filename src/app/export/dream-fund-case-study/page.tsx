import type { Metadata } from "next";
import { ExportDocument, ExportSection } from "@/components/export/ExportDocument";
import {
  dreamFundV1CaseStudyMeta,
  dreamFundV1Mockups,
  dreamFundV1Persona,
  dreamFundV1Problem,
  dreamFundV1ProductIdea,
  dreamFundV1Tools,
  dreamFundV1UxPrinciples,
} from "@/lib/dream-fund-v1-case-study";

export const metadata: Metadata = {
  title: `${dreamFundV1CaseStudyMeta.title} — Case Study`,
};

export default function DreamFundCaseStudyExportPage() {
  return (
    <ExportDocument
      title="Dream Fund"
      eyebrow={dreamFundV1CaseStudyMeta.eyebrow}
    >
      <p className="v-export__prose v-export__prose--lead">
        {dreamFundV1CaseStudyMeta.description}
      </p>
      <p className="v-export__card-meta">
        {dreamFundV1CaseStudyMeta.year} · {dreamFundV1CaseStudyMeta.roles.join(" · ")}
      </p>

      <figure className="v-export__figure">
        <img
          src={dreamFundV1CaseStudyMeta.heroImage}
          alt={dreamFundV1CaseStudyMeta.heroImageAlt}
          className="v-export__image"
        />
      </figure>

      <ExportSection title={dreamFundV1Problem.title}>
        {dreamFundV1Problem.paragraphs.map((paragraph) => (
          <p key={paragraph} className="v-export__prose">
            {paragraph}
          </p>
        ))}
        <ul className="v-export__list">
          {dreamFundV1Problem.pains.map((pain) => (
            <li key={pain}>{pain}</li>
          ))}
        </ul>
      </ExportSection>

      <ExportSection title={dreamFundV1ProductIdea.title}>
        {dreamFundV1ProductIdea.paragraphs.map((paragraph) => (
          <p key={paragraph} className="v-export__prose">
            {paragraph}
          </p>
        ))}
        <p className="v-export__prose v-export__prose--lead">
          {dreamFundV1ProductIdea.outcome}
        </p>
      </ExportSection>

      <ExportSection title="User Persona">
        <div className="v-export__persona">
          <h3 className="v-export__card-title">
            {dreamFundV1Persona.name} — {dreamFundV1Persona.title}
          </h3>
          <p className="v-export__card-meta">
            Age {dreamFundV1Persona.age} · {dreamFundV1Persona.role} ·{" "}
            {dreamFundV1Persona.location} · {dreamFundV1Persona.income}
          </p>
          <p className="v-export__prose">{dreamFundV1Persona.summary}</p>
          <blockquote className="v-export__quote">
            “{dreamFundV1Persona.quote}”
          </blockquote>
        </div>
      </ExportSection>

      <ExportSection
        title="User flow"
        description="The v1 prototype follows one calm loop — plan, fuel, check progress."
      >
        <figure className="v-export__figure">
          <img
            src="/dream-fund/user-flow.png"
            alt="Dream Fund user flow diagram"
            className="v-export__image"
          />
        </figure>
      </ExportSection>

      <ExportSection title="UX principles">
        <ul className="v-export__list">
          {dreamFundV1UxPrinciples.map((principle) => (
            <li key={principle.title}>
              <strong>{principle.title}</strong> — {principle.description}
            </li>
          ))}
        </ul>
      </ExportSection>

      <ExportSection title="High-fidelity mockups">
        <div className="v-export__mockup-grid">
          {dreamFundV1Mockups.map((mockup) => (
            <figure key={mockup.id} className="v-export__mockup">
              <img src={mockup.src} alt={mockup.alt} />
              <figcaption>{mockup.label}</figcaption>
            </figure>
          ))}
        </div>
      </ExportSection>

      <ExportSection title="Tools & technologies">
        {dreamFundV1Tools.map((group) => (
          <article key={group.category} className="v-export__card">
            <h3 className="v-export__card-title">{group.category}</h3>
            <ul className="v-export__chips" aria-label={group.category}>
              {group.tools.map((tool) => (
                <li key={tool} className="v-export__chip">
                  {tool}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </ExportSection>

      <footer className="v-export__footer">
        Dream Fund case study · Visionary Design System
      </footer>
    </ExportDocument>
  );
}
