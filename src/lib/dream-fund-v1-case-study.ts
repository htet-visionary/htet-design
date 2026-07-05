export const dreamFundV1CaseStudyMeta = {
  title: "Dream Fund",
  eyebrow: "Product Design Case Study",
  description:
    "A dream-first companion that shows what you can safely spend and how close you are to the goals that matter.",
  year: "2026",
  roles: ["UX Research", "UI Design", "AI Prototyping"],
  tools: ["Figma", "Cursor", "Google NotebookLM", "ChatGPT", "Gemini"],
  heroImage: "/dream-fund/case-study-hero.png",
  heroImageAlt:
    "Dream Fund app mockups showing the home dashboard and dream capture flow alongside clover growth illustrations",
} as const;

export const dreamFundV1Problem = {
  title: "💭 The Problem with Traditional Budgeting",
  paragraphs: [
    "Most budgeting apps focus on the past. They track every expense, trigger financial guilt over small joys, and fail to show if your dreams are actually on track.",
  ],
  pains: [
    "Tracking expenses feels exhausting and judgmental.",
    "Income and must-pay costs change every month.",
    "Emergency savings and goals compete in people's heads, not in one plan.",
  ],
} as const;

export const dreamFundV1ProductIdea = {
  title: "✨ Product Idea (The Solution)",
  paragraphs: [
    "Dream Fund puts your dreams first. Instead of tracking past mistakes, it looks forward. Set your essentials once, lock your emergency savings, and smart-allocate your income across your goals with total control. Instantly see your guilt-free spending money alongside live progress on your dreams.",
  ],
  outcome: "Shifting your mindset from “Where did my money go?” to “Can I still achieve my dreams?”",
} as const;

export const dreamFundV1Persona = {
  name: "Jennie Kim",
  title: "The Dream Chaser",
  age: 28,
  role: "Marketing executive",
  location: "Tokyo, Japan",
  income: "¥600,000 ~ ¥800,000 / month",
  summary:
    "Busy professional with variable income. She pays her bills but postpones trips and purchases because she never feels confident spending.",
  quote: "I don't want to budget better. I want to achieve my dreams.",
} as const;

export const dreamFundV1UserFlow = {
  title: "User flow",
  description: "The v1 prototype follows one calm loop — plan, fuel, check progress.",
} as const;

export type DreamFundMockupItem = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

// export const dreamFundV1MockupsIntro =
//   "Key screens from the v1 prototype — onboarding, dream capture, fuel, allocation, and insights.";

export const dreamFundV1Mockups: readonly DreamFundMockupItem[] = [
  {
    id: "mockup-onboarding",
    src: "/dream-fund/mockups/01-onboarding.png",
    alt: "Dream Fund onboarding welcome screen with Plan it, Fuel it, Achieve it tagline",
    label: "Onboarding",
  },
  {
    id: "mockup-dream-name",
    src: "/dream-fund/mockups/02-dream-name.png",
    alt: "Dream capture screen asking what's your dream with name and story fields",
    label: "Dream name & story",
  },
  {
    id: "mockup-target-budget",
    src: "/dream-fund/mockups/03-target-budget.png",
    alt: "Dream capture screen for setting a target budget in yen",
    label: "Target budget",
  },
  {
    id: "mockup-target-date",
    src: "/dream-fund/mockups/04-target-date.png",
    alt: "Dream capture screen for setting a target achievement date",
    label: "Target date",
  },
  {
    id: "mockup-home",
    src: "/dream-fund/mockups/05-home.png",
    alt: "Dream Fund home dashboard showing Japan Trip progress and guilt-free spending",
    label: "Home dashboard",
  },
  {
    id: "mockup-add-fuel-confirmation",
    src: "/dream-fund/mockups/06-add-fuel-confirmation.png",
    alt: "Add fuel confirmation modal showing dream progress from 73% to 75%",
    label: "Add fuel confirmation",
  },
  {
    id: "mockup-dreams",
    src: "/dream-fund/mockups/07-dreams.png",
    alt: "Dreams screen listing active goals with progress cards",
    label: "Dreams",
  },
  {
    id: "mockup-dream-detail",
    src: "/dream-fund/mockups/08-dream-detail.png",
    alt: "Dream detail drawer for Weekend Camera showing savings progress and actions",
    label: "Dream detail",
  },
  {
    id: "mockup-smart-allocation",
    src: "/dream-fund/mockups/08-smart-allocation.png",
    alt: "Smart allocation screen for splitting a top-up across dreams",
    label: "Smart allocation",
  },
  {
    id: "mockup-select-dreams",
    src: "/dream-fund/mockups/09-select-dreams.png",
    alt: "Select dreams modal for choosing goals to fuel",
    label: "Select dreams",
  },
  {
    id: "mockup-insights",
    src: "/dream-fund/mockups/10-insights.png",
    alt: "Insights dashboard with savings growth chart and key metrics",
    label: "Insights",
  },
] as const;

export const dreamFundV1UxPrinciples = [
  {
    title: "Dreams first",
    description: "Screens show what you're working toward — not a ledger of mistakes.",
  },
  {
    title: "Confidence over guilt",
    description: "One safe-to-spend number and gentle progress, not red warnings.",
  },
  {
    title: "Lightweight updates",
    description: "Fuel and smart split replace daily category tracking.",
  },
  {
    title: "Celebrate harvests",
    description: "Completed dreams are visible wins, not afterthoughts.",
  },
] as const;

export const dreamFundV1Tools = [
  {
    category: "Design & Development",
    tools: ["Figma", "Cursor"],
  },
  {
    category: "Research & Microcopy",
    tools: ["ChatGPT", "Gemini"],
  },
  {
    category: "Idea Summary",
    tools: ["Google NotebookLM"],
  },
] as const;
