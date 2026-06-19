"use client";

import { motion } from "framer-motion";
import { colorGarden } from "../../../../../design-system/v2/foundations/colors";

export function ColorGardenSection() {
  return (
    <section
      id="color-garden"
      className="lc-section scroll-mt-24"
      style={{ background: "linear-gradient(180deg, var(--lc-cream) 0%, rgba(247,247,247,0.5) 100%)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Color Garden</p>
        <h2 className="lc-section__title">
          Emotional <em>landscapes</em>
        </h2>
        <p className="lc-section__desc">
          Colors are not hex codes — they are feelings. Each hue grows like a
          watercolor garden in the Lucky Charm world.
        </p>

        <div
          style={{
            display: "grid",
            gap: "clamp(1.5rem, 3vw, 2rem)",
            marginTop: "clamp(3rem, 6vw, 4rem)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          }}
        >
          {colorGarden.map((color, i) => (
            <motion.div
              key={color.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                position: "relative",
                aspectRatio: "4/5",
                borderRadius: "2rem",
                overflow: "hidden",
                border: "1px solid rgba(183,205,177,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: color.gradient,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at 50% 80%, ${color.hex}88 0%, transparent 60%)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                  background: "linear-gradient(to top, rgba(255,255,255,0.92) 0%, transparent 100%)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--lc-font-voice)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--lc-text-muted)",
                  }}
                >
                  {color.token}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--lc-font-story)",
                    fontSize: "1.35rem",
                    color: "var(--lc-deep-green)",
                    marginTop: "0.25rem",
                  }}
                >
                  {color.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--lc-font-notes)",
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                    color: "var(--lc-text-muted)",
                    marginTop: "0.35rem",
                  }}
                >
                  {color.mood}
                </p>
                <code
                  style={{
                    display: "inline-block",
                    marginTop: "0.75rem",
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.35rem",
                    background: "rgba(255,255,255,0.7)",
                    color: "var(--lc-text)",
                  }}
                >
                  {color.hex}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
