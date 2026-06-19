"use client";

import { motion } from "framer-motion";
import {
  LuckyButton,
  WhisperButton,
} from "../../../../../design-system/v2/components/Buttons";
import {
  WishCard,
  MemoryCard,
  CozyCard,
} from "../../../../../design-system/v2/components/Cards";
import { LuckyInput } from "../../../../../design-system/v2/components/LuckyInput";
import { CloverChip } from "../../../../../design-system/v2/components/CloverChip";

export function ComponentSection() {
  return (
    <section id="components" className="lc-section scroll-mt-24">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Component Library</p>
        <h2 className="lc-section__title">
          Objects in a <em>storybook scene</em>
        </h2>
        <p className="lc-section__desc">
          Components live inside cozy moments — never sterile grids, always part
          of Lucky&apos;s gentle world.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "3rem",
            padding: "clamp(2rem, 5vw, 4rem)",
            borderRadius: "2rem",
            background:
              "linear-gradient(165deg, rgba(183,205,177,0.12) 0%, rgba(212,197,226,0.08) 50%, rgba(255,255,255,0.6) 100%)",
            border: "1px solid rgba(183,205,177,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.span
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "2rem",
              fontSize: "2rem",
              opacity: 0.3,
            }}
          >
            ☘
          </motion.span>

          <p
            style={{
              fontFamily: "var(--lc-font-notes)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--lc-text-muted)",
              marginBottom: "2rem",
            }}
          >
            A quiet morning in Lucky&apos;s cottage…
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <LuckyButton>Find your charm</LuckyButton>
            <WhisperButton>Read today&apos;s note</WhisperButton>
          </div>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              marginBottom: "2rem",
            }}
          >
            <WishCard title="Today's Wish">
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  color: "var(--lc-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                May kindness find you before you ask for it.
              </p>
            </WishCard>
            <MemoryCard title="A memory">
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  color: "var(--lc-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                The first time you held a clover and believed.
              </p>
            </MemoryCard>
            <CozyCard title="Cozy corner">
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  color: "var(--lc-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                Tea, pillow, and a tiny rabbit friend.
              </p>
            </CozyCard>
          </div>

          <div style={{ maxWidth: 360, marginBottom: "1.5rem" }}>
            <LuckyInput label="Your lucky thought" placeholder="Something gentle…" />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <CloverChip>Hope</CloverChip>
            <CloverChip variant="lavender">Comfort</CloverChip>
            <CloverChip variant="golden">Magic</CloverChip>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
