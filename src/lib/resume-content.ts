export const resumeProfile = {
  name: "HTET HTET AUNG",
  title: "Product Designer",
  tagline: "Product UI/UX・Design Systems・AI-assisted Design",
  location: "Tokyo, Japan",
  email: "htet2024visionary@gmail.com",
  phone: "080-2894-7074",
  website: "https://htet-design.vercel.app",
} as const;

export const resumeSummary = [
  "Product Designer with 4+ years of experience designing digital products across Japan and Myanmar. Passionate about creating intuitive user experiences through human-centered design, product thinking, and scalable design systems.",
  "Experienced in collaborating with product managers and engineers throughout the product development lifecycle, from user flows and wireframes to high-fidelity interfaces and developer handoff. Strong understanding of front-end technologies enables effective communication with engineering teams and supports practical, implementation-ready design solutions.",
  "Interested in AI-assisted product design, accessibility, and building thoughtful digital experiences that solve real user problems.",
] as const;

export type ResumeExperience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: readonly string[];
};

export const resumeExperience: readonly ResumeExperience[] = [
  {
    role: "Product Designer",
    company: "KATIX Co., Ltd.",
    location: "Tokyo, Japan",
    period: "Aug 2025 – Present",
    highlights: [
      "Design responsive interfaces for desktop and mobile products supporting vehicle auction services.",
      "Create user flows, wireframes, high-fidelity UI designs, and interactive prototypes using Figma.",
      "Collaborate with product managers and engineers during Agile development cycles to deliver production-ready designs.",
      "Contribute to the company's design system by maintaining reusable UI components and improving design consistency.",
      "Prepare developer-ready specifications and design documentation to support efficient implementation.",
      "Produce presentation materials and visual assets that align with the company's brand guidelines.",
    ],
  },
  {
    role: "AI / IT Development Team Member",
    company: "SANSEN SHIMIZU Co., Ltd.",
    period: "Feb 2025 – Jul 2025",
    highlights: [
      "Designed landing pages and promotional interfaces for AI-related digital services.",
      "Assisted in creating visual assets and localized content for Japanese audiences.",
      "Collaborated with cross-functional teams to support digital product initiatives.",
    ],
  },
  {
    role: "Senior UI/UX Designer",
    company: "Lota Global Pte. Ltd.",
    period: "Feb 2024 – Nov 2024",
    highlights: [
      "Designed end-to-end user experiences for Learning Management Systems, CMS platforms, and e-commerce products.",
      "Conducted UX planning through user flows, wireframes, and interactive prototypes.",
      "Designed responsive interfaces for web applications and collaborated closely with development teams.",
      "Worked with stakeholders to translate business requirements into intuitive product experiences.",
    ],
  },
  {
    role: "Junior UI/Front-end Developer",
    company: "METATEAM Myanmar",
    period: "Dec 2021 – Nov 2023",
    highlights: [
      "Designed and implemented responsive web interfaces using HTML, CSS, JavaScript, and React.",
      "Collaborated with designers and engineers to translate UI designs into functional web pages.",
      "Built reusable interface components and maintained visual consistency across projects.",
      "Supported developer handoff through organized design files and implementation-ready assets.",
    ],
  },
] as const;

export type ResumeProject = {
  title: string;
  description: string;
};

export const resumeProjects: readonly ResumeProject[] = [
  {
    title: "Visionary Design System",
    description:
      "Designed and developed a scalable design system including design tokens, semantic color architecture, reusable components, accessibility guidelines, and documentation for multi-product consistency.",
  },
  {
    title: "Khooo — Smart Budget Product Concept",
    description:
      "Designed an end-to-end budgeting experience focused on psychology-driven money management, smart income allocation, and goal-based financial planning.",
  },
  {
    title: "AI Product Interfaces",
    description:
      "Designed responsive interfaces and landing pages supporting AI-powered digital products and internal business solutions.",
  },
] as const;

export type ResumeSkillGroup = {
  category: string;
  skills: readonly string[];
};

export const resumeSkills: readonly ResumeSkillGroup[] = [
  {
    category: "Product Design",
    skills: [
      "User Experience (UX)",
      "User Interface (UI)",
      "Product Thinking",
      "Interaction Design",
      "Information Architecture",
      "User Flow",
      "Wireframing",
      "Rapid Prototyping",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    category: "Design Systems",
    skills: [
      "Design Systems",
      "Component Libraries",
      "Design Tokens",
      "Documentation",
      "Figma Variables",
      "Design Consistency",
    ],
  },
  {
    category: "Tools",
    skills: ["Figma", "FigJam", "Adobe Creative Suite", "Notion", "Miro"],
  },
  {
    category: "Front-end",
    skills: ["HTML", "CSS", "React", "Developer Handoff"],
  },
  {
    category: "Workflow",
    skills: ["Agile", "Cross-functional Collaboration", "AI-assisted Design"],
  },
] as const;

export const resumeEducation = {
  degree: "Bachelor of Computer Science",
} as const;

export const resumeCertifications = [
  "JLPT N2",
  "Google Analytics",
  "Generative AI for UX",
  "Coursera UI/UX Courses",
] as const;

export const resumeLanguages = [
  { language: "Burmese", proficiency: "Native" },
  { language: "Japanese", proficiency: "JLPT N2" },
  { language: "English", proficiency: "Professional Working Proficiency (B2)" },
] as const;
