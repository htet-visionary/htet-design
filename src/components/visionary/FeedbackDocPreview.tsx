import { CheckCircle2, Info, X } from "lucide-react";
import { ComponentDocGroup } from "@/components/visionary/ComponentDocGroup";

export function ToastVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Toast variants"
      items={[
        {
          label: "Success",
          children: (
            <div className="v-cmp-toast v-cmp-toast--success" role="presentation">
              <CheckCircle2 className="v-cmp-toast__icon" strokeWidth={2} />
              <p className="v-cmp-toast__message">Changes saved successfully.</p>
              <span className="v-cmp-toast__dismiss" aria-hidden>
                <X className="v-cmp-toast__dismiss" strokeWidth={2} />
              </span>
            </div>
          ),
        },
        {
          label: "Info",
          children: (
            <div className="v-cmp-toast v-cmp-toast--info" role="presentation">
              <Info className="v-cmp-toast__icon" strokeWidth={2} />
              <p className="v-cmp-toast__message">New statement available.</p>
            </div>
          ),
        },
        {
          label: "Error",
          children: (
            <div className="v-cmp-toast v-cmp-toast--error" role="presentation">
              <Info className="v-cmp-toast__icon" strokeWidth={2} />
              <p className="v-cmp-toast__message">Could not sync your account.</p>
            </div>
          ),
        },
      ]}
    />
  );
}
