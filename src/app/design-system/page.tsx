import type { CSSProperties } from "react";
import {
  Button,
  Card,
  Input,
  Navigation,
  brand,
  designSystemMeta,
  gradients,
  palette,
  radius,
  spacing,
  elevation,
  textStyles,
  semantic,
} from "../../../design-system";
import { DocBlock, PreviewBox, TokenRow } from "./_components/DocBlocks";
import { DocsSidebar } from "./_components/DocsSidebar";
import { docsNavigation } from "./docs-nav";
import "./docs.css";

const moodBoardSwatches = [
  {
    name: "Soft Green",
    hex: brand.softGreen,
    desc: "Meadow calm, gentle growth",
  },
  {
    name: "Misty Grey",
    hex: brand.mistyGrey,
    desc: "Quiet morning, soft balance",
  },
  {
    name: "White Rabbit",
    hex: brand.whiteRabbit,
    desc: "Pure, clean, like Lucky's fur",
    border: true,
  },
  {
    name: "Statice Purple",
    hex: brand.staticePurple,
    desc: "Dried lavender, gentle magic",
    lightText: true,
  },
  {
    name: "Golden Iridescence",
    hex: brand.golden,
    desc: "The shimmer of something lucky",
    gradient: gradients.goldenIridescence,
  },
];

export default function DesignSystemPage() {
  return (
    <div className="ds-docs-shell">
      <DocsSidebar />

      <div className="ds-docs-body">
        <div className="ds-mobile-nav">
          {docsNavigation.flatMap((g) =>
            g.items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.title}
              </a>
            )),
          )}
        </div>

        <main className="ds-docs-main">
        <div className="ds-docs-main__inner">
          <header id="introduction" className="ds-docs-hero scroll-mt-20">
            <p className="ds-docs-hero__eyebrow">Lucky Charm Brand</p>
            <h1 className="ds-docs-hero__title">
              Design <em>System</em>
            </h1>
            <p className="ds-docs-hero__desc">{designSystemMeta.description}</p>
            <div className="ds-docs-hero__palette" aria-hidden>
              <span style={{ background: brand.softGreen }} />
              <span style={{ background: brand.mistyGrey }} />
              <span style={{ background: brand.whiteRabbit }} />
              <span style={{ background: brand.staticePurple }} />
              <span style={{ background: gradients.goldenIridescence }} />
            </div>
          </header>

          <DocBlock
            id="colors"
            title="Colors"
            description="Five core swatches from the Lucky Charm brand — each colour carries a feeling, from morning meadow calm to quiet iridescent magic."
          >
            <div className="ds-swatch-grid">
              {moodBoardSwatches.map((swatch) => (
                <div key={swatch.name} className="ds-swatch-card">
                  <div
                    className="ds-swatch-card__color"
                    style={{
                      background: swatch.gradient ?? swatch.hex,
                      border: swatch.border
                        ? "1px solid rgba(0,0,0,0.07)"
                        : undefined,
                    }}
                  >
                    <span
                      className="ds-swatch-card__hex"
                      style={{
                        color: swatch.lightText
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(0,0,0,0.55)",
                        background: swatch.lightText
                          ? "rgba(255,255,255,0.25)"
                          : undefined,
                      }}
                    >
                      {swatch.gradient ? "Iridescent" : swatch.hex}
                    </span>
                  </div>
                  <div className="ds-swatch-card__info">
                    <p className="ds-swatch-card__name">{swatch.name}</p>
                    <p className="ds-swatch-card__desc">{swatch.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <PreviewBox>
              <div className="grid gap-4 sm:grid-cols-2">
                {(Object.keys(palette) as Array<keyof typeof palette>).map(
                  (name) => {
                    const scale = palette[name];
                    const entries = Object.entries(scale);
                    return (
                      <div key={name}>
                        <p
                          className="mb-2 text-sm font-medium"
                          style={{
                            fontFamily: "var(--ds-font-sans)",
                            color: "var(--ds-text-primary)",
                          }}
                        >
                          {name}
                        </p>
                        <div className="ds-scale-row">
                          {entries.map(([step, hex]) => (
                            <div
                              key={step}
                              className="ds-scale-chip"
                              title={`${name}.${step}: ${hex}`}
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="typography"
            title="Typography"
            description="Playfair Display for headings, Lora for body copy, and DM Sans for labels and navigation — matching the Lucky Charm website."
          >
            <PreviewBox>
              <div
                className="overflow-hidden rounded-[var(--ds-radius-card)] border border-[var(--ds-border-default)] bg-white"
              >
                {(
                  Object.entries(textStyles) as [
                    string,
                    (typeof textStyles)[keyof typeof textStyles],
                  ][]
                ).map(([name, style]) => (
                  <div key={name} className="ds-type-row">
                    <div className="ds-type-row__label">{name}</div>
                    <div className="ds-type-row__sample">
                      <span
                        style={{
                          ...(style as CSSProperties),
                          color:
                            name === "subheading" ||
                            name === "body" ||
                            name === "bodySmall"
                              ? "var(--ds-text-secondary)"
                              : name === "display" ||
                                  name === "heading1" ||
                                  name === "heading2"
                                ? "var(--ds-brand-deep-green)"
                                : "var(--ds-text-primary)",
                        }}
                      >
                        {name === "display"
                          ? "Everyday luck"
                          : name === "subheading"
                            ? "A tiny friend to bring you luck"
                            : "The quick brown rabbit hops softly through the meadow"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="spacing"
            title="Spacing"
            description="Generous breathing room — 4px base unit with airy section padding like the brand site."
          >
            <PreviewBox>
              {(["2", "4", "6", "8", "12"] as const).map((key) => (
                <div
                  key={key}
                  className="mb-3 flex items-center gap-3 last:mb-0"
                >
                  <div
                    style={{
                      width: spacing[key],
                      height: spacing[2],
                      backgroundColor: "var(--ds-brand-soft-green)",
                      borderRadius: radius.sm,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--ds-font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--ds-text-secondary)",
                    }}
                  >
                    {key} · {spacing[key]}
                  </span>
                </div>
              ))}
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="radius"
            title="Radius"
            description="Pill-shaped buttons and soft card corners — bead-like and organic."
          >
            <PreviewBox>
              <div className="flex flex-wrap gap-4">
                {(
                  [
                    ["sm", radius.sm],
                    ["lg", radius.lg],
                    ["card", radius.card],
                    ["cardLg", radius.cardLg],
                    ["full", radius.full],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="text-center">
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: value,
                        backgroundColor: "var(--ds-statice-purple-100)",
                        border: "1.5px solid var(--ds-border-default)",
                      }}
                    />
                    <p
                      className="mt-1 text-xs"
                      style={{
                        fontFamily: "var(--ds-font-sans)",
                        color: "var(--ds-text-tertiary)",
                      }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="elevation"
            title="Elevation"
            description="Green and purple tinted shadows — diffused like soft natural light."
          >
            <PreviewBox>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {(
                  [
                    ["xs", elevation.xs],
                    ["sm", elevation.sm],
                    ["md", elevation.md],
                    ["card", elevation.card],
                    ["primaryHover", elevation.primaryHover],
                    ["iridescent", elevation.iridescent],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex h-16 items-center justify-center rounded-xl text-xs"
                    style={{
                      backgroundColor: "var(--ds-surface-default)",
                      boxShadow: value,
                      fontFamily: "var(--ds-font-sans)",
                      color: "var(--ds-text-secondary)",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="tokens-primitive"
            title="Primitive Tokens"
            description="Raw values mapped 1:1 from foundations."
          >
            <PreviewBox>
              <TokenRow name="brand.deepGreen" value={brand.deepGreen} />
              <TokenRow name="brand.staticePurple" value={brand.staticePurple} />
              <TokenRow name="brand.softGreen" value={brand.softGreen} />
              <TokenRow name="brand.textDark" value={brand.textDark} />
              <TokenRow name="brand.textMuted" value={brand.textMuted} />
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="tokens-semantic"
            title="Semantic Tokens"
            description="Purpose-driven aliases for UI roles."
          >
            <PreviewBox>
              <TokenRow
                name="action.primary"
                value={semantic.color.action.primary}
              />
              <TokenRow
                name="action.primaryHover"
                value={semantic.color.action.primaryHover}
              />
              <TokenRow
                name="text.primary"
                value={semantic.color.text.primary}
              />
              <TokenRow name="text.accent" value={semantic.color.text.accent} />
              <TokenRow
                name="border.default"
                value={semantic.color.border.default}
              />
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="tokens-component"
            title="Component Tokens"
            description="Per-component values for Button, Input, Card, and Navigation."
          >
            <PreviewBox>
              <TokenRow name="button.borderRadius" value="9999px (pill)" />
              <TokenRow
                name="card.borderRadius"
                value={radius.cardLg}
              />
              <TokenRow
                name="navigation.backdropBlur"
                value="12px"
              />
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="button"
            title="Button"
            description="Pill-shaped CTAs — deep green primary with purple hover glow, matching the Lucky Charm hero."
          >
            <PreviewBox>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Shop charms</Button>
                <Button variant="secondary">Learn more</Button>
                <Button variant="iridescent">Discover luck</Button>
                <Button variant="link">Our story</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </PreviewBox>
            <PreviewBox>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="input"
            title="Input"
            description="Soft green borders with italic Lora placeholders."
          >
            <PreviewBox>
              <div className="grid max-w-md gap-4">
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  hint="We'll never share your email."
                />
                <Input label="Name" error="This field is required" />
              </div>
            </PreviewBox>
          </DocBlock>

          <DocBlock
            id="card"
            title="Card"
            description="White surfaces with green-tinted borders and optional iridescent accent bar."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                title="Rosemary"
                description="Clean apothecary essentials with a fresh green label."
                interactive
                footer={
                  <Button variant="secondary" size="sm">
                    View details
                  </Button>
                }
              />
              <Card variant="accent" title="Statice" interactive>
                <p>Dried florals in dusty purple — organic structure against textured white.</p>
              </Card>
            </div>
          </DocBlock>

          <DocBlock
            id="navigation"
            title="Navigation"
            description="Frosted glass bar with Playfair brand and uppercase DM Sans links."
          >
            <PreviewBox>
              <Navigation
                brand={
                  <>
                    Lucky <span>Charm</span>
                  </>
                }
                items={[
                  { label: "Story", href: "#navigation-story", active: true },
                  { label: "Charms", href: "#navigation-charms" },
                  { label: "Shop", href: "#navigation-shop" },
                ]}
                actions={<Button size="sm">Contact</Button>}
              />
            </PreviewBox>
          </DocBlock>
        </div>
      </main>
      </div>
    </div>
  );
}
