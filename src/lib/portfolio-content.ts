import { designSystemBase } from "./navigation";

export const portfolioProfile = {
  name: "Htet Htet Aung",
  title: "Product UI/UX Designer",
  heroDisciplines: ["Product", "UI/UX", "Design Systems"],
  heroHeadline: ["Htet's", "Portfolio"],
  bio: "I translate complex requirements into intuitive, functional interfaces through systematic design and iterative prototyping. My focus is on building cohesive design systems that bridge the gap between user needs and technical implementation, ensuring clarity and consistency across every digital touchpoint.",
  email: "htet2024visionary@gmail.com",
  heroImage: "/portfolio/hero-photo.png",
  heroIllustration: "/portfolio/hero-illustration.png",
  cvHref: "/portfolio/cv.pdf",
};

export const portfolioSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/htet-htet-aung-0073931b8/",
    icon: "/portfolio/social/linkedin.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thaethae_0",
    icon: "/portfolio/social/instagram.png",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/htethtetaung_ucsy16",
    icon: "/portfolio/social/behance.png",
  },
] as const;

export const portfolioHighlights = [
  {
    label: "Product Design",
    text: "Expert in Figma, wireframing, prototyping, and design-to-dev handoff.",
    chips: ["UI/UX Design", "Responsive Web & Mobile", "UI Testing & Feedback Loops"],
  },
  {
    label: "Design System & Frontend",
    text: "Experienced in HTML, CSS, and React, now developing AI-powered design systems.",
    chips: ["Tokens & Components", "Accessibility", "Design System Documentation"],
  },
  {
    label: "AI-powered Workflow",
    text: "Applying Generative AI to accelerate design exploration, and development.",
    chips: ["AI-assisted Design", "Prompt Engineering"],
  },
] as const;

export const portfolioNavItems = [
  { id: "about-bio", label: "About" },
  { id: "work", label: "Work" },
  { id: "beyond-work", label: "Activities" },
  { id: "contact", label: "Contact" },
] as const;

export const workPlaceholders = [
  {
    title: "Dream Fund",
    description:
      "Dream-first financial companion helping users achieve goals with confidence.",
    tag: "Product Design Case Study",
    year: "2026",
    roles: ["UX Research", "・", "UI Design", "・", "AI Prototyping"],
    thumb: {
      src: "/portfolio/work/dream-fund.png",
      alt: "Dream Fund case study hero with brand values and home screen prototype",
    },
    href: "/dream-fund",
  },
  {
    title: "Visionary Design System",
    description:
      "Scalable component library with tokens and patterns, for cross-team use.",
    tag: "Design Systems",
    year: "2026",
    roles: ["Design Agent", "・", "Tokens", "・", "AI Documentation"],
    thumb: {
      src: "/portfolio/work/design-system.png",
      alt: "Visionary Design System overview with colors, components, and token architecture",
    },
    href: designSystemBase,
    openInNewTab: true,
  },
  {
    title: "Lucky Charm",
    description:
      "Character-driven lifestyle brand focused on storytelling, and delightful products.",
    tag: "Brand & Character Experience",
    year: "2026",
    roles: ["Branding", "・", "Product Concept"],
    thumb: {
      src: "/portfolio/work/lucky-charm.png",
      alt: "Lucky Charm coming soon placeholder with clover mark",
    },
    comingSoon: true,
  },
] as const;

export const portfolioGalleryCategories = [
  { id: "all", label: "All moments" },
  { id: "travel", label: "Travel & nature" },
  { id: "city", label: "City life" },
  { id: "everyday", label: "Everyday joy" },
] as const;

export type PortfolioGalleryCategory =
  (typeof portfolioGalleryCategories)[number]["id"];

export type PortfolioGalleryItem = {
  id: string;
  src: string;
  alt: string;
  aspect: "tall" | "square" | "wide";
  caption: string;
  objectPosition: string;
  category: Exclude<PortfolioGalleryCategory, "all">;
};

export const portfolioGallery: readonly PortfolioGalleryItem[] = [
  {
    id: "gallery-1",
    src: "/portfolio/gallery/07-capybara.png",
    alt: "A capybara plush toy held beside a real capybara on a gravel path",
    aspect: "tall",
    caption: "Little Capybara",
    objectPosition: "50% 45%",
    category: "everyday",
  },
  {
    id: "gallery-2",
    src: "/portfolio/gallery/08-soft-serve.png",
    alt: "Blue and white soft-serve ice cream in a waffle cone on a rainy day",
    aspect: "tall",
    caption: "Exploring cities",
    objectPosition: "50% 40%",
    category: "city",
  },
  {
    id: "gallery-3",
    src: "/portfolio/gallery/09-sky-moon.png",
    alt: "Blue sky with golden clouds and a crescent moon",
    aspect: "tall",
    caption: "Quiet mornings",
    objectPosition: "50% 35%",
    category: "travel",
  },
  {
    id: "gallery-4",
    src: "/portfolio/gallery/10-beach-sunset.png",
    alt: "Silhouette on a beach at sunset with sun rays through the clouds",
    aspect: "tall",
    caption: "Travel & nature",
    objectPosition: "50% 50%",
    category: "travel",
  },
  {
    id: "gallery-5",
    src: "/portfolio/gallery/11-tokyo-tower.png",
    alt: "Tokyo Tower framed by trees against a cloudy sky",
    aspect: "tall",
    caption: "Weekend walks",
    objectPosition: "50% 40%",
    category: "city",
  },
  {
    id: "gallery-8",
    src: "/portfolio/gallery/14-cherry-blossoms.png",
    alt: "Cherry blossoms lit at night with a tall building behind the trees",
    aspect: "tall",
    caption: "Night blossoms",
    objectPosition: "50% 40%",
    category: "city",
  },
  {
    id: "gallery-10",
    src: "/portfolio/gallery/16-gromit-arcade.png",
    alt: "A Gromit plush toy held in front of a UFO catcher arcade machine",
    aspect: "tall",
    caption: "Toy collection",
    objectPosition: "50% 42%",
    category: "everyday",
  },
  {
    id: "gallery-11",
    src: "/portfolio/gallery/17-kitten.png",
    alt: "A small ginger and white kitten sleeping curled up in a striped pet bed",
    aspect: "tall",
    caption: "Quiet moments",
    objectPosition: "50% 48%",
    category: "everyday",
  },
];

export const activitiesIntro =
  "Travel, nature, family time, and my toy collection — moments that keep creativity grounded.";
