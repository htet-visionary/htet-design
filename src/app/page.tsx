import type { Metadata } from "next";
import Link from "next/link";
import {
  foundations,
  primitive,
  semantic,
  themes,
  visionaryMeta,
} from "../../design-system/visionary";
import { GlobalNav } from "@/components/GlobalNav";
import "../../design-system/visionary/styles/visionary.css";
import "./visionary-home.css";

export const metadata: Metadata = {
  title: "Visionary Design System",
  description: visionaryMeta.description,
};

const tokenLayers = [
  { name: "Primitive", desc: "Raw palette values — definitions only" },
  { name: "Semantic", desc: "Purpose-driven UI roles shared across products" },
  { name: "Component", desc: "Button, Input, Card, Alert, Modal slots" },
  { name: "Theme", desc: "Product personality overrides" },
];

export default function VisionaryHomePage() {
  return (
    <div className="visionary-root min-h-dvh">
      <GlobalNav />

      <main className="v-home">
        <header className="v-home__hero">
          <p className="v-home__eyebrow">Version {visionaryMeta.version}</p>
          <h1 className="v-home__title">{visionaryMeta.name}</h1>
          <p className="v-home__desc">{visionaryMeta.description}</p>
          <div className="v-home__hero-actions">
            <Link href="/menu" className="v-home__link-secondary">
              All sections
            </Link>
          </div>
        </header>

        <section className="v-home__section" aria-labelledby="principles-heading">
          <h2 id="principles-heading" className="v-home__heading">
            Principles
          </h2>
          <ul className="v-home__principles">
            {visionaryMeta.principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </section>

        <section className="v-home__section" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="v-home__heading">
            Token architecture
          </h2>
          <p className="v-home__body">
            Product UI consumes semantic and component tokens. Themes remap
            allowed slots. Primitives flow downward only.
          </p>
          <ol className="v-home__layers">
            {tokenLayers.map((layer, index) => (
              <li key={layer.name} className="v-home__layer">
                <span className="v-home__layer-index">{index + 1}</span>
                <div>
                  <strong>{layer.name}</strong>
                  <p>{layer.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="v-home__section" aria-labelledby="products-heading">
          <h2 id="products-heading" className="v-home__heading">
            Products
          </h2>
          <div className="v-home__product-grid">
            <article className="v-home__card">
              <h3>{themes.luckyCharm.name}</h3>
              <p>
                Primary green with lavender accent and iridescence highlights.
              </p>
            </article>
            <article className="v-home__card">
              <h3>{themes.dreamFund.name}</h3>
              <p>
                Primary green with warm warning-toned accent for brand
                personality.
              </p>
            </article>
          </div>
        </section>

        <section className="v-home__section" aria-labelledby="foundations-heading">
          <h2 id="foundations-heading" className="v-home__heading">
            Foundation snapshot
          </h2>
          <p className="v-home__body">
            Token stubs are available in{" "}
            <code className="v-home__code">design-system/visionary/</code>.
            Source of truth:{" "}
            <code className="v-home__code">{visionaryMeta.specPath}</code>.
          </p>
          <dl className="v-home__stats">
            <div>
              <dt>Primitive palettes</dt>
              <dd>{Object.keys(primitive).length}</dd>
            </div>
            <div>
              <dt>Spacing steps</dt>
              <dd>{Object.keys(foundations.spacing).length}</dd>
            </div>
            <div>
              <dt>Typography steps</dt>
              <dd>{Object.keys(foundations.typography).length}</dd>
            </div>
            <div>
              <dt>Semantic action primary</dt>
              <dd>
                <span
                  className="v-home__swatch"
                  style={{ background: semantic.action.primary }}
                  aria-hidden
                />
                {semantic.action.primary}
              </dd>
            </div>
          </dl>
        </section>

        <section className="v-home__section v-home__section--muted" aria-labelledby="archives-heading">
          <h2 id="archives-heading" className="v-home__heading">
            Archives
          </h2>
          <p className="v-home__body">
            Previous explorations remain accessible and unchanged.
          </p>
          <ul className="v-home__archive-links">
            <li>
              <Link href="/design-system">Design System v0</Link>
            </li>
            <li>
              <Link href="/design-system/v0">Color Foundations (v0)</Link>
            </li>
            <li>
              <Link href="/product/rabbit">Lucky Charm v0</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
