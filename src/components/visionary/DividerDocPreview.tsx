import { ComponentDocGroup } from "@/components/visionary/ComponentDocGroup";

export function DividerVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Divider variants"
      items={[
        {
          label: "Default",
          children: <hr className="v-cmp-divider" aria-hidden />,
        },
        {
          label: "Strong",
          children: <hr className="v-cmp-divider v-cmp-divider--strong" aria-hidden />,
        },
        {
          label: "Vertical",
          children: <span className="v-cmp-divider v-cmp-divider--vertical" aria-hidden />,
        },
        {
          label: "With label",
          children: (
            <div className="v-cmp-divider-labeled" aria-hidden>
              <span className="v-cmp-divider" />
              <span className="v-cmp-divider-labeled__label">or</span>
              <span className="v-cmp-divider" />
            </div>
          ),
        },
      ]}
    />
  );
}
