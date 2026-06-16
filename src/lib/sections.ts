export type SectionStatus = "active" | "coming-soon";

export type Section = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: SectionStatus;
  /** Root-level folder name under /top (e.g. design-system, portfolio) */
  folder: string;
};

/**
 * Central registry for top-level sections.
 * To add a new section (e.g. portfolio):
 * 1. Create a folder at the repo root: /portfolio
 * 2. Add an entry here
 * 3. Create a route at src/app/<id>/page.tsx
 */
export const sections: Section[] = [
  {
    id: "design-system",
    title: "Design System",
    description: "Tokens, components, and UI patterns for this project.",
    href: "/design-system",
    status: "active",
    folder: "design-system",
  },
  // Future sections — uncomment and add matching folder + route when ready:
  // {
  //   id: "portfolio",
  //   title: "Portfolio",
  //   description: "Projects, case studies, and work samples.",
  //   href: "/portfolio",
  //   status: "coming-soon",
  //   folder: "portfolio",
  // },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((section) => section.id === id);
}

export function getActiveSections(): Section[] {
  return sections.filter((section) => section.status === "active");
}
