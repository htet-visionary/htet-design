export const documentation = {
  overview: {
    title: "Overview",
    file: "README.md",
    description:
      "Introduction to the design system and how it maps to the mood board.",
  },
  foundations: {
    title: "Foundations",
    file: "foundations.md",
    description: "Colors, typography, spacing, radius, and elevation.",
  },
  tokens: {
    title: "Tokens",
    file: "tokens.md",
    description: "Primitive, semantic, and component token layers.",
  },
  components: {
    title: "Components",
    file: "components.md",
    description: "Button, Input, Card, and Navigation usage guidelines.",
  },
} as const;

export type DocumentationSection = keyof typeof documentation;
