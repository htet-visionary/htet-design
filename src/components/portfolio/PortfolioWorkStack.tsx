"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { workPlaceholders } from "@/lib/portfolio-content";

export function PortfolioWorkStack() {
  const stackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const stack = stackRef.current;

    if (!stack) {
      return;
    }

    const items = Array.from(
      stack.querySelectorAll<HTMLLIElement>(".v-portfolio-work-stack__item"),
    );

    const updateStackDepth = () => {
      const stuckIndices = items
        .map((item, index) => {
          const top = Number.parseFloat(getComputedStyle(item).top) || 0;

          return item.getBoundingClientRect().top <= top + 2 ? index : -1;
        })
        .filter((index) => index >= 0);

      const frontIndex = stuckIndices.at(-1) ?? -1;

      items.forEach((item, index) => {
        const card = item.querySelector<HTMLElement>(".v-portfolio-work-stack__card");

        if (!card) {
          return;
        }

        if (frontIndex === -1 || index >= frontIndex) {
          card.style.removeProperty("transform");
          card.style.removeProperty("filter");
          return;
        }

        const depth = frontIndex - index;
        const scale = Math.max(0.9, 1 - depth * 0.035);

        card.style.transform = `scale(${scale})`;
        card.style.filter = depth > 0 ? `brightness(${Math.max(0.94, 1 - depth * 0.03)})` : "";
      });
    };

    updateStackDepth();
    window.addEventListener("scroll", updateStackDepth, { passive: true });
    window.addEventListener("resize", updateStackDepth);

    return () => {
      window.removeEventListener("scroll", updateStackDepth);
      window.removeEventListener("resize", updateStackDepth);
    };
  }, []);

  return (
    <ul ref={stackRef} className="v-portfolio-work-stack" aria-label="Selected projects">
      {workPlaceholders.map((project, index) => (
        <li
          key={project.title}
          className="v-portfolio-work-stack__item"
          data-stack-index={index}
          data-reveal
          data-reveal-delay={String(index * 90)}
        >
          <article className="v-portfolio-work-stack__card">
            <div className="v-portfolio-work-stack__media">
              {"thumb" in project && project.thumb ? (
                <div className="v-portfolio-work-stack__thumb v-portfolio-work-stack__thumb--image">
                  <Image
                    src={project.thumb.src}
                    alt={project.thumb.alt}
                    fill
                    className="v-portfolio-work-stack__thumb-image"
                    sizes="(max-width: 768px) 100vw, 26rem"
                  />
                </div>
              ) : (
                <div
                  className={[
                    "v-portfolio-work-stack__thumb",
                    `v-portfolio-work-stack__thumb--${(index % 3) + 1}`,
                  ].join(" ")}
                  aria-hidden
                />
              )}
            </div>

            <div className="v-portfolio-work-stack__body">
              <h3 className="v-portfolio-work-stack__title">{project.title}</h3>
              <p className="v-portfolio-work-stack__desc">{project.description}</p>
              <ul className="v-portfolio-work-stack__roles">
                {project.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              <span className="v-portfolio-work-stack__link">
                View project
                <ArrowUpRight strokeWidth={2} aria-hidden />
              </span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
