"use client";

import { motion } from "framer-motion";
import { worldShowcase } from "../../../../../design-system/v2/content/showcase";
import { brand } from "../../../../../design-system/v2/content/brand";

export function WorldShowcaseSection() {
  return (
    <section id="world" className="lc-section scroll-mt-24">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Lucky World</p>
        <h2 className="lc-section__title">
          One connected <em>ecosystem</em>
        </h2>
        <p className="lc-section__desc">
          From plush bouquets to digital companions — every touchpoint shares the
          same gentle soul.
        </p>

        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            marginTop: "3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          }}
        >
          {worldShowcase.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                padding: "1.75rem",
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(183,205,177,0.3)",
                boxShadow: "var(--lc-shadow-cloud)",
              }}
            >
              <span style={{ fontSize: "2.25rem" }}>{item.emoji}</span>
              <p
                style={{
                  fontFamily: "var(--lc-font-voice)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--lc-soft-green)",
                  marginTop: "1rem",
                }}
              >
                {item.category}
              </p>
              <h3
                style={{
                  fontFamily: "var(--lc-font-story)",
                  fontSize: "1.15rem",
                  color: "var(--lc-deep-green)",
                  marginTop: "0.35rem",
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  fontSize: "0.9rem",
                  color: "var(--lc-text-muted)",
                  marginTop: "0.5rem",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer
      style={{
        padding: "clamp(4rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)",
        textAlign: "center",
        background:
          "linear-gradient(135deg, #fde8f0 0%, #e8dff7 20%, #d4eef7 40%, #d4f0e8 60%, #f7f0d4 80%, #fde8f0 100%)",
        backgroundSize: "400% 400%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #fde8f0 0%, #e8dff7 20%, #d4eef7 40%, #d4f0e8 60%, #f7f0d4 80%, #fde8f0 100%)",
          backgroundSize: "400% 400%",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--lc-font-story)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontStyle: "italic",
            color: "var(--lc-deep-green)",
          }}
        >
          Lucky Charm
        </p>
        <p
          style={{
            fontFamily: "var(--lc-font-notes)",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "var(--lc-text-muted)",
            marginTop: "0.5rem",
          }}
        >
          {brand.tagline}
        </p>
        <p
          style={{
            fontFamily: "var(--lc-font-voice)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "var(--lc-text-muted)",
            marginTop: "2.5rem",
          }}
        >
          World Design System v2.0 — A luxury storybook for gentle brands
        </p>
      </div>
    </footer>
  );
}
