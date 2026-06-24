export const dreamFundCaseStudyMeta = {
  title: "Dream Fund",
  eyebrow: "Product Design Case Study",
  tagline: "Funding dreams, not tracking pennies.",
  description:
    "A goal-oriented budgeting product that helps people save toward specific dreams through positive reinforcement, supportive alerts, and clear timelines — not guilt-driven expense tracking.",
  year: "2026",
  roles: ["UX research", "UI design", "Prototyping"],
} as const;

export const dreamFundProblems = [
  "Many people struggle to save consistently for specific goals — money set aside often gets spent impulsively or absorbed by unexpected costs.",
  "Traditional budgeting apps reinforce guilt with harsh red balances and negative framing, leading to burnout and abandonment.",
  "Daily expense logging feels tedious; users need a lighter cadence such as weekly summaries without losing clarity.",
  "Fixed costs like rent, debt, and utilities make it hard to know how much is actually saveable each month.",
  "Without integrated bill reminders, mandatory payments disrupt savings plans when due dates are missed.",
] as const;

export const dreamFundProductIdea = [
  "Dream Fund is a goal-oriented financial management system that turns dreams — a watch, a trip, a special dinner — into funded realities through systematic saving.",
  "The product operates on three levels: individual goal tracking, partner collaboration for shared dreams, and crowdfunding for community projects.",
  "Unlike expense-first budgeting tools, Dream Fund prioritizes what users want to achieve and calculates realistic timelines from income minus mandatory costs.",
] as const;

export const dreamFundCoreFeatures = [
  {
    title: "Automated savings calculator",
    description:
      "Derives a saveable balance from total income minus mandatory must-pay expenses such as rent, utilities, and debt.",
  },
  {
    title: "Goal tracking & timelines",
    description:
      "Users set a specific dream and target amount; the app projects when the goal will be fully funded based on daily or monthly savings.",
  },
  {
    title: "Supportive adjustment alerts",
    description:
      "Overspending triggers encouragement — for example, “You’ll be three days late reaching your goal” — with an adjusted timeline instead of a harsh negative balance.",
  },
  {
    title: "Bill management view",
    description:
      "A due-date calendar surfaces upcoming mandatory payments so users reserve funds before deadlines.",
  },
  {
    title: "Collaborative saving",
    description:
      "Partners can save together toward shared dreams; crowdfunding supports larger collective goals and community projects.",
  },
  {
    title: "Minimalist categorization",
    description:
      "Broad categories with note-taking keep the interface focused on goals rather than scattered transaction detail.",
  },
] as const;

export const dreamFundUxPrinciples = [
  "Encouragement over guilt — celebrate progress and adjust timelines supportively when plans change.",
  "Dreams first — every screen reinforces what the user is working toward, not what they spent.",
  "Lightweight data entry — weekly summaries and simple inputs reduce tracking fatigue.",
  "Clarity before complexity — mandatory costs are separated from flexible spending so saveable balance is always visible.",
  "Positive visual language — growth-oriented green palette with warm accent highlights for momentum.",
] as const;

export const dreamFundMvpScope = [
  "Core goal creation, savings tracking, and timeline projection.",
  "Income and mandatory expense setup with saveable balance calculation.",
  "Supportive overspend alerts with automatic timeline adjustment.",
  "Bill due-date reminders in a dedicated calendar view.",
  "Simple, mobile-friendly UI using the Dream Fund theme within the Visionary Design System.",
  "Partner and crowdfunding flows documented for post-MVP phases.",
] as const;

export const dreamFundProcess = [
  {
    step: "01",
    title: "Problem framing",
    description:
      "Synthesized user pain points from budgeting research — inconsistency, guilt-driven UX, and data-entry fatigue.",
  },
  {
    step: "02",
    title: "Product blueprint",
    description:
      "Defined the three-tier model (individual, partners, crowdfunding) and mapped positive-reinforcement flows.",
  },
  {
    step: "03",
    title: "Architecture & IA",
    description:
      "Structured key data nodes, navigation (Home, Goals, Insights, Profile), and MVP screen inventory in an architecture deck.",
  },
  {
    step: "04",
    title: "Design system alignment",
    description:
      "Applied the Dream Fund theme — green primary with warm warning-toned accents — through Visionary semantic tokens.",
  },
  {
    step: "05",
    title: "Prototype & walkthrough",
    description:
      "Wireframe placeholders and a NotebookLM product walkthrough to validate flows before high-fidelity build.",
  },
] as const;

export const dreamFundMockups = [
  {
    id: "home",
    label: "Home — saveable balance",
    blocks: ["hero", "stat", "stat", "cta"] as const,
  },
  {
    id: "goals",
    label: "Goals — dream timeline",
    blocks: ["header", "goal", "goal", "progress"] as const,
  },
  {
    id: "bills",
    label: "Bills — due-date view",
    blocks: ["header", "calendar", "row", "row"] as const,
  },
  {
    id: "insights",
    label: "Insights — supportive alerts",
    blocks: ["header", "alert", "chart", "note"] as const,
  },
] as const;
