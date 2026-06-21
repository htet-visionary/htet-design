import type { ReactNode } from "react";
import { ArrowRight, Download, Plus, Settings } from "lucide-react";

export type ButtonVariant =
  | "primary-green"
  | "secondary-green"
  | "accent-primary"
  | "accent-secondary"
  | "link";

export type ButtonState = "default" | "hover" | "active" | "focus" | "disabled";
export type ButtonSize = "sm" | "md" | "lg";

type MatrixVariant = Exclude<ButtonVariant, "link">;

const matrixVariants: { id: MatrixVariant; label: string }[] = [
  { id: "primary-green", label: "Primary green" },
  { id: "secondary-green", label: "Secondary green" },
  { id: "accent-primary", label: "Accent primary" },
  { id: "accent-secondary", label: "Accent secondary" },
];

const matrixStates: { id: ButtonState; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover" },
  { id: "active", label: "Press" },
  { id: "disabled", label: "Inactive" },
  { id: "focus", label: "Focus" },
];

function ButtonIcon({ children }: { children: ReactNode }) {
  return <span className="v-cmp-btn__icon">{children}</span>;
}

export function DocButton({
  variant = "primary-green",
  state = "default",
  size = "md",
  iconOnly = false,
  prefix,
  suffix,
  icon,
  children,
  className,
}: {
  variant?: ButtonVariant;
  state?: ButtonState;
  size?: ButtonSize;
  iconOnly?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "v-cmp-btn",
        `v-cmp-btn--${variant}`,
        `v-cmp-btn--${size}`,
        state !== "default" ? `v-cmp-btn--${state}` : "",
        iconOnly ? "v-cmp-btn--icon-only" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      {iconOnly ? (
        <ButtonIcon>{icon ?? <Plus strokeWidth={2} size={18} />}</ButtonIcon>
      ) : (
        <>
          {prefix ? <ButtonIcon>{prefix}</ButtonIcon> : null}
          {children ? <span className="v-cmp-btn__label">{children}</span> : null}
          {suffix ? <ButtonIcon>{suffix}</ButtonIcon> : null}
        </>
      )}
    </span>
  );
}

type ButtonGroupItem = {
  label: string;
  children: ReactNode;
};

function ButtonGroup({ items, label }: { items: ButtonGroupItem[]; label: string }) {
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

export function ButtonVariantsPreview() {
  return (
    <div className="v-foundation-preview v-cmp-btn-matrix" aria-label="Button variants and states">
      <table className="v-cmp-btn-matrix__table">
        <thead>
          <tr>
            <th scope="col" className="v-cmp-btn-matrix__corner" />
            {matrixVariants.map((variant) => (
              <th key={variant.id} scope="col" className="v-cmp-btn-matrix__variant">
                {variant.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixStates.map((state) => (
            <tr key={state.id} className="v-cmp-btn-matrix__row">
              <th scope="row" className="v-cmp-btn-matrix__state">
                {state.label}
              </th>
              {matrixVariants.map((variant) => (
                <td key={variant.id} className="v-cmp-btn-matrix__cell">
                  <DocButton variant={variant.id} state={state.id} size="sm">
                    Button
                  </DocButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ButtonSizesPreview() {
  return (
    <ButtonGroup
      label="Button sizes"
      items={[
        {
          label: "Small · sm",
          children: (
            <DocButton variant="primary-green" size="sm">
              Small
            </DocButton>
          ),
        },
        {
          label: "Medium · md",
          children: (
            <DocButton variant="primary-green" size="md">
              Medium
            </DocButton>
          ),
        },
        {
          label: "Large · lg",
          children: (
            <DocButton variant="primary-green" size="lg">
              Large
            </DocButton>
          ),
        },
      ]}
    />
  );
}

export function ButtonIconAffixPreview() {
  return (
    <ButtonGroup
      label="Prefix and suffix icons"
      items={[
        {
          label: "Prefix icon",
          children: (
            <DocButton variant="primary-green" prefix={<Download strokeWidth={2} size={16} />}>
              Download
            </DocButton>
          ),
        },
        {
          label: "Suffix icon",
          children: (
            <DocButton variant="primary-green" suffix={<ArrowRight strokeWidth={2} size={16} />}>
              Continue
            </DocButton>
          ),
        },
        {
          label: "Prefix and suffix",
          children: (
            <DocButton
              variant="secondary-green"
              prefix={<Plus strokeWidth={2} size={16} />}
              suffix={<ArrowRight strokeWidth={2} size={16} />}
            >
              Add item
            </DocButton>
          ),
        },
      ]}
    />
  );
}

export function LinkButtonPreview() {
  return (
    <ButtonGroup
      label="Link buttons"
      items={[
        {
          label: "Default",
          children: <DocButton variant="link">View all tokens</DocButton>,
        },
        {
          label: "With suffix",
          children: (
            <DocButton variant="link" suffix={<ArrowRight strokeWidth={2} size={16} />}>
              Read documentation
            </DocButton>
          ),
        },
        {
          label: "Hover",
          children: (
            <DocButton variant="link" state="hover">
              View all tokens
            </DocButton>
          ),
        },
      ]}
    />
  );
}

const iconButtonVariants: {
  id: MatrixVariant;
  icon: ReactNode;
}[] = [
  {
    id: "primary-green",
    icon: <Plus strokeWidth={2} size={18} />,
  },
  {
    id: "secondary-green",
    icon: <Settings strokeWidth={2} size={18} />,
  },
  {
    id: "accent-primary",
    icon: <Plus strokeWidth={2} size={18} />,
  },
  {
    id: "accent-secondary",
    icon: <Settings strokeWidth={2} size={18} />,
  },
];

export function IconButtonPreview() {
  return (
    <div className="v-foundation-preview v-cmp-btn-inline" aria-label="Icon buttons">
      {iconButtonVariants.map((item) => (
        <DocButton key={item.id} variant={item.id} iconOnly icon={item.icon} />
      ))}
    </div>
  );
}
