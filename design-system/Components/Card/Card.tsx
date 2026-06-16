import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "default" | "flat" | "accent";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  interactive?: boolean;
  title?: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
};

export function Card({
  variant = "default",
  interactive = false,
  title,
  description,
  footer,
  children,
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "ds-card",
    variant !== "default" && `ds-card--${variant}`,
    interactive && "ds-card--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {(title || description) && (
        <div className="ds-card__header">
          {title && <h3 className="ds-card__title">{title}</h3>}
          {description && (
            <p className="ds-card__description">{description}</p>
          )}
        </div>
      )}
      {children && <div className="ds-card__content">{children}</div>}
      {footer && <div className="ds-card__footer">{footer}</div>}
    </div>
  );
}
