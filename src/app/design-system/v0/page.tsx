import Link from "next/link";
import {
  brandColors,
  functionalRamps,
  primitiveRamps,
  semanticColors,
  v0Meta,
} from "../../../../design-system/v0";

const navSections = [
  { id: "hero", label: "Overview" },
  { id: "brand", label: "Brand Colors" },
  { id: "primitive", label: "Primitive Colors" },
  { id: "functional", label: "Universal Standard Colors" },
  { id: "semantic", label: "Semantic Colors" },
];

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export default function DesignSystemV0Page() {
  return (
    <div className="ds-v0__shell">
      <aside className="ds-v0__sidebar">
        <Link href="/" className="ds-v0__sidebar-back">
          ← Back
        </Link>
        <p className="ds-v0__sidebar-brand">Design System</p>
        <p className="ds-v0__sidebar-version">Design System · v0</p>
        <p className="ds-v0__nav-label">Foundations</p>
        <nav aria-label="Color foundations">
          {navSections.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`ds-v0__nav-link${i === 1 ? " ds-v0__nav-link--active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="ds-v0__main">
        <div className="ds-v0__container">
          {/* Hero */}
          <header id="hero" className="ds-v0__hero ds-v0__section">
            <span className="ds-v0__hero-badge">Version 0</span>
            <h1 className="ds-v0__display">{v0Meta.name}</h1>
            <p className="ds-v0__hero-subtitle">{v0Meta.page}</p>
            <p className="ds-v0__body">{v0Meta.description}</p>
            <div className="ds-v0__hero-accent" aria-hidden />
          </header>

          <div className="ds-v0__divider" />

          {/* Brand Colors */}
          <section id="brand" className="ds-v0__section">
            <div className="ds-v0__section-header">
              <h2 className="ds-v0__h2">Brand Colors</h2>
              <p className="ds-v0__body">
                Three core brand colors that define the visual identity.
                Used intentionally across product, marketing, and digital touchpoints.
              </p>
            </div>
            <div className="ds-v0__brand-grid">
              {brandColors.map((color) => (
                <article key={color.id} className="ds-v0__brand-card">
                  <div
                    className="ds-v0__brand-swatch"
                    style={{
                      background:
                        "gradient" in color && color.gradient
                          ? color.gradient
                          : color.hex,
                    }}
                  />
                  <div className="ds-v0__brand-info">
                    <h3 className="ds-v0__brand-name">{color.name}</h3>
                    <code className="ds-v0__mono">
                      {color.hex === "Gradient" ? "Custom gradient" : color.hex}
                    </code>
                    <p className="ds-v0__brand-usage">{color.usage}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Primitive Colors */}
          <section id="primitive" className="ds-v0__section">
            <div className="ds-v0__section-header">
              <h2 className="ds-v0__h2">Primitive Colors</h2>
              <p className="ds-v0__body">
                Scalable color ramps that power every token in the system. Each
                scale provides 10 steps from lightest to darkest.
              </p>
            </div>
            {Object.values(primitiveRamps).map((ramp) => (
              <div key={ramp.name} className="ds-v0__ramp">
                <div className="ds-v0__ramp-header">
                  <h3 className="ds-v0__h3">{ramp.name}</h3>
                  <span className="ds-v0__caption">
                    {ramp.name.toLowerCase()}.50 → {ramp.name.toLowerCase()}.900
                  </span>
                </div>
                <div className="ds-v0__ramp-row">
                  {Object.entries(ramp.steps).map(([step, hex]) => (
                    <div
                      key={step}
                      className="ds-v0__ramp-chip"
                      style={{
                        backgroundColor: hex,
                        color: isLight(hex) ? "#171717" : "#fff",
                      }}
                      title={`${ramp.name.toLowerCase()}.${step}: ${hex}`}
                    >
                      <span className="ds-v0__ramp-step">{step}</span>
                      <span>{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Universal Standard Colors */}
          <section id="functional" className="ds-v0__section">
            <div className="ds-v0__section-header">
              <h2 className="ds-v0__h2">Universal Standard Colors</h2>
              <p className="ds-v0__body">
                System feedback palettes tuned to the brand — muted greens, warm
                golds, soft roses, and calm slate blues. Clear signaling without
                breaking the luxurious tone.
              </p>
            </div>
            <div className="ds-v0__functional-grid">
              {Object.values(functionalRamps).map((ramp) => (
                <article key={ramp.name} className="ds-v0__functional-card">
                  <div
                    className="ds-v0__functional-swatch"
                    style={{ backgroundColor: ramp.steps[500] }}
                  />
                  <div className="ds-v0__functional-info">
                    <p className="ds-v0__functional-name">{ramp.name}</p>
                    <code className="ds-v0__mono">{ramp.steps[500]}</code>
                    <p className="ds-v0__caption" style={{ marginTop: 8 }}>
                      {ramp.usage}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {Object.values(functionalRamps).map((ramp) => (
              <div key={ramp.name} className="ds-v0__ramp ds-v0__ramp--functional">
                <div className="ds-v0__ramp-header">
                  <h3 className="ds-v0__h3">{ramp.name}</h3>
                  <span className="ds-v0__caption">
                    {ramp.name.toLowerCase()}.50 → {ramp.name.toLowerCase()}.900
                  </span>
                </div>
                <div className="ds-v0__ramp-row">
                  {Object.entries(ramp.steps).map(([step, hex]) => (
                    <div
                      key={step}
                      className="ds-v0__ramp-chip"
                      style={{
                        backgroundColor: hex,
                        color: isLight(hex) ? "#171717" : "#fff",
                      }}
                      title={`${ramp.name.toLowerCase()}.${step}: ${hex}`}
                    >
                      <span className="ds-v0__ramp-step">{step}</span>
                      <span>{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Semantic Colors */}
          <section id="semantic" className="ds-v0__section">
            <div className="ds-v0__section-header">
              <h2 className="ds-v0__h2">Semantic Colors</h2>
              <p className="ds-v0__body">
                Purpose-driven tokens mapped to UI roles. Components reference
                semantic tokens — never primitives directly.
              </p>
            </div>
            <div className="ds-v0__table-wrap">
              <table className="ds-v0__table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Value</th>
                    <th>Primitive</th>
                    <th>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {semanticColors.map((row) => (
                    <tr key={row.token}>
                      <td className="ds-v0__table-token">{row.token}</td>
                      <td>
                        <span className="ds-v0__table-swatch">
                          <span
                            className="ds-v0__table-dot"
                            style={
                              "gradient" in row && row.gradient
                                ? { background: row.value }
                                : { backgroundColor: row.value }
                            }
                          />
                          <code className="ds-v0__mono">
                            {"gradient" in row && row.gradient
                              ? "Custom gradient"
                              : row.value}
                          </code>
                        </span>
                      </td>
                      <td className="ds-v0__caption">{row.primitive}</td>
                      <td className="ds-v0__caption">{row.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
