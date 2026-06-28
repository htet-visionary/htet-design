export const dreamFundCaseStudyMeta = {
  title: "Dream Fund",
  eyebrow: "Product Design Case Study",
  tagline: "A financial companion for achieving dreams — not tracking pennies.",
  description:
    "Dream Fund helps people like Jennie answer one question: “Can I still achieve my dreams?” Through simple money organization, adaptive planning, and positive reinforcement — not guilt-driven expense tracking.",
  year: "2026",
  roles: ["UX research", "UI design", "Prototyping"],
} as const;

export const dreamFundPersona = {
  name: "Jennie",
  title: "The Dream Chaser",
  basics: [
    { label: "Age", value: "28" },
    { label: "Occupation", value: "Marketing Executive" },
    { label: "Location", value: "Tokyo, Japan" },
    { label: "Monthly income", value: "¥260,000–¥350,000" },
    {
      label: "Lifestyle",
      value: "Busy office worker with changing income and expenses",
    },
  ],
  about: [
    "Jennie works hard every month. She earns money, pays bills, and handles unexpected expenses. But every year, she realizes the same thing — she still hasn't bought the things she wanted.",
    "She postpones her dreams because she's never confident enough to spend money. She doesn't want another budgeting app. She wants someone to answer one question: “Can I still achieve my dreams?”",
  ],
  goals: [
    "Buy things she truly wants without guilt.",
    "Travel more.",
    "Build emergency savings.",
    "Enjoy life while staying financially healthy.",
    "Stop worrying about money every month.",
  ],
  frustrations: [
    "Budgeting apps focus too much on past spending.",
    "Manual expense tracking is exhausting.",
    "Income changes every month.",
    "Bills aren't always fixed.",
    "She never knows how much she can safely spend.",
    "Dreams are always delayed.",
  ],
  needs: [
    "Organize her money simply.",
    "Adapt to changing income.",
    "Protect essential expenses.",
    "Know what she can safely spend.",
    "Achieve dreams with confidence.",
  ],
  quote:
    "I don't want to become better at budgeting. I want to become better at achieving my dreams.",
} as const;

export const dreamFundUserStories = [
  {
    id: "01",
    want: "set up my income and essential payments once",
    benefit: "I can immediately understand how much money is actually available.",
  },
  {
    id: "02",
    want: "quickly record whenever money comes in",
    benefit: "my financial plan stays up to date.",
  },
  {
    id: "03",
    want: "quickly record when money goes out, without filling in complicated categories",
    benefit: "I can continue using the app consistently.",
  },
  {
    id: "04",
    want: "know how much I can safely spend today",
    benefit: "I can enjoy life without worrying about my future goals.",
  },
  {
    id: "05",
    want: "create multiple dreams",
    benefit: "I can plan what matters most to me.",
  },
  {
    id: "06",
    want: "see how today's financial changes affect my dreams",
    benefit: "I can make better decisions.",
  },
  {
    id: "07",
    want: "keep emergency money separate",
    benefit: "unexpected situations don't destroy my plans.",
  },
  {
    id: "08",
    want: "save toward a shared dream with my partner",
    benefit: "we can achieve our goals together.",
  },
  {
    id: "09",
    want: "celebrate every completed dream",
    benefit: "saving feels rewarding instead of stressful.",
  },
  {
    id: "10",
    want: "Dream Fund to become my long-term financial companion",
    benefit: "I always know my next step.",
  },
] as const;

export const dreamFundInformationArchitecture = `Dream Fund
│
├── Home
│   ├── Available to Spend
│   ├── Active Dream
│   ├── Emergency Fund
│   ├── Must-pay
│   ├── Recent Updates
│   └── + Money Changed
│
├── Dreams
│   ├── Active Dreams
│   ├── Completed Dreams
│   ├── Shared Dreams
│   ├── Community Dreams (Future)
│   └── Create Dream
│
├── Money
│   ├── Money Coming In
│   ├── Money Going Out
│   ├── Must-pay
│   ├── Emergency Fund
│   ├── History
│   └── Monthly Overview
│
└── Profile
    ├── Preferences
    ├── Notifications
    ├── Currency
    ├── Security
    └── About`;

export const dreamFundHomeScreen = `🌱 Good Morning Jennie

──────────────────

Available to Spend

¥2,680

──────────────────

Dream

Japan Trip

73%

──────────────────

Emergency Fund

Healthy

──────────────────

Must-pay

Electricity

3 days left

──────────────────

Recent Update

+ Salary

- Shopping

──────────────────

＋ Money Changed`;

export const dreamFundFlows = [
  {
    id: "money",
    title: "Money flow",
    diagram: `Money Changed

↓

What happened?

🟢 Money Came In
🔴 Money Went Out
🟡 Must-pay Changed
🔵 Dream Updated
⚪ Nothing Changed`,
  },
  {
    id: "dreams",
    title: "Dreams flow",
    diagram: `Dream

↓

Create Dream

↓

Target Amount

↓

Priority

↓

Optional Deadline

↓

Done`,
  },
  {
    id: "partner",
    title: "Partner flow",
    diagram: `Create Dream

↓

Personal
or
Partner

↓

Invite Partner

↓

Shared Progress`,
  },
  {
    id: "community",
    title: "Future community flow",
    diagram: `Community Dream

↓

Choose Project

↓

Contribute

↓

Community Progress

↓

Completed`,
  },
] as const;

export const dreamFundCoreNavigation = [
  { icon: "🏠", label: "Home" },
  { icon: "🎯", label: "Dreams" },
  { icon: "💰", label: "Money" },
  { icon: "👤", label: "Profile" },
] as const;

export const dreamFundCoreExperience = `Money Comes In

↓

Must-pay Protected

↓

Emergency Protected

↓

Available to Spend Calculated

↓

Dream Progress Updated

↓

Confident Decision

↓

Dream Achieved

↓

Next Dream`;

export const dreamFundCoreFeatures = [
  {
    title: "Available to Spend",
    description:
      "Calculates what Jennie can safely spend today after must-pay and emergency funds are protected.",
  },
  {
    title: "Money Changed",
    description:
      "A lightweight entry point for recording money in, money out, must-pay changes, or dream updates — without complicated categories.",
  },
  {
    title: "Dream tracking",
    description:
      "Multiple dreams with target amounts, priority, and optional deadlines — progress updates as finances change.",
  },
  {
    title: "Emergency fund",
    description:
      "Keeps emergency money separate so unexpected situations don't destroy long-term plans.",
  },
  {
    title: "Must-pay protection",
    description:
      "Essential payments are reserved first so bills and fixed costs never surprise the plan.",
  },
  {
    title: "Shared & community dreams",
    description:
      "Partner collaboration for shared goals today; community crowdfunding documented for a future phase.",
  },
] as const;

export const dreamFundUxPrinciples = [
  "Dreams first — every screen reinforces what users are working toward, not what they spent.",
  "Confidence over guilt — show what is safe to spend and how dreams are affected, not harsh red balances.",
  "Lightweight data entry — quick money updates without exhausting category management.",
  "Adapt to real life — income and bills change; the plan adjusts instead of breaking.",
  "Celebrate progress — completed dreams feel rewarding, not stressful.",
  "Long-term companion — clear next steps so users always know where they stand.",
] as const;

export const dreamFundMvpScope = [
  "Home with Available to Spend, active dream, emergency fund, must-pay, and Money Changed entry.",
  "Dreams tab — create, track, and complete personal dreams with priority and deadlines.",
  "Money tab — record money in/out, must-pay, emergency fund, and monthly overview.",
  "Income and essential payment setup with adaptive saveable balance.",
  "Supportive dream impact when spending changes — adjusted timelines, not guilt.",
  "Partner shared dreams documented; community dreams scoped for post-MVP.",
  "Mobile-friendly UI using the Dream Fund theme within the Visionary Design System.",
] as const;

export const dreamFundProcess = [
  {
    step: "01",
    title: "Persona & stories",
    description:
      "Defined Jennie — The Dream Chaser — and ten user stories around confidence, simplicity, and dream achievement.",
  },
  {
    step: "02",
    title: "Product philosophy",
    description:
      "Shifted from expense-first budgeting to a dream-first companion that answers “Can I still achieve my dreams?”",
  },
  {
    step: "03",
    title: "Architecture & IA",
    description:
      "Structured navigation (Home, Dreams, Money, Profile), home screen hierarchy, and core money-to-dream flows.",
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
    label: "Home — available to spend",
    blocks: ["hero", "stat", "stat", "cta"] as const,
  },
  {
    id: "dreams",
    label: "Dreams — active & completed",
    blocks: ["header", "goal", "goal", "progress"] as const,
  },
  {
    id: "money",
    label: "Money — money changed",
    blocks: ["header", "row", "row", "cta"] as const,
  },
  {
    id: "profile",
    label: "Profile — preferences",
    blocks: ["header", "row", "row", "note"] as const,
  },
] as const;
