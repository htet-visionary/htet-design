export const portfolioProfile = {
  name: "Htet Htet Aung",
  title: "Product UI/UX Designer",
  bio: "I am a nature lover who always looks for inner peace and happiness. I love traveling and exploring new experiences. I also enjoy spending time with my family, friends, colleagues, and my toy collection.",
  email: "htet2024visionary@gmail.com",
  heroImage: "/portfolio/hero.png",
  cvHref: "/portfolio/cv.pdf",
};

export const portfolioSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/htet-htet-aung-0073931b8/",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/htethtetaung_ucsy16",
  },
] as const;

export const portfolioHighlights = [
  {
    label: "Technical Skills",
    text: "Expert in Figma, prototyping, and design-to-dev handoff.",
  },
  {
    label: "Design & Code",
    text: "Strong knowledge of HTML, CSS, and React.",
  },
  {
    label: "AI-Powered",
    text: "Using Generative AI to boost creativity and efficiency.",
  },
  {
    label: "Language",
    text: "Certified JLPT N2 and English B2 Level.",
  },
] as const;

export const skillCategories = [
  {
    title: "Design & Strategy",
    items: [
      "UI/UX Design",
      "Product Design",
      "Design Systems",
      "Design Thinking & Problem Solving",
      "Systematic Design",
      "Accessibility",
    ],
  },
  {
    title: "Research",
    items: [
      "User Research & Analysis",
      "User Flows",
      "Wireframing & Prototyping",
      "UI Testing & Feedback Loops",
    ],
  },
  {
    title: "Visual & Interface",
    items: [
      "Responsive Web Design",
      "Mobile App Design",
      "Visual Design",
      "Presentation Design",
    ],
  },
] as const;

export const portfolioNavItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "beyond-work", label: "Activities" },
  { id: "contact", label: "Contact" },
] as const;

export const workPlaceholders = [
  {
    title: "Product Experience",
    description:
      "End-to-end UI/UX for a digital product — research, flows, and polished interfaces.",
    tag: "Case study",
    year: "2024",
    roles: ["UX research", "UI design", "Prototyping"],
  },
  {
    title: "Design System",
    description:
      "Scalable component library with tokens, patterns, and documentation for cross-team use.",
    tag: "Systems",
    year: "2024",
    roles: ["Design systems", "Documentation", "Tokens"],
  },
  {
    title: "Mobile App",
    description:
      "Responsive mobile experience with prototyping, testing, and iterative refinement.",
    tag: "Mobile",
    year: "2023",
    roles: ["Mobile UI", "Prototyping", "Testing"],
  },
] as const;

export const galleryPlaceholders = [
  { id: "gallery-1", aspect: "tall", caption: "Travel & nature" },
  { id: "gallery-2", aspect: "wide", caption: "Family moments" },
  { id: "gallery-3", aspect: "square", caption: "Toy collection" },
  { id: "gallery-4", aspect: "square", caption: "Exploring cities" },
  { id: "gallery-5", aspect: "wide", caption: "Weekend walks" },
  { id: "gallery-6", aspect: "tall", caption: "Quiet mornings" },
] as const;

export const activitiesIntro =
  "Travel, nature, family time, and my toy collection — moments that keep creativity grounded.";
