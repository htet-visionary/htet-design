"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Colors", href: "#color-garden" },
  { label: "Type", href: "#typography" },
  { label: "Rabbit", href: "#rabbit" },
  { label: "Emotions", href: "#emotions" },
  { label: "Surfaces", href: "#surfaces" },
  { label: "Components", href: "#components" },
  { label: "Motion", href: "#motion" },
  { label: "World", href: "#world" },
];

export function V2Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem clamp(1.25rem, 4vw, 2.5rem)",
        background: "rgba(253, 252, 251, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(183, 205, 177, 0.2)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--lc-font-voice)",
          fontSize: "0.75rem",
          color: "var(--lc-text-muted)",
          textDecoration: "none",
        }}
      >
        ← Menu
      </Link>

      <span
        style={{
          fontFamily: "var(--lc-font-story)",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "var(--lc-deep-green)",
        }}
      >
        Lucky <em style={{ fontStyle: "italic", color: "var(--lc-statice)" }}>Charm</em>
      </span>

      <nav
        aria-label="Section navigation"
        className="hidden gap-6 lg:flex"
        style={{ alignItems: "center" }}
      >
        {links.slice(0, 5).map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--lc-font-voice)",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--lc-text-muted)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
