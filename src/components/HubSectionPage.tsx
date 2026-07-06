import type { ReactNode } from "react";
import { SiteHubNav } from "@/components/SiteHubNav";

export function HubSectionPage({
  title,
  description,
  layout = "centered",
  children,
}: {
  title: string;
  description: string;
  layout?: "centered" | "content";
  children?: ReactNode;
}) {
  return (
    <div className="v-hub-section">
      <SiteHubNav />
      <main
        className={[
          "v-hub-page",
          layout === "content" ? "v-hub-page--content" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="v-hub-page__header">
          <h1 className="v-hub-page__title">{title}</h1>
          <p className="v-hub-page__desc">{description}</p>
        </header>
        {children}
      </main>
    </div>
  );
}
