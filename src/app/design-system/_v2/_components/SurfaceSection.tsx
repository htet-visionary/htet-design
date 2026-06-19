"use client";

import { motion } from "framer-motion";
import { surfaceLevels } from "../../../../../design-system/v2/foundations/surfaces";

export function SurfaceSection() {
  return (
    <section
      id="surfaces"
      className="lc-section scroll-mt-24"
      style={{ background: "rgba(247,247,247,0.4)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Surface Language</p>
        <h2 className="lc-section__title">
          Shadows that <em>tell stories</em>
        </h2>
        <p className="lc-section__desc">
          Elevation is not depth — it is atmosphere. Cloud, Pillow, and Dream
          describe how elements rest in Lucky&apos;s world.
        </p>

        <div
          style={{
            display: "grid",
            gap: "2rem",
            marginTop: "3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {surfaceLevels.map((surface, i) => (
            <motion.div
              key={surface.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              style={{
                padding: "clamp(2rem, 4vw, 3rem)",
                borderRadius: "1.75rem",
                background: "var(--lc-cream)",
                boxShadow: surface.shadow,
                border: "1px solid rgba(183,205,177,0.15)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--lc-font-story)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontStyle: "italic",
                  color: "var(--lc-deep-green)",
                }}
              >
                {surface.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--lc-font-notes)",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--lc-text-muted)",
                  marginTop: "1rem",
                }}
              >
                {surface.story}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
