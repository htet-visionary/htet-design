import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CvPrintButton } from "@/components/cv/CvPrintButton";
import { ResumeDocument } from "@/components/cv/ResumeDocument";
import { resumeProfile } from "@/lib/resume-content";

export const metadata: Metadata = {
  title: `${resumeProfile.name} — Resume`,
  description: resumeProfile.tagline,
};

export default function CvPage() {
  return (
    <div className="v-portfolio cv-shell">
      <header className="v-portfolio-topbar">
        <div className="v-portfolio-topbar__inner">
          <Link
            href="/portfolio"
            className="v-site-hub-nav__back v-portfolio-topbar__hub"
          >
            <ChevronLeft
              className="v-site-hub-nav__back-icon"
              aria-hidden
              strokeWidth={2}
            />
            Portfolio
          </Link>

          <CvPrintButton />
        </div>
      </header>

      <main className="v-portfolio-main cv-page">
        <ResumeDocument />
      </main>
    </div>
  );
}
