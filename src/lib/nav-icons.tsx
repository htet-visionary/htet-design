import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  AlertTriangle,
  AlignLeft,
  BookOpen,
  Briefcase,
  CheckSquare,
  ChevronDown,
  Circle,
  CircleDot,
  Compass,
  Home,
  Inbox,
  Layers,
  LayoutGrid,
  LayoutList,
  LayoutTemplate,
  List,
  Menu,
  MousePointerClick,
  Package,
  Palette,
  PanelTop,
  PenLine,
  Ruler,
  Shapes,
  Sparkles,
  SquareStack,
  Table,
  Tag,
  Tags,
  TextCursorInput,
  ToggleLeft,
  Type,
  UserCircle,
  Wallet,
  Bell,
  ChevronsUpDown,
  BadgeCheck,
  SeparatorHorizontal,
} from "lucide-react";
import { designSystemBase } from "./navigation";

export const siteMenuIcons: Record<string, LucideIcon> = {
  [designSystemBase]: Palette,
  "/portfolio": Briefcase,
  "/product": Package,
  "/blog": PenLine,
};

const base = `${designSystemBase}/components`;

export const dsNavIcons: Record<string, LucideIcon> = {
  [designSystemBase]: Home,
  [`${designSystemBase}/foundations/colors`]: Palette,
  [`${designSystemBase}/foundations/icons`]: Shapes,
  [`${designSystemBase}/foundations/typography`]: Type,
  [`${designSystemBase}/foundations/spacing`]: Ruler,
  [`${designSystemBase}/foundations/radius`]: Circle,
  [`${designSystemBase}/foundations/elevation`]: Layers,
  [`${designSystemBase}/foundations/layout`]: LayoutGrid,
  [`${designSystemBase}/accessibility`]: Accessibility,
  [`${designSystemBase}/themes/lucky-charm`]: Sparkles,
  [`${designSystemBase}/themes/dream-fund`]: Wallet,
  [`${base}/button`]: MousePointerClick,
  [`${base}/input`]: TextCursorInput,
  [`${base}/textarea`]: AlignLeft,
  [`${base}/select`]: ChevronsUpDown,
  [`${base}/checkbox`]: CheckSquare,
  [`${base}/radio`]: CircleDot,
  [`${base}/switch`]: ToggleLeft,
  [`${base}/card`]: SquareStack,
  [`${base}/alert`]: AlertTriangle,
  [`${base}/toast`]: Bell,
  [`${base}/modal`]: PanelTop,
  [`${base}/tabs`]: LayoutTemplate,
  [`${base}/accordion`]: LayoutList,
  [`${base}/dropdown`]: ChevronDown,
  [`${base}/divider`]: SeparatorHorizontal,
  [`${base}/menu`]: Menu,
  [`${base}/breadcrumb`]: ChevronDown,
  [`${base}/navigation`]: Compass,
  [`${base}/avatar`]: UserCircle,
  [`${base}/badge`]: BadgeCheck,
  [`${base}/tag`]: Tag,
  [`${base}/chip`]: Tags,
  [`${base}/table`]: Table,
  [`${base}/list`]: List,
  [`${base}/empty-state`]: Inbox,
  [`${base}/pagination`]: LayoutGrid,
};

export function NavIcon({
  href,
  map,
  className,
}: {
  href: string;
  map: Record<string, LucideIcon>;
  className?: string;
}) {
  const Icon = map[href] ?? BookOpen;
  return <Icon className={className} aria-hidden />;
}
