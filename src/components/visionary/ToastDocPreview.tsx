import type { ReactNode } from "react";
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";

export type ToastVariant = "success" | "warning" | "error" | "info";

const toastCopy: Record<ToastVariant, string> = {
  success: "Your changes were saved successfully.",
  warning: "This action cannot be undone after 24 hours.",
  error: "We could not process your payment. Check your card details.",
  info: "Statements are available on the first of each month.",
};

export function DocToast({
  variant,
  dismissible = false,
}: {
  variant: ToastVariant;
  dismissible?: boolean;
}) {
  const Icon =
    variant === "success"
      ? CheckCircle2
      : variant === "warning"
        ? TriangleAlert
        : variant === "error"
          ? XCircle
          : Info;

  return (
    <div className={`v-cmp-toast v-cmp-toast--${variant}`} role="presentation">
      <span className="v-cmp-toast__icon" aria-hidden>
        <Icon strokeWidth={2} size={16} />
      </span>
      <p className="v-cmp-toast__message">{toastCopy[variant]}</p>
      {dismissible ? (
        <span className="v-cmp-toast__dismiss" aria-hidden>
          <X strokeWidth={2} size={16} />
        </span>
      ) : null}
    </div>
  );
}

type ToastGroupItem = {
  label: string;
  children: ReactNode;
};

function ToastGroup({ items, label }: { items: ToastGroupItem[]; label: string }) {
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

const toastVariants: { id: ToastVariant; label: string }[] = [
  { id: "success", label: "Success" },
  { id: "warning", label: "Warning" },
  { id: "error", label: "Error" },
  { id: "info", label: "Info" },
];

export function ToastVariantsPreview() {
  return (
    <ToastGroup
      label="Toast variants"
      items={toastVariants.map((item) => ({
        label: item.label,
        children: <DocToast variant={item.id} />,
      }))}
    />
  );
}

export function ToastDismissiblePreview() {
  return (
    <ToastGroup
      label="Dismissible toasts"
      items={[
        {
          label: "Inline",
          children: <DocToast variant="info" />,
        },
        {
          label: "Dismissible",
          children: <DocToast variant="info" dismissible />,
        },
      ]}
    />
  );
}
