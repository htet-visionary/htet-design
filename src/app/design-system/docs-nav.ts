export type DocsNavItem = {
  title: string;
  href: string;
};

export type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavigation: DocsNavGroup[] = [
  {
    title: "Getting Started",
    items: [{ title: "Introduction", href: "#introduction" }],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "#colors" },
      { title: "Typography", href: "#typography" },
      { title: "Spacing", href: "#spacing" },
      { title: "Radius", href: "#radius" },
      { title: "Elevation", href: "#elevation" },
    ],
  },
  {
    title: "Tokens",
    items: [
      { title: "Primitive", href: "#tokens-primitive" },
      { title: "Semantic", href: "#tokens-semantic" },
      { title: "Component", href: "#tokens-component" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "#button" },
      { title: "Input", href: "#input" },
      { title: "Card", href: "#card" },
      { title: "Navigation", href: "#navigation" },
    ],
  },
];

export const allSectionIds = docsNavigation.flatMap((group) =>
  group.items.map((item) => item.href.replace("#", "")),
);
