"use client";

import { useEffect, useRef } from "react";

type PortfolioScrollRevealProps = {
  children: React.ReactNode;
};

export function PortfolioScrollReveal({ children }: PortfolioScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const prepareElement = (element: HTMLElement) => {
      if (element.classList.contains("v-portfolio-reveal")) {
        return;
      }

      element.classList.add("v-portfolio-reveal");

      const delay = element.dataset.revealDelay;

      if (delay) {
        element.style.setProperty("--v-reveal-delay", `${delay}ms`);
      }

      if (prefersReducedMotion) {
        element.classList.add("v-portfolio-reveal--in");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("v-portfolio-reveal--in");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.1,
      },
    );

    const scan = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        prepareElement(element);

        if (!prefersReducedMotion && !element.classList.contains("v-portfolio-reveal--in")) {
          observer.observe(element);
        }
      });
    };

    scan();

    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="v-portfolio-reveal-root">
      {children}
    </div>
  );
}
