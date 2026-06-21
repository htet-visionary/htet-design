import type { ReactNode } from "react";
import { SiteHubNav } from "@/components/SiteHubNav";

export function HubSectionPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="v-hub-section">
      <SiteHubNav />
      <main className="v-hub-page">
        <h1 className="v-hub-page__title">{title}</h1>
        <p className="v-hub-page__desc">{description}</p>
        {children}
      </main>
    </div>
  );
}
