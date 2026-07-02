export const dreamFundV1CaseStudyMeta = {
  title: "Dream Fund",
  eyebrow: "Product Design Case Study",
  description:
    "A dream-first financial companion that helps people organize money simply, know what they can safely spend, and achieve goals with confidence — not guilt.",
  year: "2026",
  roles: ["UX research", "UI design", "Prototyping"],
} as const;

export const dreamFundV1Problem = {
  title: "Problem",
  paragraphs: [
    "Most budgeting apps are built around past spending. They ask users to categorize every coffee, feel guilty about small purchases, and maintain perfect discipline — even when income and bills change every month.",
    "People like Jennie don't lack motivation. They lack confidence. They postpone travel, gear, and meaningful goals because no product clearly answers: “Is it still safe to spend?” Dreams keep sliding to “someday” while anxiety about money stays constant.",
  ],
  pains: [
    "Expense tracking feels exhausting and judgmental.",
    "Income and must-pay costs shift month to month.",
    "Emergency savings compete with goals in people's heads — not in a clear plan.",
    "Dream progress is invisible until it's too late to adjust.",
  ],
} as const;

export const dreamFundV1ProductIdea = {
  title: "Product idea",
  paragraphs: [
    "Dream Fund reframes personal finance around dreams first. Users set up income and essentials once, protect emergency savings, then see a single guilt-free spending number and live progress toward the dreams that matter.",
    "Money updates stay lightweight — add fuel to a dream, run a smart split when income lands, or check home for today's focus. The product celebrates harvested dreams instead of punishing everyday spending.",
  ],
  outcome:
    "Shift from “Where did my money go?” to “Can I still achieve my dreams?” — with supportive timelines instead of red warning states.",
} as const;

export const dreamFundV1Persona = {
  name: "Jennie Kim",
  title: "The Dream Chaser",
  age: 28,
  role: "Marketing executive",
  location: "Tokyo, Japan",
  income: "¥260,000–¥350,000 / month",
  summary:
    "Busy professional with changing income. She works hard, pays her bills, and still ends each year without the trips or purchases she cared about — not because she can't afford them, but because she never feels confident spending.",
  quote:
    "I don't want to become better at budgeting. I want to become better at achieving my dreams.",
} as const;

export const dreamFundV1UserStories = [
  {
    id: "01",
    want: "set up my income and must-pay costs once",
    benefit: "I immediately know what is actually available for life and dreams.",
  },
  {
    id: "02",
    want: "see one guilt-free spending number on home",
    benefit: "I can enjoy today without worrying I'm stealing from my goals.",
  },
  {
    id: "03",
    want: "create dreams with a photo, target, and deadline",
    benefit: "my goals feel real and worth protecting.",
  },
  {
    id: "04",
    want: "add fuel or smart-split new income across dreams",
    benefit: "my plan stays current when life changes.",
  },
  {
    id: "05",
    want: "see active and completed dreams in one garden",
    benefit: "progress and wins stay visible and motivating.",
  },
] as const;

export const dreamFundV1UxPrinciples = [
  {
    title: "Dreams first",
    description:
      "Every screen reinforces what users are working toward — not a ledger of past mistakes.",
  },
  {
    title: "Confidence over guilt",
    description:
      "Show what is safe to spend and how choices affect dreams, without harsh judgment.",
  },
  {
    title: "Lightweight updates",
    description:
      "Fuel, smart split, and home check-ins replace tedious category tracking.",
  },
  {
    title: "Protection before pleasure",
    description:
      "Must-pay and emergency funds are reserved first so the plan survives real life.",
  },
  {
    title: "Celebrate harvests",
    description:
      "Completed dreams are first-class — saving should feel rewarding, not stressful.",
  },
] as const;

export const dreamFundV1CoreFeatures = [
  {
    title: "Dream-focused home",
    description:
      "Hero card for the primary dream with progress, milestone, timeline, and Add Fuel — plus guilt-free spending and emergency fund at a glance.",
  },
  {
    title: "Dream garden",
    description:
      "Active and completed tabs, photo-backed focus cards, stack layout, and priority sorting by deadline.",
  },
  {
    title: "Smart Allocation",
    description:
      "Split top-up amount across chosen dreams while showing guilt-free spending that updates as you allocate.",
  },
  {
    title: "Add Fuel",
    description:
      "Fast path to move money into a specific dream with optional source and note.",
  },
  {
    title: "Dream capture onboarding",
    description:
      "Polaroid-style dream setup — name, story, amount, currency, and target date in a calm step-by-step flow.",
  },
  {
    title: "Insights clover",
    description:
      "At-a-glance income added, dream achievement, total saved, and timeline in a motivational summary grid.",
  },
] as const;

export const dreamFundV1HifiPlaceholder = {
  title: "Hi-fi mockups",
  description:
    "High-fidelity screens from the v1 prototype will be added here — home, dream garden, smart split, and onboarding.",
} as const;
