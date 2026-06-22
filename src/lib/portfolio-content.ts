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

export const portfolioGallery = [
  {
    id: "gallery-1",
    src: "/portfolio/gallery/07-capybara.png",
    alt: "A capybara plush toy held beside a real capybara on a gravel path",
    aspect: "tall",
    caption: "Toy collection",
    objectPosition: "50% 45%",
  },
  {
    id: "gallery-2",
    src: "/portfolio/gallery/08-soft-serve.png",
    alt: "Blue and white soft-serve ice cream in a waffle cone on a rainy day",
    aspect: "tall",
    caption: "Exploring cities",
    objectPosition: "50% 40%",
  },
  {
    id: "gallery-3",
    src: "/portfolio/gallery/09-sky-moon.png",
    alt: "Blue sky with golden clouds and a crescent moon",
    aspect: "tall",
    caption: "Quiet mornings",
    objectPosition: "50% 35%",
  },
  {
    id: "gallery-4",
    src: "/portfolio/gallery/10-beach-sunset.png",
    alt: "Silhouette on a beach at sunset with sun rays through the clouds",
    aspect: "tall",
    caption: "Travel & nature",
    objectPosition: "50% 50%",
  },
  {
    id: "gallery-5",
    src: "/portfolio/gallery/11-tokyo-tower.png",
    alt: "Tokyo Tower framed by trees against a cloudy sky",
    aspect: "tall",
    caption: "Weekend walks",
    objectPosition: "50% 40%",
  },
  {
    id: "gallery-6",
    src: "/portfolio/gallery/12-tennis.png",
    alt: "Htet Htet Aung playing tennis on an indoor blue court",
    aspect: "square",
    caption: "Stay active",
    objectPosition: "50% 45%",
  },
  {
    id: "gallery-7",
    src: "/portfolio/gallery/13-daisies.png",
    alt: "A dense cluster of white daisies with yellow centers",
    aspect: "square",
    caption: "Family moments",
    objectPosition: "50% 50%",
  },
] as const;

export const activitiesIntro =
  "Travel, nature, family time, and my toy collection — moments that keep creativity grounded.";
