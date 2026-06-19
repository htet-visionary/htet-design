export type SectionStatus = "active" | "coming-soon";

export type Section = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: SectionStatus;
  /** Root-level folder name under /top */
  folder: string;
  /** Archive sections show an Archive badge in navigation */
  archive?: boolean;
};

export type ArchiveSubpage = {
  id: string;
  title: string;
  description: string;
  href: string;
  /** Parent section id for grouping on /menu */
  parentId: string;
};

/**
 * Top-level sections. Order defines global nav and /menu card order.
 */
export const sections: Section[] = [
  {
    id: "visionary",
    title: "Visionary Design System",
    description:
      "Unified design language for Lucky Charm, Dream Fund, and future Visionary products.",
    href: "/",
    status: "active",
    folder: "design-system/visionary",
  },
  {
    id: "design-system-v0",
    title: "Design System v0",
    description:
      "Archive — Lucky Charm tokens, components, and UI patterns.",
    href: "/design-system",
    status: "active",
    folder: "design-system",
    archive: true,
  },
  {
    id: "lucky-charm-v0",
    title: "Lucky Charm v0",
    description: "Archive — Lucky Charm brand product page.",
    href: "/product/rabbit",
    status: "active",
    folder: "product/rabbit",
    archive: true,
  },
];

/**
 * Nested archive pages — not shown in top-level global nav.
 */
export const archiveSubpages: ArchiveSubpage[] = [
  {
    id: "color-foundations-v0",
    title: "Color Foundations (v0)",
    description:
      "Archive — foundational color architecture and semantic mappings.",
    href: "/design-system/v0",
    parentId: "design-system-v0",
  },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((section) => section.id === id);
}

export function getActiveSections(): Section[] {
  return sections.filter((section) => section.status === "active");
}

export function getArchiveSubpagesForSection(
  parentId: string,
): ArchiveSubpage[] {
  return archiveSubpages.filter((page) => page.parentId === parentId);
}

export function getGlobalNavSections(): Section[] {
  return sections;
}
