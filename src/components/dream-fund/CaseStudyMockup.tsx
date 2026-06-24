type MockupBlock = "hero" | "stat" | "cta" | "header" | "goal" | "progress" | "calendar" | "row" | "alert" | "chart" | "note";

type CaseStudyMockupProps = {
  label: string;
  blocks: readonly MockupBlock[];
};

export function CaseStudyMockup({ label, blocks }: CaseStudyMockupProps) {
  return (
    <figure className="v-dream-fund-mockup">
      <div className="v-dream-fund-mockup__frame" aria-hidden>
        <div className="v-dream-fund-mockup__screen">
          <div className="v-dream-fund-mockup__status" />
          {blocks.map((block, index) => (
            <div
              key={`${label}-${block}-${index}`}
              className={[
                "v-dream-fund-mockup__block",
                `v-dream-fund-mockup__block--${block}`,
              ].join(" ")}
            />
          ))}
          <div className="v-dream-fund-mockup__tabbar">
            <span className="v-dream-fund-mockup__tab" />
            <span className="v-dream-fund-mockup__tab" />
            <span className="v-dream-fund-mockup__tab" />
            <span className="v-dream-fund-mockup__tab" />
          </div>
        </div>
      </div>
      <figcaption className="v-dream-fund-mockup__label">{label}</figcaption>
    </figure>
  );
}
