import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HubSectionPage } from "@/components/HubSectionPage";
import { dreamFundProductBrand } from "@/lib/product-content";

export default function ProductPage() {
  return (
    <HubSectionPage
      title="Product"
      description="Current products designed and built with the Visionary design system."
      layout="content"
    >
      <article className="v-hub-product-brand v-theme-dream-fund">
        <p className="v-hub-product-brand__eyebrow">Current branding</p>

        <h2 className="v-hub-product-brand__name">
          <span className="v-hub-product-brand__name-dream">Dream </span>
          <span className="v-hub-product-brand__name-fund">Fund</span>
        </h2>

        <p className="v-hub-product-brand__tagline">{dreamFundProductBrand.tagline}</p>
        <p className="v-hub-product-brand__desc">{dreamFundProductBrand.description}</p>
        <p className="v-hub-product-brand__visionary">{dreamFundProductBrand.visionaryDescription}</p>

        <div className="v-hub-product-brand__colors">
          <h3 className="v-hub-product-brand__colors-title">Color theme</h3>
          <ul className="v-hub-product-brand__colors-list">
            {dreamFundProductBrand.colors.map((color) => (
              <li key={color.hex} className="v-hub-product-brand__color">
                <span
                  className="v-hub-product-brand__color-swatch"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden
                />
                <div className="v-hub-product-brand__color-copy">
                  <p className="v-hub-product-brand__color-label">{color.label}</p>
                  <p className="v-hub-product-brand__color-role">{color.role}</p>
                  <p className="v-hub-product-brand__color-hex">{color.hex}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="v-hub-product-brand__links">
          <Link href={dreamFundProductBrand.links.theme} className="v-hub-product-brand__link">
            Visionary theme
            <ArrowUpRight className="v-hub-product-brand__link-icon" aria-hidden strokeWidth={2} />
          </Link>
          <Link href={dreamFundProductBrand.links.caseStudy} className="v-hub-product-brand__link">
            Case study
            <ArrowUpRight className="v-hub-product-brand__link-icon" aria-hidden strokeWidth={2} />
          </Link>
        </div>
      </article>
    </HubSectionPage>
  );
}
