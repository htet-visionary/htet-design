"use client";

import { motion } from "framer-motion";
import { rabbitGuide } from "../../../../../design-system/v2/content/rabbit";

export function RabbitSection() {
  return (
    <section
      id="rabbit"
      className="lc-section scroll-mt-24"
      style={{
        background:
          "radial-gradient(ellipse at 80% 20%, rgba(212,197,226,0.12) 0%, transparent 50%), var(--lc-cream)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Illustration System</p>
        <h2 className="lc-section__title">
          The Lucky <em>Rabbit</em>
        </h2>
        <p className="lc-section__desc">{rabbitGuide.subtitle}</p>

        <div
          style={{
            display: "grid",
            gap: "clamp(2rem, 5vw, 4rem)",
            marginTop: "clamp(3rem, 6vw, 4rem)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              aspectRatio: "1",
              borderRadius: "2rem",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(183,205,177,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(6rem, 15vw, 10rem)",
              boxShadow: "var(--lc-shadow-pillow)",
            }}
          >
            🐇
          </motion.div>

          <div>
            <h3
              style={{
                fontFamily: "var(--lc-font-story)",
                fontSize: "1.5rem",
                color: "var(--lc-deep-green)",
                marginBottom: "1.5rem",
              }}
            >
              Expressions
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {rabbitGuide.expressions.map((exp, i) => (
                <motion.div
                  key={exp.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "1rem",
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(183,205,177,0.25)",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{exp.emoji}</span>
                  <p
                    style={{
                      fontFamily: "var(--lc-font-voice)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--lc-deep-green)",
                      marginTop: "0.5rem",
                    }}
                  >
                    {exp.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--lc-font-notes)",
                      fontSize: "0.8rem",
                      color: "var(--lc-text-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {exp.note}
                  </p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: "2rem" }}>
              <h4
                style={{
                  fontFamily: "var(--lc-font-voice)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--lc-soft-green)",
                  marginBottom: "0.75rem",
                }}
              >
                Do
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {rabbitGuide.doRules.map((rule) => (
                  <li
                    key={rule}
                    style={{
                      fontFamily: "var(--lc-font-notes)",
                      color: "var(--lc-text-muted)",
                      padding: "0.35rem 0",
                    }}
                  >
                    ✓ {rule}
                  </li>
                ))}
              </ul>
              <h4
                style={{
                  fontFamily: "var(--lc-font-voice)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--lc-statice)",
                  marginTop: "1.25rem",
                  marginBottom: "0.75rem",
                }}
              >
                Avoid
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {rabbitGuide.avoidRules.map((rule) => (
                  <li
                    key={rule}
                    style={{
                      fontFamily: "var(--lc-font-notes)",
                      color: "var(--lc-text-muted)",
                      padding: "0.35rem 0",
                    }}
                  >
                    ✗ {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginTop: "3rem",
          }}
        >
          {rabbitGuide.poses.map((pose) => (
            <span key={pose} className="lc-chip-clover">
              {pose}
            </span>
          ))}
          {rabbitGuide.accessories.map((acc) => (
            <span key={acc} className="lc-chip-clover lc-chip-clover--lavender">
              {acc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
