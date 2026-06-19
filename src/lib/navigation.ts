export type NavItem = {
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const visionaryNavigation: NavGroup[] = [
  {
    title: "Overview",
    items: [{ title: "Introduction", href: "/" }],
  },
  {
    title: "Tokens",
    items: [
      { title: "Architecture", href: "/tokens" },
      { title: "Primitives", href: "/tokens/primitives" },
      { title: "Semantic", href: "/tokens/semantic" },
      { title: "Component", href: "/tokens/components" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Overview", href: "/foundations" },
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing", href: "/foundations/spacing" },
      { title: "Radius", href: "/foundations/radius" },
      { title: "Elevation", href: "/foundations/elevation" },
      { title: "Motion", href: "/foundations/motion" },
      { title: "Layout", href: "/foundations/layout" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Accessibility", href: "/accessibility" },
      { title: "Components", href: "/components" },
      { title: "Themes", href: "/themes" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/components/button" },
      { title: "Input", href: "/components/input" },
      { title: "Card", href: "/components/card" },
      { title: "Alert", href: "/components/alert" },
      { title: "Modal", href: "/components/modal" },
    ],
  },
  {
    title: "Themes",
    items: [
      { title: "Lucky Charm", href: "/themes/lucky-charm" },
      { title: "Dream Fund", href: "/themes/dream-fund" },
    ],
  },
];

export function flattenNavItems(): NavItem[] {
  return visionaryNavigation.flatMap((group) => group.items);
}
