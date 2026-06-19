"use client";

import { motion } from "framer-motion";
import {
  typeFamilies,
  typeExamples,
} from "../../../../../design-system/v2/foundations/typography";

export function TypographySection() {
  return (
    <section id="typography" className="lc-section scroll-mt-24">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Typography House</p>
        <h2 className="lc-section__title">
          Three voices, <em>one story</em>
        </h2>
        <p className="lc-section__desc">
          Typography carries emotion before meaning. Each family speaks with a
          different tenderness.
        </p>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            marginTop: "3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {Object.entries(typeFamilies).map(([key, fam], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "2rem",
                borderRadius: "1.25rem",
                border: "1px solid rgba(183,205,177,0.3)",
                background: "rgba(255,255,255,0.5)",
              }}
            >
              <p
                style={{
                  fontFamily: fam.family,
                  fontSize: "2rem",
                  color: "var(--lc-deep-green)",
                  lineHeight: 1.2,
                }}
              >
                Aa
              </p>
              <h3
                style={{
                  fontFamily: "var(--lc-font-voice)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--lc-text-muted)",
                  marginTop: "1rem",
                }}
              >
                {fam.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  fontSize: "0.9rem",
                  color: "var(--lc-text-muted)",
                  marginTop: "0.35rem",
                }}
              >
                {fam.role}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          {typeExamples.map((ex, i) => (
            <motion.blockquote
              key={ex.text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{
                fontFamily: typeFamilies[ex.family].family,
                fontSize: ex.size,
                fontStyle: ex.style,
                color:
                  ex.family === "storyTitle"
                    ? "var(--lc-deep-green)"
                    : "var(--lc-text-muted)",
                lineHeight: 1.4,
                padding: "clamp(1.5rem, 4vw, 2.5rem) 0",
                borderBottom: "1px solid rgba(183,205,177,0.2)",
                margin: 0,
              }}
            >
              &ldquo;{ex.text}&rdquo;
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
