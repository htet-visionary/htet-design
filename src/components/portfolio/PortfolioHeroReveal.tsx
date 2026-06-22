import type { CSSProperties } from "react";
import Image from "next/image";
import { portfolioProfile } from "@/lib/portfolio-content";

const MOSAIC_COLS = 5;
const MOSAIC_ROWS = 7;

const mosaicCells = Array.from({ length: MOSAIC_COLS * MOSAIC_ROWS }, (_, index) => {
  const col = index % MOSAIC_COLS;
  const row = Math.floor(index / MOSAIC_COLS);
  const centerCol = (MOSAIC_COLS - 1) / 2;
  const centerRow = (MOSAIC_ROWS - 1) / 2;
  const distance = Math.hypot(col - centerCol, row - centerRow);

  return { col, row, delay: Math.round(distance * 42) };
});

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

      <div
        className="v-portfolio-hero-reveal__mosaic"
        aria-hidden
        style={
          {
            "--mosaic-cols": MOSAIC_COLS,
            "--mosaic-rows": MOSAIC_ROWS,
          } as CSSProperties
        }
      >
        <div className="v-portfolio-hero-reveal__mosaic-grid">
          {mosaicCells.map(({ col, row, delay }) => (
            <span
              key={`${col}-${row}`}
              className="v-portfolio-hero-reveal__mosaic-cell"
              style={
                {
                  "--mosaic-col": col,
                  "--mosaic-row": row,
                  "--mosaic-delay": `${delay}ms`,
                } as CSSProperties
              }
            >
              <span className="v-portfolio-hero-reveal__mosaic-tile">
                <Image
                  src={illustrationSrc}
                  alt=""
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 767px) 72vw, 26rem"
                  className="v-portfolio-hero-reveal__mosaic-image"
                  draggable={false}
                />
              </span>
            </span>
          ))}
        </div>
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
