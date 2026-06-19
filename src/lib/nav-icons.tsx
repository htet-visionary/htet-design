import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Circle,
  Home,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Package,
  Palette,
  PanelTop,
  PenLine,
  Ruler,
  Sparkles,
  SquareStack,
  TextCursorInput,
  Type,
  Wallet,
} from "lucide-react";
import { designSystemBase } from "./navigation";

export const siteMenuIcons: Record<string, LucideIcon> = {
  [designSystemBase]: Palette,
  "/portfolio": Briefcase,
  "/product": Package,
  "/blog": PenLine,
};

export const dsNavIcons: Record<string, LucideIcon> = {
  [designSystemBase]: Home,
  [`${designSystemBase}/foundations/colors`]: Palette,
  [`${designSystemBase}/foundations/typography`]: Type,
  [`${designSystemBase}/foundations/spacing`]: Ruler,
  [`${designSystemBase}/foundations/radius`]: Circle,
  [`${designSystemBase}/foundations/elevation`]: Layers,
  [`${designSystemBase}/foundations/motion`]: Activity,
  [`${designSystemBase}/foundations/layout`]: LayoutGrid,
  [`${designSystemBase}/accessibility`]: Accessibility,
  [`${designSystemBase}/themes/lucky-charm`]: Sparkles,
  [`${designSystemBase}/themes/dream-fund`]: Wallet,
  [`${designSystemBase}/components/button`]: MousePointerClick,
  [`${designSystemBase}/components/input`]: TextCursorInput,
  [`${designSystemBase}/components/card`]: SquareStack,
  [`${designSystemBase}/components/alert`]: AlertTriangle,
  [`${designSystemBase}/components/modal`]: PanelTop,
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
