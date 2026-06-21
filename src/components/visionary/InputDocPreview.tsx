import type { ReactNode } from "react";
import { Eye, Mail, Search } from "lucide-react";

export type InputState = "default" | "hover" | "focus" | "disabled";
export type InputSize = "sm" | "md" | "lg";
export type InputValidation = "success" | "warning" | "error";

const variantStates: { id: InputState; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover" },
  { id: "focus", label: "Focus" },
  { id: "disabled", label: "Inactive" },
];

function InputAffix({ children }: { children: ReactNode }) {
  return <span className="v-cmp-input__affix">{children}</span>;
}

export function DocInput({
  state = "default",
  size = "md",
  validation,
  label = "Email address",
  value = "",
  placeholder = "Placeholder text",
  helper,
  message,
  prefix,
  suffix,
}: {
  state?: InputState;
  size?: InputSize;
  validation?: InputValidation;
  label?: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  message?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
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
        <span
          className={[
            "v-cmp-input",
            showPlaceholder ? "v-cmp-input--placeholder-only" : "",
            prefix ? "v-cmp-input--has-prefix" : "",
            suffix ? "v-cmp-input--has-suffix" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {prefix ? <InputAffix>{prefix}</InputAffix> : null}
          <span className="v-cmp-input__value">{displayValue}</span>
          {suffix ? <InputAffix>{suffix}</InputAffix> : null}
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

type InputGroupItem = {
  label: string;
  children: ReactNode;
};

function InputGroup({ items, label }: { items: InputGroupItem[]; label: string }) {
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

export function InputVariantsPreview() {
  return (
    <InputGroup
      label="Input states"
      items={variantStates.map((item) => ({
        label: item.label,
        children: (
          <DocInput
            size="sm"
            state={item.id}
            value={item.id === "disabled" ? "Locked value" : ""}
            label="Email address"
          />
        ),
      }))}
    />
  );
}

export function InputSizesPreview() {
  return (
    <InputGroup
      label="Input sizes"
      items={[
        {
          label: "Small · sm",
          children: (
            <DocInput size="sm" value="" label="Email address" />
          ),
        },
        {
          label: "Medium · md",
          children: (
            <DocInput size="md" value="" label="Email address" />
          ),
        },
        {
          label: "Large · lg",
          children: (
            <DocInput size="lg" value="" label="Email address" />
          ),
        },
      ]}
    />
  );
}

export function InputIconAffixPreview() {
  return (
    <InputGroup
      label="Prefix and suffix icons"
      items={[
        {
          label: "Prefix icon",
          children: (
            <DocInput
              size="sm"
              value=""
              label="Email address"
              prefix={<Mail strokeWidth={2} size={16} />}
            />
          ),
        },
        {
          label: "Suffix icon",
          children: (
            <DocInput
              size="sm"
              value="Search tokens"
              label="Search"
              suffix={<Search strokeWidth={2} size={16} />}
            />
          ),
        },
        {
          label: "Prefix and suffix",
          children: (
            <DocInput
              size="sm"
              value="••••••••"
              label="Password"
              prefix={<Mail strokeWidth={2} size={16} />}
              suffix={<Eye strokeWidth={2} size={16} />}
            />
          ),
        },
      ]}
    />
  );
}

export function InputValidationPreview() {
  return (
    <InputGroup
      label="Validation states"
      items={[
        {
          label: "Success",
          children: (
            <DocInput
              size="sm"
              validation="success"
              label="Username"
              value="alex.morgan"
              message="Username is available."
            />
          ),
        },
        {
          label: "Warning",
          children: (
            <DocInput
              size="sm"
              validation="warning"
              label="Display name"
              value="Alex"
              message="This name is similar to an existing account."
            />
          ),
        },
        {
          label: "Error",
          children: (
            <DocInput
              size="sm"
              validation="error"
              label="Email address"
              value="not-an-email"
              message="Enter a valid email address."
            />
          ),
        },
      ]}
    />
  );
}
