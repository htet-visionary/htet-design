import { CopyHexCode } from "@/components/visionary/CopyHexCode";

type SemanticTokenTableProps = {
  tokens: Record<string, unknown>;
  primitiveRefs: Record<string, unknown>;
};

type TokenLeaf = {
  token: string;
  value: string;
  primitiveRef: string;
};

const categoryDescriptions: Record<string, string> = {
  background: "Canvas fills behind content.",
  surface: "Cards, panels, and containers.",
  text: "Typography hierarchy.",
  brand: "Brand identity accents.",
  border: "Dividers and structural edges.",
  action: "Button and control fills.",
  link: "Inline text links.",
  focus: "Keyboard focus indicators.",
  disabled: "Inactive control states.",
  overlay: "Modal and drawer scrims.",
  status: "System feedback palettes.",
};

function isColorValue(value: string): boolean {
  return /^#|^rgba?\(/i.test(value.trim());
}

function collectLeaves(
  values: Record<string, unknown>,
  primitiveRefs: Record<string, unknown>,
  prefix = "",
): TokenLeaf[] {
  const leaves: TokenLeaf[] = [];

  for (const [key, value] of Object.entries(values)) {
    const token = prefix ? `${prefix}.${key}` : key;
    const refValue = primitiveRefs[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      if (refValue !== null && typeof refValue === "object" && !Array.isArray(refValue)) {
        leaves.push(
          ...collectLeaves(
            value as Record<string, unknown>,
            refValue as Record<string, unknown>,
            token,
          ),
        );
      }
    } else {
      leaves.push({
        token,
        value: String(value),
        primitiveRef: String(refValue ?? value),
      });
    }
  }

  return leaves;
}

function topCategory(token: string): string {
  return token.split(".")[0] ?? token;
}

function stripTokenPrefix(token: string, prefix: string): string {
  const head = `${prefix}.`;
  return token.startsWith(head) ? token.slice(head.length) : token;
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

function borderWeight(label: string): number {
  return label.includes("strong") ? 2 : 1;
}

function TokenMiniPreview({
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
  const isSolid = label.includes("solid");
  const isBorder = label.includes("border");
  const isTextLike =
    category === "text" ||
    label.includes("text") ||
    label.includes("icon") ||
    isOnSolid;

  if (!isColorValue(value)) {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--value">
        <span>{value.slice(0, 8)}</span>
      </div>
    );
  }

  if (category === "text" || (category === "status" && isTextLike && !isSolid)) {
    return (
      <div
        className={[
          "v-semantic-card__preview",
          "v-semantic-card__preview--text",
          isOnSolid && "v-semantic-card__preview--on-solid",
        ]
          .filter(Boolean)
          .join(" ")}
        style={isOnSolid ? { backgroundColor: "var(--v-text-primary)" } : undefined}
      >
        <span style={{ color: value }}>Aa</span>
      </div>
    );
  }

  if (category === "link") {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--text">
        <span className="v-semantic-card__link" style={{ color: value }}>
          Link
        </span>
      </div>
    );
  }

  if (category === "focus") {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--focus">
        <span
          className="v-semantic-card__focus"
          style={
            isRing
              ? { boxShadow: `0 0 0 2px ${value}` }
              : { backgroundColor: value }
          }
        />
      </div>
    );
  }

  if (category === "border" || (category === "status" && isBorder)) {
    const weight = borderWeight(label);
    return (
      <div
        className="v-semantic-card__preview v-semantic-card__preview--border"
        style={{ borderColor: value, borderWidth: weight }}
      />
    );
  }

  if (category === "action" || (category === "status" && isSolid)) {
    return (
      <div
        className="v-semantic-card__preview v-semantic-card__preview--action"
        style={{ backgroundColor: value }}
      />
    );
  }

  if (category === "overlay") {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--overlay">
        <span style={{ backgroundColor: value }} />
      </div>
    );
  }

  if (category === "surface") {
    return (
      <div
        className={[
          "v-semantic-card__preview",
          "v-semantic-card__preview--surface",
          isElevated && "v-semantic-card__preview--elevated",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ backgroundColor: value }}
      />
    );
  }

  if (category === "disabled") {
    return (
      <div
        className="v-semantic-card__preview v-semantic-card__preview--disabled"
        style={{ backgroundColor: value }}
      />
    );
  }

  return (
    <div
      className="v-semantic-card__preview v-semantic-card__preview--fill"
      style={{ backgroundColor: value }}
    />
  );
}

function SemanticTokenCard({
  token,
  value,
  primitiveRef,
  prefix,
}: TokenLeaf & { prefix: string }) {
  const category = topCategory(token);
  const display = stripTokenPrefix(token, prefix);

  return (
    <li className={`v-semantic-card v-semantic-card--${category}`}>
      <TokenMiniPreview category={category} token={token} value={value} />
      <div className="v-semantic-card__body">
        <code className="v-semantic-card__token">{display}</code>
        <CopyHexCode hex={primitiveRef} className="v-copy-hex--token" />
      </div>
    </li>
  );
}

function StatusGroup({
  name,
  tokens,
  primitiveRefs,
}: {
  name: string;
  tokens: Record<string, unknown>;
  primitiveRefs: Record<string, unknown>;
}) {
  const prefix = `status.${name}`;
  const leaves = collectLeaves(tokens, primitiveRefs, prefix);

  return (
    <div className={`v-semantic-status v-semantic-status--${name}`}>
      <p className="v-semantic-status__label">{formatDisplayName(name)}</p>
      <ul className="v-semantic-grid">
        {leaves.map((leaf) => (
          <SemanticTokenCard key={leaf.token} {...leaf} prefix={prefix} />
        ))}
      </ul>
    </div>
  );
}

function CategoryBlock({
  category,
  value,
  primitiveRefs,
}: {
  category: string;
  value: unknown;
  primitiveRefs: unknown;
}) {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    primitiveRefs === null ||
    typeof primitiveRefs !== "object" ||
    Array.isArray(primitiveRefs)
  ) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const refRecord = primitiveRefs as Record<string, unknown>;

  if (category === "status") {
    return (
      <section className="v-semantic-section v-semantic-section--status">
        <header className="v-semantic-section__header">
          <h4 className="v-semantic-section__title">{formatDisplayName(category)}</h4>
          <p className="v-semantic-section__desc">{categoryDescriptions[category]}</p>
        </header>
        <div className="v-semantic-status-list">
          {Object.entries(record).map(([name, tokens]) => (
            <StatusGroup
              key={name}
              name={name}
              tokens={tokens as Record<string, unknown>}
              primitiveRefs={refRecord[name] as Record<string, unknown>}
            />
          ))}
        </div>
      </section>
    );
  }

  const leaves = collectLeaves(record, refRecord, category);

  return (
    <section className={`v-semantic-section v-semantic-section--${category}`}>
      <header className="v-semantic-section__header">
        <h4 className="v-semantic-section__title">{formatDisplayName(category)}</h4>
        <p className="v-semantic-section__desc">{categoryDescriptions[category]}</p>
      </header>
      <ul className="v-semantic-grid">
        {leaves.map((leaf) => (
          <SemanticTokenCard key={leaf.token} {...leaf} prefix={category} />
        ))}
      </ul>
    </section>
  );
}

export function SemanticTokenTable({ tokens, primitiveRefs }: SemanticTokenTableProps) {
  return (
    <div className="v-semantic-board">
      {Object.entries(tokens).map(([category, value]) => (
        <CategoryBlock
          key={category}
          category={category}
          value={value}
          primitiveRefs={primitiveRefs[category]}
        />
      ))}
    </div>
  );
}
