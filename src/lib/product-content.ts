import { designSystemBase } from "@/lib/navigation";
import { dreamFundV1CaseStudyMeta } from "@/lib/dream-fund-v1-case-study";

export const dreamFundProductBrand = {
  name: "Dream Fund",
  tagline: "Plan it. Fuel it. Achieve it.",
  description: dreamFundV1CaseStudyMeta.description,
  visionaryDescription:
    "Built on the Visionary design system using the Dream Fund theme — clover green for growth and confidence, charm purple for the wordmark, and warm sand surfaces for calm, dream-first screens.",
  colors: [
    { label: "Clover Green", role: "Primary · Dream", hex: "#5C7B56" },
    { label: "Charm Purple", role: "Wordmark · Fund", hex: "#8E6FAD" },
    { label: "Warm Sand", role: "Accent 50 surfaces", hex: "#FCF8EF" },
  ],
  links: {
    theme: `${designSystemBase}/themes/dream-fund`,
    caseStudy: "/dream-fund",
  },
} as const;
