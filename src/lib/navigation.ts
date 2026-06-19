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
    items: [{ title: "Introduction", href: "/" }],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "/foundations/colors" },
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing", href: "/foundations/spacing" },
      { title: "Radius", href: "/foundations/radius" },
      { title: "Elevation", href: "/foundations/elevation" },
      { title: "Motion", href: "/foundations/motion" },
      { title: "Layout", href: "/foundations/layout" },
    ],
  },
  {
    title: "Guidelines",
    items: [{ title: "Accessibility", href: "/accessibility" }],
  },
  {
    title: "Themes",
    items: [
      { title: "Lucky Charm", href: "/themes/lucky-charm" },
      { title: "Dream Fund", href: "/themes/dream-fund" },
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
];

export function flattenNavItems(): NavItem[] {
  return visionaryNavigation.flatMap((group) => [
    ...(group.items ?? []),
    ...(group.subgroups?.flatMap((sub) => sub.items) ?? []),
  ]);
}
