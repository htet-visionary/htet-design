"use client";

import { motion } from "framer-motion";

const demos = [
  {
    key: "floatingClover",
    name: "Floating Clover",
    description: "A gentle rise and sway, like a clover drifting on breeze.",
    icon: "☘",
    color: "rgba(183,205,177,0.5)",
    animate: { y: [0, -12, 0], rotate: [0, 3, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    key: "morningBreeze",
    name: "Morning Breeze",
    description: "Slow horizontal drift with soft opacity pulse.",
    icon: "🌿",
    color: "rgba(189,189,189,0.4)",
    animate: { x: [0, 8, 0], opacity: [0.7, 1, 0.7] },
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    key: "magicDust",
    name: "Magic Dust",
    description: "Sparkling shimmer for iridescent accents.",
    icon: "✨",
    color: "var(--lc-iridescent)",
    animate: { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    key: "pillowDrop",
    name: "Pillow Drop",
    description: "Soft landing with a gentle bounce.",
    icon: "☁",
    color: "rgba(212,197,226,0.5)",
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
];

export function MotionSection() {
  return (
    <section
      id="motion"
      className="lc-section scroll-mt-24"
      style={{
        background:
          "radial-gradient(ellipse at 30% 70%, rgba(212,197,226,0.1) 0%, transparent 50%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="lc-section__label">Motion Language</p>
        <h2 className="lc-section__title">
          Movement with <em>intention</em>
        </h2>
        <p className="lc-section__desc">
          Nothing rushes in Lucky&apos;s world. Motion breathes — like breeze
          through clover, like a pillow settling softly.
        </p>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            marginTop: "3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          }}
        >
          {demos.map((demo, i) => (
            <motion.div
              key={demo.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "2rem",
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(183,205,177,0.25)",
                textAlign: "center",
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                animate={demo.animate}
                transition={demo.transition}
                initial={"initial" in demo ? demo.initial : undefined}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: demo.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                {demo.icon}
              </motion.div>
              <h3
                style={{
                  fontFamily: "var(--lc-font-story)",
                  fontSize: "1.2rem",
                  color: "var(--lc-deep-green)",
                }}
              >
                {demo.name}
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
                {demo.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
