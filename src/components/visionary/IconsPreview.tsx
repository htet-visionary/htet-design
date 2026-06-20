import { icons, touchTarget } from "@design-system/visionary";
import { PawPrint } from "lucide-react";

const sizeCssVar: Record<keyof typeof icons.size, string> = {
  xs: "--v-icon-xs",
  sm: "--v-icon-sm",
  md: "--v-icon-md",
  lg: "--v-icon-lg",
  xl: "--v-icon-xl",
};

const usageRows = [
  { context: "Sidebar nav", size: "sm", px: icons.size.sm },
  { context: "Inline with label", size: "md", px: icons.size.md },
  { context: "Link cards", size: "lg", px: icons.size.lg },
  { context: "Hub tiles", size: "xl", px: icons.size.xl },
  {
    context: "Icon-only controls",
    size: "md",
    px: icons.size.md,
    hitArea: touchTarget.minimum,
  },
] as const;

function PreviewIcon({
  size,
  className,
}: {
  size: number | string;
  className?: string;
}) {
  return (
    <PawPrint
      className={className}
      style={{
        width: size,
        height: size,
        color: "var(--v-icon-color-default)",
      }}
      strokeWidth={icons.strokeWidth}
      fill="none"
      aria-hidden
    />
  );
}

export function IconSizeScalePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Icon size scale">
      {(Object.keys(icons.size) as Array<keyof typeof icons.size>).map((name) => {
        const px = icons.size[name];
        return (
          <li key={name} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{name}</code>
            <PreviewIcon
              size={`var(${sizeCssVar[name]})`}
              className="v-spacing-scale__glyph"
            />
            <span className="v-spacing-scale__px">{px}px</span>
          </li>
        );
      })}
    </ul>
  );
}

export function IconUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Icon usage">
      {usageRows.map((row) => (
        <li key={row.context} className="v-spacing-usage__row">
          <span className="v-spacing-usage__name">{row.context}</span>
          <PreviewIcon size={row.px} className="v-spacing-usage__glyph" />
          <span className="v-spacing-usage__meta">
            <code className="v-code v-code--sm">{row.size}</code>
            <span aria-hidden>·</span>
            <span>
              {row.px}px
              {"hitArea" in row && row.hitArea ? ` · ${row.hitArea}px hit area` : ""}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
