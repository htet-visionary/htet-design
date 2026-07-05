"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { DreamFundMockupItem } from "@/lib/dream-fund-v1-case-study";

type DreamFundMockupGalleryProps = {
  items: readonly DreamFundMockupItem[];
  intro?: string;
};

export function DreamFundMockupGallery({ items, intro }: DreamFundMockupGalleryProps) {
  const dialogTitleId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) {
        return null;
      }

      return (current - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) {
        return null;
      }

      return (current + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  return (
    <div className="v-portfolio-gallery v-dream-fund-mockup-gallery">
      {intro ? (
        <div className="v-portfolio-gallery__toolbar" data-reveal>
          <p className="v-portfolio-gallery__intro">{intro}</p>
        </div>
      ) : null}

      <div className="v-portfolio-gallery__scroller" ref={scrollerRef} data-reveal data-reveal-delay="100">
        <ul className="v-portfolio-gallery__track" aria-label="Prototype mockups">
          {items.map((item, index) => (
            <li key={item.id} className="v-portfolio-gallery__item v-dream-fund-mockup-gallery__item">
              <button
                type="button"
                className="v-dream-fund-mockup-gallery__trigger"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open mockup: ${item.label}`}
              >
                <span className="v-dream-fund-mockup-gallery__frame">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={768}
                    height={1024}
                    unoptimized
                    sizes="(max-width: 767px) 16rem, 20rem"
                    className="v-portfolio-gallery__thumb"
                  />
                </span>
                <span className="v-dream-fund-mockup-gallery__label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeItem ? (
        <div
          className="v-portfolio-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onClick={closeLightbox}
        >
          <div
            className="v-portfolio-gallery__lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="v-portfolio-gallery__lightbox-close"
              onClick={closeLightbox}
            >
              close
            </button>

            <div className="v-portfolio-gallery__lightbox-stage">
              {items.length > 1 ? (
                <button
                  type="button"
                  className="v-portfolio-gallery__lightbox-nav-btn v-portfolio-gallery__lightbox-nav-btn--prev"
                  onClick={showPrevious}
                  aria-label="Previous mockup"
                >
                  <ChevronLeft
                    className="v-portfolio-gallery__lightbox-nav-icon"
                    aria-hidden
                    strokeWidth={2}
                  />
                </button>
              ) : null}

              <figure className="v-portfolio-gallery__lightbox-figure">
                <div className="v-dream-fund-mockup-gallery__lightbox-frame">
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    width={768}
                    height={1024}
                    unoptimized
                    sizes="(max-width: 767px) 90vw, 22rem"
                    className="v-dream-fund-mockup-gallery__lightbox-image"
                    priority
                  />
                </div>
              </figure>

              {items.length > 1 ? (
                <button
                  type="button"
                  className="v-portfolio-gallery__lightbox-nav-btn v-portfolio-gallery__lightbox-nav-btn--next"
                  onClick={showNext}
                  aria-label="Next mockup"
                >
                  <ChevronRight
                    className="v-portfolio-gallery__lightbox-nav-icon"
                    aria-hidden
                    strokeWidth={2}
                  />
                </button>
              ) : null}
            </div>

            <div className="v-portfolio-gallery__lightbox-caption">
              <h3 id={dialogTitleId} className="v-portfolio-gallery__lightbox-title">
                {activeItem.label}
              </h3>
              <p className="v-portfolio-gallery__lightbox-meta">
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
