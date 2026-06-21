import Image from "next/image";
import { portfolioSocialLinks } from "@/lib/portfolio-content";

export function PortfolioSocialLinks() {
  return (
    <ul className="v-portfolio-contact__social">
      {portfolioSocialLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="v-portfolio-contact__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            <Image
              src={link.icon}
              alt=""
              width={32}
              height={32}
              className="v-portfolio-contact__social-icon"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
