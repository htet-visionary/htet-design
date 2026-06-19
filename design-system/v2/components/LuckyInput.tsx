import type { InputHTMLAttributes } from "react";

type LuckyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function LuckyInput({ label, id, className = "", ...props }: LuckyInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--lc-font-voice)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--lc-text-muted)",
          }}
        >
          {label}
        </label>
      )}
      <input id={inputId} className={`lc-input-lucky ${className}`} {...props} />
    </div>
  );
}
