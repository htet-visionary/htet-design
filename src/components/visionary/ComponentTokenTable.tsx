import { CopyHexCode } from "@/components/visionary/CopyHexCode";

type ComponentTokenTableProps = {
  tokens: Record<string, unknown>;
};

type TokenLeaf = {
  token: string;
  value: string;
};

const componentDescriptions: Record<string, string> = {
  button: "Button fills, borders, and label colors.",
  input: "Field surfaces, borders, and validation colors.",
  card: "Container surfaces and typography colors.",
  alert: "Status feedback surfaces and accents.",
  modal: "Dialog surfaces and scrim overlays.",
};

function isColorValue(value: string): boolean {
  return /^#|^rgba?\(/i.test(value.trim());
}

function collectColorLeaves(obj: Record<string, unknown>, prefix = ""): TokenLeaf[] {
  const leaves: TokenLeaf[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const token = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      leaves.push(...collectColorLeaves(value as Record<string, unknown>, token));
    } else {
      const stringValue = String(value);
      if (isColorValue(stringValue)) {
        leaves.push({ token, value: stringValue });
      }
    }
  }

  return leaves;
}

function stripTokenPrefix(token: string, prefix: string): string {
  const head = `${prefix}.`;
  return token.startsWith(head) ? token.slice(head.length) : token;
}

function formatDisplayName(label: string): string {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/[._-]/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function TokenMiniPreview({ token, value }: { token: string; value: string }) {
  const label = token.split(".").slice(-1)[0] ?? "";
  const isText =
    label.includes("text") ||
    label.includes("label") ||
    label.includes("placeholder") ||
    label.includes("helper") ||
    label.includes("errorText");
  const isBorder = label.includes("border");
  const isScrim = label === "scrim";
  const isTransparent = value === "transparent";

  if (isTransparent) {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--border">
        <span className="v-semantic-card__preview--transparent" />
      </div>
    );
  }

  if (isText) {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--text">
        <span style={{ color: value }}>Aa</span>
      </div>
    );
  }

  if (isBorder) {
    return (
      <div
        className="v-semantic-card__preview v-semantic-card__preview--border"
        style={{ borderColor: value, borderWidth: 2 }}
      />
    );
  }

  if (isScrim) {
    return (
      <div className="v-semantic-card__preview v-semantic-card__preview--overlay">
        <span style={{ backgroundColor: value }} />
      </div>
    );
  }

  return (
    <div
      className="v-semantic-card__preview v-semantic-card__preview--fill"
      style={{ backgroundColor: value }}
    />
  );
}

function ComponentTokenCard({
  token,
  value,
  prefix,
}: TokenLeaf & { prefix: string }) {
  const display = stripTokenPrefix(token, prefix);

  return (
    <li className="v-semantic-card">
      <TokenMiniPreview token={token} value={value} />
      <div className="v-semantic-card__body">
        <code className="v-semantic-card__token">{display}</code>
        <CopyHexCode hex={value} className="v-copy-hex--token" />
      </div>
    </li>
  );
}

function AlertGroup({ name, tokens }: { name: string; tokens: Record<string, unknown> }) {
  const prefix = `alert.${name}`;
  const leaves = collectColorLeaves(tokens, prefix);

  if (leaves.length === 0) {
    return null;
  }

  return (
    <div className={`v-semantic-status v-semantic-status--${name}`}>
      <p className="v-semantic-status__label">{formatDisplayName(name)}</p>
      <ul className="v-semantic-grid">
        {leaves.map((leaf) => (
          <ComponentTokenCard key={leaf.token} {...leaf} prefix={prefix} />
        ))}
      </ul>
    </div>
  );
}

function ComponentBlock({
  name,
  value,
}: {
  name: string;
  value: unknown;
}) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (name === "alert") {
    return (
      <section className="v-semantic-section v-semantic-section--alert">
        <header className="v-semantic-section__header">
          <h4 className="v-semantic-section__title">{formatDisplayName(name)}</h4>
          <p className="v-semantic-section__desc">{componentDescriptions[name]}</p>
        </header>
        <div className="v-semantic-status-list">
          {Object.entries(record).map(([variant, tokens]) => (
            <AlertGroup key={variant} name={variant} tokens={tokens as Record<string, unknown>} />
          ))}
        </div>
      </section>
    );
  }

  const leaves = collectColorLeaves(record, name);

  if (leaves.length === 0) {
    return null;
  }

  return (
    <section className={`v-semantic-section v-semantic-section--${name}`}>
      <header className="v-semantic-section__header">
        <h4 className="v-semantic-section__title">{formatDisplayName(name)}</h4>
        <p className="v-semantic-section__desc">{componentDescriptions[name]}</p>
      </header>
      <ul className="v-semantic-grid">
        {leaves.map((leaf) => (
          <ComponentTokenCard key={leaf.token} {...leaf} prefix={name} />
        ))}
      </ul>
    </section>
  );
}

export function ComponentTokenTable({ tokens }: ComponentTokenTableProps) {
  return (
    <div className="v-semantic-board">
      {Object.entries(tokens).map(([name, value]) => (
        <ComponentBlock key={name} name={name} value={value} />
      ))}
    </div>
  );
}
