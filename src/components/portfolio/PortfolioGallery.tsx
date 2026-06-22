"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  portfolioGalleryCategories,
  type PortfolioGalleryCategory,
  type PortfolioGalleryItem,
} from "@/lib/portfolio-content";

type PortfolioGalleryProps = {
  items: readonly PortfolioGalleryItem[];
  intro: string;
};

export function PortfolioGallery({ items, intro }: PortfolioGalleryProps) {
  const dialogTitleId = useId();
  const [activeCategory, setActiveCategory] = useState<PortfolioGalleryCategory>(
    portfolioGalleryCategories[0].id,
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const activeCategoryLabel =
    portfolioGalleryCategories.find((category) => category.id === activeCategory)
      ?.label ?? intro;

  const activeItem = activeIndex === null ? null : filteredItems[activeIndex];

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || filteredItems.length === 0) {
        return null;
      }

      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || filteredItems.length === 0) {
        return null;
      }

      return (current + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

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

  useEffect(() => {
    setActiveIndex(null);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  return (
    <div className="v-portfolio-gallery">
      <div className="v-portfolio-gallery__toolbar">
        <p className="v-portfolio-gallery__intro">
          {activeCategory === "all" ? intro : activeCategoryLabel}
        </p>

        <div className="v-portfolio-gallery__filter">
          <button
            type="button"
            className="v-portfolio-gallery__filter-toggle"
            aria-expanded={filterOpen}
            aria-controls="portfolio-gallery-filters"
            onClick={() => setFilterOpen((open) => !open)}
          >
            sort by · category
          </button>

          <div
            id="portfolio-gallery-filters"
            className={[
              "v-portfolio-gallery__filter-panel",
              filterOpen ? "v-portfolio-gallery__filter-panel--open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {portfolioGalleryCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={[
                  "v-portfolio-gallery__filter-option",
                  activeCategory === category.id
                    ? "v-portfolio-gallery__filter-option--active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  setActiveCategory(category.id);
                  setFilterOpen(false);
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="v-portfolio-gallery__scroller" ref={scrollerRef}>
        <ul className="v-portfolio-gallery__track" aria-label="Photo gallery">
          {filteredItems.map((item, index) => (
            <li
              key={item.id}
              className={[
                "v-portfolio-gallery__item",
                item.aspect === "square" ? "v-portfolio-gallery__item--square" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                type="button"
                className="v-portfolio-gallery__trigger"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open photo: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={768}
                  height={item.aspect === "square" ? 768 : 1024}
                  unoptimized
                  sizes="11rem"
                  className="v-portfolio-gallery__thumb"
                  style={{ objectPosition: item.objectPosition }}
                />
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
            <div className="v-portfolio-gallery__lightbox-header">
              <button
                type="button"
                className="v-portfolio-gallery__lightbox-close"
                onClick={closeLightbox}
              >
                close
              </button>
            </div>

            <div className="v-portfolio-gallery__lightbox-stage">
              {filteredItems.length > 1 ? (
                <button
                  type="button"
                  className="v-portfolio-gallery__lightbox-nav-btn v-portfolio-gallery__lightbox-nav-btn--prev"
                  onClick={showPrevious}
                  aria-label="Previous photo"
                >
                  <ChevronLeft
                    className="v-portfolio-gallery__lightbox-nav-icon"
                    aria-hidden
                    strokeWidth={2}
                  />
                </button>
              ) : null}

              <figure className="v-portfolio-gallery__lightbox-figure">
                <div
                  className={[
                    "v-portfolio-gallery__lightbox-frame",
                    activeItem.aspect === "square"
                      ? "v-portfolio-gallery__lightbox-frame--square"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 92vw, 560px"
                    className="v-portfolio-gallery__lightbox-image"
                    style={{ objectPosition: activeItem.objectPosition }}
                    priority
                  />
                </div>
              </figure>

              {filteredItems.length > 1 ? (
                <button
                  type="button"
                  className="v-portfolio-gallery__lightbox-nav-btn v-portfolio-gallery__lightbox-nav-btn--next"
                  onClick={showNext}
                  aria-label="Next photo"
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
                {activeItem.caption}
              </h3>
              <p className="v-portfolio-gallery__lightbox-meta">
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(filteredItems.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
