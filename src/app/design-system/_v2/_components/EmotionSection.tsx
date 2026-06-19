"use client";

import { motion } from "framer-motion";
import { emotionIcons } from "../../../../../design-system/v2/content/emotions";

export function EmotionSection() {
  return (
    <section id="emotions" className="lc-section scroll-mt-24">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Emotion Library</p>
        <h2 className="lc-section__title">
          Feelings as <em>symbols</em>
        </h2>
        <p className="lc-section__desc">
          Each icon family carries a feeling — outline for quiet moments, filled
          for emphasis, decorative for magic.
        </p>

        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            marginTop: "3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
          }}
        >
          {emotionIcons.map((emotion, i) => (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "1.5rem 1rem",
                borderRadius: "1.25rem",
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(183,205,177,0.3)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.75rem",
                  fontSize: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ opacity: 0.4 }}>{emotion.outline}</span>
                <span>{emotion.icon}</span>
                <span
                  style={{
                    background: "var(--lc-iridescent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {emotion.decorative}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--lc-font-voice)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--lc-text-muted)",
                }}
              >
                {emotion.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
