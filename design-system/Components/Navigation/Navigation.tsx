import type { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavigationProps = {
  brand?: ReactNode;
  brandHref?: string;
  items?: NavItem[];
  actions?: ReactNode;
};

export function Navigation({
  brand = "Brand",
  brandHref = "/",
  items = [],
  actions,
}: NavigationProps) {
  return (
    <nav className="ds-nav" aria-label="Main navigation">
      <a href={brandHref} className="ds-nav__brand">
        {brand}
      </a>

      {items.length > 0 && (
        <ul className="ds-nav__links">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={[
                  "ds-nav__link",
                  item.active && "ds-nav__link--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {actions && <div className="ds-nav__actions">{actions}</div>}
    </nav>
  );
}
