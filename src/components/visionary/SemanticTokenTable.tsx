import { CopyHexCode } from "@/components/visionary/CopyHexCode";

type SemanticTokenTableProps = {
  tokens: Record<string, unknown>;
};

type TokenLeaf = {
  token: string;
  value: string;
};

const categoryDescriptions: Record<string, string> = {
  background: "Canvas and page fills that sit behind content.",
  surface: "Cards, panels, and containers that hold UI elements.",
  text: "Type hierarchy for headings, body, and supporting copy.",
  brand: "Core brand accents for identity moments.",
  border: "Dividers and outlines that structure layout.",
  action: "Interactive fills for buttons and controls.",
  link: "Inline navigation and text links.",
  focus: "Keyboard focus rings and offsets.",
  disabled: "Muted states for inactive controls.",
  overlay: "Scrim layers for modals and drawers.",
  status: "Feedback palettes for system messages.",
};

function isColorValue(value: string): boolean {
  return /^#|^rgba?\(/i.test(value.trim());
}

function collectLeaves(obj: Record<string, unknown>, prefix = ""): TokenLeaf[] {
  const leaves: TokenLeaf[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const token = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      leaves.push(...collectLeaves(value as Record<string, unknown>, token));
    } else {
      leaves.push({ token, value: String(value) });
    }
  }

  return leaves;
}

function topCategory(token: string): string {
  return token.split(".")[0] ?? token;
}

function tokenLabel(token: string): string {
  return token.split(".").slice(1).join(".") || token;
}

function formatDisplayName(label: string): string {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/[._-]/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function RoleCanvas({
  category,
  token,
  value,
}: {
  category: string;
  token: string;
  value: string;
}) {
  const label = tokenLabel(token);
  const isElevated = label.includes("elevated");
  const isRing = label === "ring";
  const isOnSolid = label.includes("onSolid");
  const isSolid = label.includes("solid") && category === "status";
  const isBorder = label.includes("border");
  const isTextLike =
    category === "text" ||
    label.includes("text") ||
    label.includes("icon") ||
    (isOnSolid && category === "status");

  if (!isColorValue(value)) {
    return (
      <div className="v-role-canvas v-role-canvas--value">
        <span>{value}</span>
      </div>
    );
  }

  if (category === "text" || (category === "status" && isTextLike && !isSolid)) {
    return (
      <div
        className={[
          "v-role-canvas",
          "v-role-canvas--text",
          isOnSolid && "v-role-canvas--on-solid",
        ]
          .filter(Boolean)
          .join(" ")}
        style={isOnSolid ? { backgroundColor: "var(--v-text-primary)" } : undefined}
      >
        <p className="v-role-canvas__sample" style={{ color: value }}>
          Aa
        </p>
        <p className="v-role-canvas__line" style={{ color: value }}>
          Visionary
        </p>
      </div>
    );
  }

  if (category === "link") {
    return (
      <div className="v-role-canvas v-role-canvas--link">
        <span className="v-role-canvas__link" style={{ color: value }}>
          Learn more
        </span>
      </div>
    );
  }

  if (category === "focus") {
    return (
      <div className="v-role-canvas v-role-canvas--focus">
        <span
          className="v-role-canvas__focus-chip"
          style={
            isRing
              ? { boxShadow: `0 0 0 3px ${value}` }
              : { backgroundColor: value }
          }
        />
      </div>
    );
  }

  if (category === "border" || (category === "status" && isBorder)) {
    return (
      <div
        className="v-role-canvas v-role-canvas--border"
        style={{ borderColor: value }}
      />
    );
  }

  if (category === "action" || (category === "status" && isSolid)) {
    return (
      <div className="v-role-canvas v-role-canvas--action" style={{ backgroundColor: value }}>
        <span>Action</span>
      </div>
    );
  }

  if (category === "overlay") {
    return (
      <div className="v-role-canvas v-role-canvas--overlay">
        <div className="v-role-canvas__overlay-scene" aria-hidden />
        <div className="v-role-canvas__overlay-fill" style={{ backgroundColor: value }} />
      </div>
    );
  }

  if (category === "brand") {
    return (
      <div className="v-role-canvas v-role-canvas--brand" style={{ backgroundColor: value }} />
    );
  }

  if (category === "disabled") {
    return (
      <div
        className="v-role-canvas v-role-canvas--disabled"
        style={{ backgroundColor: value }}
      />
    );
  }

  if (category === "surface") {
    return (
      <div
        className={[
          "v-role-canvas",
          "v-role-canvas--surface",
          isElevated && "v-role-canvas--elevated",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ backgroundColor: value }}
      />
    );
  }

  return (
    <div
      className="v-role-canvas v-role-canvas--fill"
      style={{ backgroundColor: value }}
    />
  );
}

function RoleCard({ token, value }: TokenLeaf) {
  const category = topCategory(token);
  const label = tokenLabel(token);

  return (
    <li className={`v-role-card v-role-card--${category}`}>
      <RoleCanvas category={category} token={token} value={value} />
      <div className="v-role-card__meta">
        <p className="v-role-card__name">{formatDisplayName(label)}</p>
        <p className="v-role-card__token">{token}</p>
        <CopyHexCode hex={value} className="v-copy-hex--role" />
      </div>
    </li>
  );
}

function StatusGroup({ name, tokens }: { name: string; tokens: Record<string, unknown> }) {
  const leaves = collectLeaves(tokens, `status.${name}`);

  return (
    <div className={`v-role-status v-role-status--${name}`}>
      <p className="v-role-status__label">{formatDisplayName(name)}</p>
      <ul className="v-role-group__grid v-role-group__grid--status">
        {leaves.map((leaf) => (
          <RoleCard key={leaf.token} {...leaf} />
        ))}
      </ul>
    </div>
  );
}

function CategoryBlock({
  category,
  value,
}: {
  category: string;
  value: unknown;
}) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (category === "status") {
    return (
      <section className="v-role-group v-role-group--status">
        <header className="v-role-group__header">
          <h4 className="v-role-group__title">{formatDisplayName(category)}</h4>
          <p className="v-role-group__desc">{categoryDescriptions[category]}</p>
        </header>
        <div className="v-role-status-list">
          {Object.entries(record).map(([name, tokens]) => (
            <StatusGroup key={name} name={name} tokens={tokens as Record<string, unknown>} />
          ))}
        </div>
      </section>
    );
  }

  const leaves = collectLeaves(record, category);

  return (
    <section className={`v-role-group v-role-group--${category}`}>
      <header className="v-role-group__header">
        <h4 className="v-role-group__title">{formatDisplayName(category)}</h4>
        {categoryDescriptions[category] && (
          <p className="v-role-group__desc">{categoryDescriptions[category]}</p>
        )}
      </header>
      <ul className="v-role-group__grid">
        {leaves.map((leaf) => (
          <RoleCard key={leaf.token} {...leaf} />
        ))}
      </ul>
    </section>
  );
}

export function SemanticTokenTable({ tokens }: SemanticTokenTableProps) {
  return (
    <div className="v-role-board">
      {Object.entries(tokens).map(([category, value]) => (
        <CategoryBlock key={category} category={category} value={value} />
      ))}
    </div>
  );
}
