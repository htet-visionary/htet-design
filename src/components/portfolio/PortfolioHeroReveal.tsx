"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { portfolioProfile } from "@/lib/portfolio-content";

const DEFAULT_REVEAL = 0;
const HOVER_LERP = 0.22;
const RESET_LERP = 0.14;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRevealRef = useRef(DEFAULT_REVEAL);
  const currentRevealRef = useRef(DEFAULT_REVEAL);
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const applyReveal = useCallback((value: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.style.setProperty("--reveal-num", String(value));
    container.dataset.mode = value >= 50 ? "photo" : "illustration";
  }, []);

  const tick = useCallback(() => {
    const current = currentRevealRef.current;
    const target = targetRevealRef.current;
    const lerp = isHoveringRef.current ? HOVER_LERP : RESET_LERP;
    const next = current + (target - current) * lerp;
    const settled = Math.abs(target - next) < 0.08;
    const value = settled ? target : next;

    currentRevealRef.current = value;
    applyReveal(value);

    if (!settled || isHoveringRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    rafRef.current = null;
  }, [applyReveal]);

  const startAnimation = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const setTargetFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const { left, top, height } = container.getBoundingClientRect();
      const pointerX = clientX - left;
      const pointerY = clientY - top;
      const nextReveal = (pointerY / height) * 100;

      container.style.setProperty("--pointer-x", `${pointerX}px`);
      container.style.setProperty("--pointer-y", `${pointerY}px`);
      targetRevealRef.current = Math.min(100, Math.max(0, nextReveal));
      startAnimation();
    },
    [startAnimation],
  );

  useEffect(() => {
    applyReveal(DEFAULT_REVEAL);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [applyReveal]);

  const onPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    isHoveringRef.current = true;
    containerRef.current?.classList.add("v-portfolio-hero-reveal--hovering");
    setTargetFromPointer(event.clientX, event.clientY);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    setTargetFromPointer(event.clientX, event.clientY);
  };

  const onPointerLeave = () => {
    isHoveringRef.current = false;
    containerRef.current?.classList.remove("v-portfolio-hero-reveal--hovering");
    targetRevealRef.current = DEFAULT_REVEAL;
    startAnimation();
  };

  return (
    <div
      ref={containerRef}
      className="v-portfolio-hero-reveal"
      data-mode="illustration"
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
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

      <div className="v-portfolio-hero-reveal__divider" aria-hidden>
        <span className="v-portfolio-hero-reveal__divider-line" />
      </div>

      <span className="v-portfolio-hero-reveal__pointer" aria-hidden />

      <p className="v-portfolio-hero-reveal__status" aria-live="polite">
        <span className="v-portfolio-hero-reveal__status-photo">Original photo</span>
        <span className="v-portfolio-hero-reveal__status-illustration">
          Watercolor illustration
        </span>
      </p>

      <span className="v-portfolio-hero-reveal__hint">
        Hover to compare photo and illustration
      </span>
    </div>
  );
}
