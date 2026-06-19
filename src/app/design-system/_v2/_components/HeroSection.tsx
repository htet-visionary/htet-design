"use client";

import { motion } from "framer-motion";
import { brand } from "../../../../../design-system/v2/content/brand";
import { LuckyButton, WhisperButton } from "../../../../../design-system/v2/components/Buttons";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(6rem, 12vw, 10rem) clamp(1.25rem, 5vw, 3rem) 4rem",
        overflow: "hidden",
      }}
    >
      <motion.div
        className="lc-orb"
        style={{ width: 500, height: 500, background: "#B7CDB1", top: "-10%", right: "-5%" }}
        animate={{ y: [0, -20, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="lc-orb"
        style={{ width: 350, height: 350, background: "#D4C5E2", bottom: "5%", left: "-8%" }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="lc-orb"
        style={{ width: 200, height: 200, background: "#D4A853", top: "40%", left: "15%", opacity: 0.2 }}
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div style={{ textAlign: "center", maxWidth: 720, position: "relative", zIndex: 2 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--lc-font-voice)",
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--lc-text-muted)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "var(--lc-soft-green)" }}>✦</span>
          World Design System
          <span style={{ color: "var(--lc-soft-green)" }}>✦</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "var(--lc-font-story)",
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "var(--lc-deep-green)",
          }}
        >
          Lucky <em style={{ fontStyle: "italic", color: "var(--lc-statice)" }}>Charm</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "var(--lc-font-notes)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontStyle: "italic",
            color: "var(--lc-text-muted)",
            marginTop: "1.5rem",
            lineHeight: 1.7,
          }}
        >
          {brand.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: "var(--lc-font-notes)",
            fontSize: "1rem",
            color: "var(--lc-text-muted)",
            marginTop: "2rem",
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.85,
          }}
        >
          {brand.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <LuckyButton>Enter the world</LuckyButton>
          <WhisperButton>Read the story</WhisperButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
            marginTop: "4rem",
          }}
        >
          {brand.symbols.map((s) => (
            <span
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--lc-text-muted)",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
              {s.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
