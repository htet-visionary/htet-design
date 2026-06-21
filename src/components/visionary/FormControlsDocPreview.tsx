import { ChevronDown } from "lucide-react";
import { ComponentDocGroup } from "@/components/visionary/ComponentDocGroup";

type FieldState = "default" | "hover" | "focus" | "disabled";

function fieldWrapperClass(state: FieldState = "default") {
  return [
    "v-cmp-field",
    "v-cmp-field--sm",
    state !== "default" ? `v-cmp-field--${state}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function TextareaVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Textarea variants"
      items={[
        {
          label: "Default",
          children: (
            <div className={fieldWrapperClass("default")} aria-hidden>
              <span className="v-cmp-field__label">Notes</span>
              <span className="v-cmp-textarea">Placeholder text</span>
            </div>
          ),
        },
        {
          label: "Focus",
          children: (
            <div className={fieldWrapperClass("focus")} aria-hidden>
              <span className="v-cmp-field__label">Notes</span>
              <span className="v-cmp-textarea">Add context for your team.</span>
            </div>
          ),
        },
        {
          label: "Inactive",
          children: (
            <div className={fieldWrapperClass("disabled")} aria-hidden>
              <span className="v-cmp-field__label">Notes</span>
              <span className="v-cmp-textarea">Locked value</span>
            </div>
          ),
        },
      ]}
    />
  );
}

export function SelectVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Select variants"
      items={[
        {
          label: "Default",
          children: (
            <div className={fieldWrapperClass()} aria-hidden>
              <span className="v-cmp-field__label">Country</span>
              <span className="v-cmp-select">
                <span className="v-cmp-select__value v-cmp-input--placeholder-only">
                  Select a country
                </span>
                <ChevronDown className="v-cmp-select__icon" strokeWidth={2} />
              </span>
            </div>
          ),
        },
        {
          label: "With value",
          children: (
            <div className={fieldWrapperClass()} aria-hidden>
              <span className="v-cmp-field__label">Country</span>
              <span className="v-cmp-select">
                <span className="v-cmp-select__value">United States</span>
                <ChevronDown className="v-cmp-select__icon" strokeWidth={2} />
              </span>
            </div>
          ),
        },
        {
          label: "Inactive",
          children: (
            <div className={fieldWrapperClass("disabled")} aria-hidden>
              <span className="v-cmp-field__label">Country</span>
              <span className="v-cmp-select v-cmp-select--disabled">
                <span className="v-cmp-select__value">United States</span>
                <ChevronDown className="v-cmp-select__icon" strokeWidth={2} />
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}

export function CheckboxVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Checkbox variants"
      items={[
        { label: "Default", children: <span className="v-cmp-check" aria-hidden /> },
        { label: "Checked", children: <span className="v-cmp-check v-cmp-check--checked" aria-hidden /> },
        {
          label: "With label",
          children: (
            <label className="v-cmp-check-row" aria-hidden>
              <span className="v-cmp-check v-cmp-check--checked" />
              <span className="v-cmp-check-row__label">Email me updates</span>
            </label>
          ),
        },
        {
          label: "Inactive",
          children: <span className="v-cmp-check v-cmp-check--checked v-cmp-check--disabled" aria-hidden />,
        },
      ]}
    />
  );
}

export function RadioVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Radio variants"
      items={[
        { label: "Default", children: <span className="v-cmp-radio" aria-hidden /> },
        { label: "Selected", children: <span className="v-cmp-radio v-cmp-radio--checked" aria-hidden /> },
        {
          label: "Group",
          children: (
            <div className="v-cmp-radio-group" aria-hidden>
              <label className="v-cmp-radio-row">
                <span className="v-cmp-radio v-cmp-radio--checked" />
                <span className="v-cmp-radio-row__label">Monthly</span>
              </label>
              <label className="v-cmp-radio-row">
                <span className="v-cmp-radio" />
                <span className="v-cmp-radio-row__label">Yearly</span>
              </label>
            </div>
          ),
        },
        {
          label: "Inactive",
          children: <span className="v-cmp-radio v-cmp-radio--checked v-cmp-radio--disabled" aria-hidden />,
        },
      ]}
    />
  );
}

export function SwitchVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Switch variants"
      items={[
        { label: "Off", children: <span className="v-cmp-switch" aria-hidden /> },
        { label: "On", children: <span className="v-cmp-switch v-cmp-switch--on" aria-hidden /> },
        {
          label: "With label",
          children: (
            <label className="v-cmp-switch-row" aria-hidden>
              <span className="v-cmp-switch v-cmp-switch--on" />
              <span className="v-cmp-switch-row__label">Notifications</span>
            </label>
          ),
        },
        {
          label: "Inactive",
          children: <span className="v-cmp-switch v-cmp-switch--on v-cmp-switch--disabled" aria-hidden />,
        },
      ]}
    />
  );
}
