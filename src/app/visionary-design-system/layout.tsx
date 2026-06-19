import type { Metadata } from "next";
import type { ReactNode } from "react";
import { VisionaryShell } from "@/components/visionary/VisionaryShell";
import { visionaryMeta } from "@design-system/visionary";

export const metadata: Metadata = {
  title: {
    default: visionaryMeta.name,
    template: `%s · ${visionaryMeta.name}`,
  },
  description: visionaryMeta.description,
};

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return <VisionaryShell>{children}</VisionaryShell>;
}
