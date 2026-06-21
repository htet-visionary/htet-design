import type { ReactNode } from "react";
import { TriangleAlert, X } from "lucide-react";

export type ModalType = "dialog" | "confirmation" | "alert" | "fullscreen" | "drawer";

function DocModalButton({
  variant = "primary-green",
  children,
}: {
  variant?: "primary-green" | "secondary-green" | "destructive";
  children: ReactNode;
}) {
  return (
    <span className={`v-cmp-btn v-cmp-btn--${variant} v-cmp-btn--compact`} aria-hidden>
      {children}
    </span>
  );
}

export function DocModal({
  type = "dialog",
  title = "Confirm changes",
  body = "Your updates will apply to all linked accounts.",
  destructive = false,
}: {
  type?: ModalType;
  title?: string;
  body?: string;
  destructive?: boolean;
}) {
  const stageClass =
    type === "fullscreen"
      ? "v-cmp-modal-stage--fullscreen"
      : type === "drawer"
        ? "v-cmp-modal-stage--drawer"
        : "";

  const modalClass = [
    "v-cmp-modal",
    destructive ? "v-cmp-modal--destructive" : "",
    type === "alert" ? "v-cmp-modal--alert" : "",
    type === "drawer" ? "v-cmp-modal--drawer" : "",
    type === "fullscreen" ? "v-cmp-modal--fullscreen" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={["v-cmp-modal-stage", stageClass].filter(Boolean).join(" ")} aria-hidden>
      <div className="v-cmp-modal-stage__scrim" />
      <div className={modalClass}>
        <header className="v-cmp-modal__header">
          <div className="v-cmp-modal__heading">
            {type === "alert" ? (
              <TriangleAlert className="v-cmp-modal__alert-icon" strokeWidth={2} size={16} />
            ) : null}
            <h3 className="v-cmp-modal__title">{title}</h3>
          </div>
          {type === "dialog" || type === "fullscreen" ? (
            <span className="v-cmp-modal__close" aria-hidden>
              <X strokeWidth={2} size={16} />
            </span>
          ) : null}
        </header>
        <div className="v-cmp-modal__body">
          <p>{body}</p>
        </div>
        <footer className="v-cmp-modal__footer">
          {type === "alert" ? (
            <DocModalButton variant="primary-green">OK</DocModalButton>
          ) : (
            <>
              <DocModalButton variant="secondary-green">Cancel</DocModalButton>
              {destructive ? (
                <DocModalButton variant="destructive">Delete</DocModalButton>
              ) : (
                <DocModalButton variant="primary-green">
                  {type === "confirmation" ? "Confirm" : "Save"}
                </DocModalButton>
              )}
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

type ModalGroupItem = {
  label: string;
  children: ReactNode;
};

function ModalGroup({ items, label }: { items: ModalGroupItem[]; label: string }) {
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

export function ModalVariantsPreview() {
  return (
    <ModalGroup
      label="Variants"
      items={[
        {
          label: "Dialog",
          children: (
            <DocModal
              type="dialog"
              title="Edit profile"
              body="Update your display name and contact details."
            />
          ),
        },
        {
          label: "Confirmation",
          children: (
            <DocModal
              type="confirmation"
              title="Save before leaving?"
              body="Unsaved changes will be lost."
            />
          ),
        },
        {
          label: "Alert",
          children: (
            <DocModal
              type="alert"
              title="Session expired"
              body="Sign in again to continue where you left off."
            />
          ),
        },
        {
          label: "Fullscreen",
          children: (
            <DocModal
              type="fullscreen"
              title="Review statement"
              body="Scroll through the full document before confirming."
            />
          ),
        },
        {
          label: "Drawer",
          children: (
            <DocModal
              type="drawer"
              title="Filter results"
              body="Refine the list by status, date, or owner."
            />
          ),
        },
      ]}
    />
  );
}
