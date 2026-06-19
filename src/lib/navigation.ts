export type NavItem = {
  title: string;
  href: string;
  exact?: boolean;
};

export type NavSubgroup = {
  title: string;
  items: NavItem[];
};

export type NavGroup = {
  title: string;
  items?: NavItem[];
  subgroups?: NavSubgroup[];
};

export const visionaryNavigation: NavGroup[] = [
  {
    title: "Overview",
    items: [{ title: "Introduction", href: "/" }],
  },
  {
    title: "Foundations",
    subgroups: [
      {
        title: "Colors",
        items: [
          { title: "Colors", href: "/foundations/colors", exact: true },
          { title: "Primitive", href: "/foundations/colors/primitive" },
          { title: "Semantic", href: "/foundations/colors/semantic" },
          { title: "Functional", href: "/foundations/colors/functional" },
        ],
      },
      {
        title: "Themes",
        items: [
          { title: "Themes", href: "/foundations/colors/themes", exact: true },
          {
            title: "Lucky Charm",
            href: "/foundations/colors/themes/lucky-charm",
          },
          {
            title: "Dream Fund",
            href: "/foundations/colors/themes/dream-fund",
          },
        ],
      },
    ],
    items: [
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
