import type { Metadata } from "next";
import { ResumeDocument } from "@/components/cv/ResumeDocument";
import { resumeProfile } from "@/lib/resume-content";
import "../../cv/cv.css";

export const metadata: Metadata = {
  title: `${resumeProfile.name} — Resume`,
  description: resumeProfile.tagline,
};

export default function CvExportPage() {
  return (
    <main className="cv-page">
      <ResumeDocument />
    </main>
  );
}
