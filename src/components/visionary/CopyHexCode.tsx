"use client";

import { useState } from "react";

export function CopyHexCode({ hex, className }: { hex: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyHex() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={["v-copy-hex", className].filter(Boolean).join(" ")}
      onClick={copyHex}
      aria-label={copied ? `${hex} copied` : `Copy ${hex}`}
      title={copied ? "Copied!" : "Click to copy hex"}
    >
      <code className="v-code v-code--sm v-code--muted">
        {copied ? "Copied!" : hex}
      </code>
    </button>
  );
}
