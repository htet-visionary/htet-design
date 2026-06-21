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
      { title: "Icons", href: `${designSystemBase}/foundations/icons` },
      { title: "Radius", href: `${designSystemBase}/foundations/radius` },
      { title: "Elevation", href: `${designSystemBase}/foundations/elevation` },
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
      { title: "Accordion", href: `${designSystemBase}/components/accordion` },
      { title: "Alert", href: `${designSystemBase}/components/alert` },
      { title: "Avatar", href: `${designSystemBase}/components/avatar` },
      { title: "Badge", href: `${designSystemBase}/components/badge` },
      { title: "Breadcrumb", href: `${designSystemBase}/components/breadcrumb` },
      { title: "Button", href: `${designSystemBase}/components/button` },
      { title: "Card", href: `${designSystemBase}/components/card` },
      { title: "Checkbox", href: `${designSystemBase}/components/checkbox` },
      { title: "Chip", href: `${designSystemBase}/components/chip` },
      { title: "Dropdown", href: `${designSystemBase}/components/dropdown` },
      { title: "Divider", href: `${designSystemBase}/components/divider` },
      { title: "Empty state", href: `${designSystemBase}/components/empty-state` },
      { title: "Input", href: `${designSystemBase}/components/input` },
      { title: "List", href: `${designSystemBase}/components/list` },
      { title: "Menu", href: `${designSystemBase}/components/menu` },
      { title: "Modal", href: `${designSystemBase}/components/modal` },
      { title: "Navigation", href: `${designSystemBase}/components/navigation` },
      { title: "Pagination", href: `${designSystemBase}/components/pagination` },
      { title: "Radio", href: `${designSystemBase}/components/radio` },
      { title: "Select", href: `${designSystemBase}/components/select` },
      { title: "Switch", href: `${designSystemBase}/components/switch` },
      { title: "Table", href: `${designSystemBase}/components/table` },
      { title: "Tabs", href: `${designSystemBase}/components/tabs` },
      { title: "Tag", href: `${designSystemBase}/components/tag` },
      { title: "Textarea", href: `${designSystemBase}/components/textarea` },
      { title: "Toast", href: `${designSystemBase}/components/toast` },
    ],
  },
];

export function getComponentsNavItems(): NavItem[] {
  return visionaryNavigation.find((group) => group.title === "Components")?.items ?? [];
}

export function getFirstComponentHref(): string {
  return getComponentsNavItems()[0]?.href ?? `${designSystemBase}/components/accordion`;
}

export type SiteMenuItem = {
  title: string;
  href: string;
  shortTitle?: string;
  openInNewTab?: boolean;
};

export const siteHubPath = "/";

export const siteMenuItems: SiteMenuItem[] = [
  {
    title: "Visionary Design System",
    shortTitle: "Design System",
    href: designSystemBase,
    openInNewTab: true,
  },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Product", href: "/product" },
  { title: "Blog", href: "/blog" },
];

/** Flat sidebar order — mirrors VisionaryShell nav rendering. */
export function getSidebarNavOrder(): NavItem[] {
  return visionaryNavigation.flatMap((group) => {
    const subgroupItems =
      group.subgroups?.flatMap((subgroup) => subgroup.items) ?? [];
    const topLevelItems = group.items ?? [];

    if (group.subgroupsAfterItems) {
      return [...topLevelItems, ...subgroupItems];
    }

    return [...subgroupItems, ...topLevelItems];
  });
}

function navItemPath(href: string) {
  return href.split("#")[0];
}

function resolveSidebarNavIndex(pathname: string, items: NavItem[]): number {
  const exactIndex = items.findIndex((item) => {
    const path = navItemPath(item.href);
    return item.exact ? pathname === path : pathname === path;
  });
  if (exactIndex >= 0) {
    return exactIndex;
  }

  let bestIndex = -1;
  let bestLength = 0;

  for (const [index, item] of items.entries()) {
    const path = navItemPath(item.href);
    if (item.exact) {
      continue;
    }

    if (pathname === path || pathname.startsWith(`${path}/`)) {
      if (path.length > bestLength) {
        bestLength = path.length;
        bestIndex = index;
      }
    }
  }

  return bestIndex;
}

export function getNavNeighbors(pathname: string): {
  previous: NavItem | null;
  next: NavItem | null;
} {
  const items = getSidebarNavOrder();
  const index = resolveSidebarNavIndex(pathname, items);

  if (index < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}

/** @deprecated Use getSidebarNavOrder */
export function flattenNavItems(): NavItem[] {
  return getSidebarNavOrder();
}
