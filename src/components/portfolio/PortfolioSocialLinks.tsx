import { portfolioSocialLinks } from "@/lib/portfolio-content";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="6" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M9.44 12.84h2.93v9.33H9.44v-9.33zm1.47-4.97c.94 0 1.7.76 1.7 1.7a1.7 1.7 0 0 1-1.7 1.7 1.7 1.7 0 0 1 0-3.4zm3.89 4.97h2.81v1.27h.04c.39-.74 1.35-1.53 2.78-1.53 2.97 0 3.52 1.96 3.52 4.5v4.09h-2.93v-3.63c0-.87-.02-1.98-1.21-1.98-1.21 0-1.4.95-1.4 1.93v3.68h-2.93V12.84z"
      />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#1769FF" />
      <path
        fill="#FFFFFF"
        d="M12.44 10.9H9.05v4.78h3.39c1.98 0 3.15-1.06 3.15-2.69 0-1.47-.93-2.09-3.15-2.09zm-.29 8.02H9.05v8.12h3.39c2.75 0 4.36-1.43 4.36-4.23 0-2.52-1.28-3.89-4.36-3.89zm8.86 2.18h6.58c0-1.43-.59-2.44-2.36-2.44-1.56 0-2.47.78-2.68 2.44zm6.73 1.31H19.8c.12 1.84 1.25 2.68 3.01 2.68 1.52 0 2.4-.59 2.75-1.62h2.81c-.59 2.31-2.52 3.89-5.64 3.89-3.92 0-5.95-2.71-5.95-5.97 0-3.48 2.21-6.21 5.89-6.21 3.89 0 5.68 2.56 5.68 6.16 0 .33-.03.65-.06.97z"
      />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Behance: BehanceIcon,
} as const;

export function PortfolioSocialLinks() {
  return (
    <ul className="v-portfolio-contact__social">
      {portfolioSocialLinks.map((link) => {
        const Icon = socialIcons[link.label];

        return (
          <li key={link.label}>
            <a
              href={link.href}
              className="v-portfolio-contact__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
