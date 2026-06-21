import type { ReactNode } from "react";

export type TextareaState = "default" | "hover" | "focus" | "disabled";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaValidation = "success" | "warning" | "error";

const variantStates: { id: TextareaState; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover" },
  { id: "focus", label: "Focus" },
  { id: "disabled", label: "Inactive" },
];

function TextareaResizeHandle() {
  return (
    <span className="v-cmp-textarea__resize" aria-hidden>
      <svg viewBox="0 0 10 10" fill="none">
        <path d="M9.5 0.5L0.5 9.5" stroke="currentColor" strokeWidth="1" />
        <path d="M9.5 3.5L3.5 9.5" stroke="currentColor" strokeWidth="1" />
        <path d="M9.5 6.5L6.5 9.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

export function DocTextarea({
  state = "default",
  size = "md",
  validation,
  label = "Notes",
  value = "",
  placeholder = "Placeholder text",
  helper,
  message,
}: {
  state?: TextareaState;
  size?: TextareaSize;
  validation?: TextareaValidation;
  label?: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  message?: string;
}) {
  const displayValue = value || placeholder;
  const showPlaceholder = !value;

  return (
    <div
      className={[
        "v-cmp-field",
        `v-cmp-field--${state}`,
        `v-cmp-field--${size}`,
        validation ? `v-cmp-field--${validation}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="v-cmp-field__label">{label}</span>
      <span className="v-cmp-field__control">
        <span className="v-cmp-textarea-shell">
          <span
            className={[
              "v-cmp-textarea",
              showPlaceholder ? "v-cmp-textarea--placeholder-only" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {displayValue}
          </span>
          <TextareaResizeHandle />
        </span>
      </span>
      {message && validation ? (
        <span className={`v-cmp-field__feedback v-cmp-field__feedback--${validation}`}>
          {message}
        </span>
      ) : null}
      {helper && !message ? <span className="v-cmp-field__helper">{helper}</span> : null}
    </div>
  );
}

type TextareaGroupItem = {
  label: string;
  children: ReactNode;
};

function TextareaGroup({ items, label }: { items: TextareaGroupItem[]; label: string }) {
  return (
    <ul className="v-foundation-preview v-cmp-btn-group" aria-label={label}>
      {items.map((item) => (
        <li key={item.label} className="v-cmp-btn-group__row">
          <span className="v-cmp-btn-group__label">{item.label}</span>
          <span className="v-cmp-btn-group__specimen">{item.children}</span>
        </li>
      ))}
    </ul>
  );
}

export function TextareaVariantsPreview() {
  return (
    <TextareaGroup
      label="Textarea states"
      items={variantStates.map((item) => ({
        label: item.label,
        children: (
          <DocTextarea
            size="sm"
            state={item.id}
            value={
              item.id === "disabled"
                ? "Locked value"
                : item.id === "focus"
                  ? "Add context for your team."
                  : ""
            }
            label="Notes"
          />
        ),
      }))}
    />
  );
}

export function TextareaSizesPreview() {
  return (
    <TextareaGroup
      label="Textarea sizes"
      items={[
        {
          label: "Small · sm",
          children: <DocTextarea size="sm" value="" label="Notes" />,
        },
        {
          label: "Medium · md",
          children: <DocTextarea size="md" value="" label="Notes" />,
        },
        {
          label: "Large · lg",
          children: <DocTextarea size="lg" value="" label="Notes" />,
        },
      ]}
    />
  );
}

export function TextareaValidationPreview() {
  return (
    <TextareaGroup
      label="Validation states"
      items={[
        {
          label: "Success",
          children: (
            <DocTextarea
              size="sm"
              validation="success"
              label="Notes"
              value="Looks good — ready to submit."
              message="Notes meet the required length."
            />
          ),
        },
        {
          label: "Warning",
          children: (
            <DocTextarea
              size="sm"
              validation="warning"
              label="Notes"
              value="Short summary"
              message="Consider adding more detail for reviewers."
            />
          ),
        },
        {
          label: "Error",
          children: (
            <DocTextarea
              size="sm"
              validation="error"
              label="Notes"
              value="Hi"
              message="Enter at least 20 characters."
            />
          ),
        },
      ]}
    />
  );
}
