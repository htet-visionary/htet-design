import type { Metadata } from "next";
import type { ReactNode } from "react";
import { VisionaryShell } from "@/components/visionary/VisionaryShell";
import { visionaryMeta } from "@design-system/visionary";
import "./globals.css";
import "./shell.css";

export const metadata: Metadata = {
  title: {
    default: visionaryMeta.name,
    template: `%s · ${visionaryMeta.name}`,
  },
  description: visionaryMeta.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="visionary-root antialiased">
        <VisionaryShell>{children}</VisionaryShell>
      </body>
    </html>
  );
}
