import Image from "next/image";
import { portfolioProfile } from "@/lib/portfolio-content";

type PortfolioHeroRevealProps = {
  photoSrc?: string;
  illustrationSrc?: string;
  alt: string;
};

export function PortfolioHeroReveal({
  photoSrc = portfolioProfile.heroImage,
  illustrationSrc = portfolioProfile.heroIllustration,
  alt,
}: PortfolioHeroRevealProps) {
  return (
    <div className="v-portfolio-hero-reveal">
      <Image
        src={photoSrc}
        alt={alt}
        fill
        priority
        unoptimized
        sizes="(max-width: 767px) 72vw, 26rem"
        className="v-portfolio-hero-reveal__photo"
        draggable={false}
      />

      <div className="v-portfolio-hero-reveal__illustration" aria-hidden>
        <Image
          src={illustrationSrc}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 767px) 72vw, 26rem"
          className="v-portfolio-hero-reveal__illustration-image"
          draggable={false}
        />
      </div>

      <p className="v-portfolio-hero-reveal__status" aria-live="polite">
        <span className="v-portfolio-hero-reveal__status-photo">Original photo</span>
        <span className="v-portfolio-hero-reveal__status-illustration">
          Watercolor illustration
        </span>
      </p>

      <span className="v-portfolio-hero-reveal__hint">
        Hover to see the original photo
      </span>
    </div>
  );
}
