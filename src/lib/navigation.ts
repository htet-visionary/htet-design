export const designSystemBase = "/visionary-design-system";

export type NavItem = {
  title: string;
  href: string;
  exact?: boolean;
};

export type NavSubgroup = {
  title?: string;
  items: NavItem[];
};

export type NavGroup = {
  title: string;
  items?: NavItem[];
  subgroups?: NavSubgroup[];
  subgroupsAfterItems?: boolean;
};

export const visionaryNavigation: NavGroup[] = [
  {
    title: "Overview",
    items: [{ title: "Introduction", href: designSystemBase, exact: true }],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: `${designSystemBase}/foundations/colors` },
      { title: "Typography", href: `${designSystemBase}/foundations/typography` },
      { title: "Spacing", href: `${designSystemBase}/foundations/spacing` },
      { title: "Radius", href: `${designSystemBase}/foundations/radius` },
      { title: "Elevation", href: `${designSystemBase}/foundations/elevation` },
      { title: "Motion", href: `${designSystemBase}/foundations/motion` },
      { title: "Layout", href: `${designSystemBase}/foundations/layout` },
    ],
  },
  {
    title: "Guidelines",
    items: [{ title: "Accessibility", href: `${designSystemBase}/accessibility` }],
  },
  {
    title: "Themes",
    items: [
      { title: "Lucky Charm", href: `${designSystemBase}/themes/lucky-charm` },
      { title: "Dream Fund", href: `${designSystemBase}/themes/dream-fund` },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: `${designSystemBase}/components/button` },
      { title: "Input", href: `${designSystemBase}/components/input` },
      { title: "Card", href: `${designSystemBase}/components/card` },
      { title: "Alert", href: `${designSystemBase}/components/alert` },
      { title: "Modal", href: `${designSystemBase}/components/modal` },
    ],
  },
];

export function flattenNavItems(): NavItem[] {
  return visionaryNavigation.flatMap((group) => [
    ...(group.items ?? []),
    ...(group.subgroups?.flatMap((sub) => sub.items) ?? []),
  ]);
}

export const siteMenuItems = [
  { title: "Visionary Design System", href: designSystemBase },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Product", href: "/product" },
  { title: "Blog", href: "/blog" },
] as const;
