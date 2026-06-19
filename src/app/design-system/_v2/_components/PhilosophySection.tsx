"use client";

import { motion } from "framer-motion";
import { philosophy } from "../../../../../design-system/v2/content/brand";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="lc-section scroll-mt-24">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Design Philosophy</p>
        <h2 className="lc-section__title">
          Design as a <em>gentle companion</em>
        </h2>
        <p className="lc-section__desc">
          Every choice in the Lucky Charm world is made with the same care you&apos;d
          give a friend — warm, patient, and quietly encouraging.
        </p>

        <div
          style={{
            display: "grid",
            gap: "clamp(1.5rem, 4vw, 2.5rem)",
            marginTop: "clamp(3rem, 6vw, 5rem)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          }}
        >
          {philosophy.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                padding: "clamp(2rem, 4vw, 3rem)",
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(183,205,177,0.25)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--lc-font-story)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 500,
                  color: "var(--lc-deep-green)",
                  lineHeight: 1.15,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "var(--lc-statice)",
                  marginTop: "0.35rem",
                }}
              >
                {item.principle}
              </p>
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  color: "var(--lc-text-muted)",
                  marginTop: "1.25rem",
                }}
              >
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
