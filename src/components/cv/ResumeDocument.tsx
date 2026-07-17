import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  resumeCertifications,
  resumeEducation,
  resumeExperience,
  resumeLanguages,
  resumeProfile,
  resumeProjects,
  resumeSkills,
  resumeSummary,
} from "@/lib/resume-content";

export function ResumeDocument() {
  return (
    <article className="cv-document" data-export-ready="true">
      <header className="cv-header">
        <div className="cv-header__identity">
          <h1 className="cv-header__name">{resumeProfile.name}</h1>
          <p className="cv-header__title">{resumeProfile.title}</p>
          <p className="cv-header__tagline">{resumeProfile.tagline}</p>
        </div>
        <div className="cv-header__contact">
          <span>{resumeProfile.location}</span>
          <a href={`mailto:${resumeProfile.email}`}>{resumeProfile.email}</a>
          <a href={`tel:${resumeProfile.phone.replace(/-/g, "")}`}>
            {resumeProfile.phone}
          </a>
          <a href={resumeProfile.website} rel="noopener noreferrer">
            {resumeProfile.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </header>

      <section className="cv-section" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="cv-section__title">
          Professional Summary
        </h2>
        <div className="cv-section__body">
          {resumeSummary.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="cv-prose">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="cv-section__title">
          Professional Experience
        </h2>
        <div className="cv-section__body">
          {resumeExperience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="cv-entry">
              <header className="cv-entry__header">
                <div className="cv-entry__heading">
                  <h3 className="cv-entry__role">{job.role}</h3>
                  <p className="cv-entry__company">
                    {job.company}
                    {job.location ? `  ${job.location}` : ""}
                  </p>
                </div>
                <span className="cv-entry__period">{job.period}</span>
              </header>
              <ul className="cv-entry__list">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="cv-section__title">
          Featured Projects
        </h2>
        <div className="cv-section__body">
          {resumeProjects.map((project) => (
            <article key={project.title} className="cv-entry cv-entry--compact">
              <h3 className="cv-entry__role">
                {project.href ? (
                  <Link
                    href={project.href}
                    className="cv-entry__link"
                    {...(project.openInNewTab
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span>{project.title}</span>
                    {project.openInNewTab ? (
                      <ArrowUpRight
                        className="cv-entry__link-icon"
                        aria-hidden
                        strokeWidth={2}
                      />
                    ) : null}
                  </Link>
                ) : (
                  project.title
                )}
              </h3>
              <p className="cv-prose">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="cv-section__title">
          Core Skills
        </h2>
        <div className="cv-section__body cv-skills">
          {resumeSkills.map((group) => (
            <div key={group.category} className="cv-skills__group">
              <h3 className="cv-skills__category">{group.category}</h3>
              <ul className="cv-skills__list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="education-heading">
        <h2 id="education-heading" className="cv-section__title">
          Education
        </h2>
        <div className="cv-section__body">
          <p className="cv-prose">{resumeEducation.degree}</p>
        </div>
      </section>

      <section className="cv-section" aria-labelledby="certifications-heading">
        <h2 id="certifications-heading" className="cv-section__title">
          Certifications
        </h2>
        <ul className="cv-inline-list">
          {resumeCertifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>

      <section className="cv-section" aria-labelledby="languages-heading">
        <h2 id="languages-heading" className="cv-section__title">
          Languages
        </h2>
        <ul className="cv-inline-list">
          {resumeLanguages.map(({ language, proficiency }) => (
            <li key={language}>
              <span className="cv-inline-list__label">{language}</span>
              <span className="cv-inline-list__value"> — {proficiency}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
