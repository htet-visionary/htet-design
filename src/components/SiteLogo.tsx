import {
  siteLogoColors,
  siteLogoLeafPath,
  siteLogoStemPaths,
} from "@/lib/site-logo";

type SiteLogoProps = {
  className?: string;
  size?: number;
  /** Include stem strokes (default true). */
  withStems?: boolean;
  /** When set, renders on a rounded brand-green tile. */
  tile?: boolean;
};

export function SiteLogo({
  className,
  size = 24,
  withStems = true,
  tile = false,
}: SiteLogoProps) {
  const mark = (
    <>
      <path fill="currentColor" d={siteLogoLeafPath} />
      {withStems
        ? siteLogoStemPaths.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))
        : null}
    </>
  );

  if (tile) {
    const radius = Math.round(size * 0.21875);
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={className}
        aria-hidden
      >
        <rect
          width={size}
          height={size}
          rx={radius}
          fill={siteLogoColors.background}
        />
        <svg
          x={size * 0.125}
          y={size * 0.125}
          width={size * 0.75}
          height={size * 0.75}
          viewBox="0 0 24 24"
          color={siteLogoColors.foreground}
        >
          {mark}
        </svg>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {mark}
    </svg>
  );
}
