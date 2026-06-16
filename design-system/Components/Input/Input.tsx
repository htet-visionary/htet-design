import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const hintId = hint || error ? `${inputId}-hint` : undefined;

  return (
    <div className="ds-input-wrapper">
      {label && (
        <label htmlFor={inputId} className="ds-input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={["ds-input", error && "ds-input--error", className]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={hintId}
        {...props}
      />
      {(hint || error) && (
        <span
          id={hintId}
          className={[
            "ds-input-hint",
            error && "ds-input-hint--error",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {error ?? hint}
        </span>
      )}
    </div>
  );
}
