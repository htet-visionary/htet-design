import type { ReactNode } from "react";
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";

export type AlertVariant = "success" | "warning" | "error" | "info";

const alertCopy: Record<AlertVariant, string> = {
  success: "Your changes were saved successfully.",
  warning: "This action cannot be undone after 24 hours.",
  error: "We could not process your payment. Check your card details.",
  info: "Statements are available on the first of each month.",
};

export function DocAlert({
  variant,
  dismissible = false,
}: {
  variant: AlertVariant;
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
    <div className={`v-cmp-alert v-cmp-alert--${variant}`} role="presentation">
      <span className="v-cmp-alert__icon" aria-hidden>
        <Icon strokeWidth={2} size={16} />
      </span>
      <p className="v-cmp-alert__message">{alertCopy[variant]}</p>
      {dismissible ? (
        <span className="v-cmp-alert__dismiss" aria-hidden>
          <X strokeWidth={2} size={16} />
        </span>
      ) : null}
    </div>
  );
}

type AlertGroupItem = {
  label: string;
  children: ReactNode;
};

function AlertGroup({ items, label }: { items: AlertGroupItem[]; label: string }) {
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

const alertVariants: { id: AlertVariant; label: string }[] = [
  { id: "success", label: "Success" },
  { id: "warning", label: "Warning" },
  { id: "error", label: "Error" },
  { id: "info", label: "Info" },
];

export function AlertVariantsPreview() {
  return (
    <AlertGroup
      label="Alert variants"
      items={alertVariants.map((item) => ({
        label: item.label,
        children: <DocAlert variant={item.id} />,
      }))}
    />
  );
}

export function AlertDismissiblePreview() {
  return (
    <AlertGroup
      label="Dismissible alerts"
      items={[
        {
          label: "Inline",
          children: <DocAlert variant="info" />,
        },
        {
          label: "Dismissible",
          children: <DocAlert variant="info" dismissible />,
        },
      ]}
    />
  );
}
