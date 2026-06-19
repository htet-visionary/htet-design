import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: ReactNode;
};

export function WishCard({ title, children, className = "", ...props }: CardProps) {
  return (
    <div className={`lc-card-wish ${className}`} {...props}>
      {title && (
        <h3
          style={{
            fontFamily: "var(--lc-font-story)",
            fontSize: "1.25rem",
            color: "var(--lc-deep-green)",
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export function MemoryCard({ title, children, className = "", ...props }: CardProps) {
  return (
    <div className={`lc-card-memory ${className}`} {...props}>
      {title && (
        <h3
          style={{
            fontFamily: "var(--lc-font-notes)",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--lc-text-muted)",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export function CozyCard({ title, children, className = "", ...props }: CardProps) {
  return (
    <div className={`lc-card-cozy ${className}`} {...props}>
      {title && (
        <h3
          style={{
            fontFamily: "var(--lc-font-story)",
            fontSize: "1.35rem",
            color: "var(--lc-deep-green)",
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
