"use client";

type SegmentTabsProps = {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
};

export function SegmentTabs({ tabs, activeId, onChange }: SegmentTabsProps) {
  return (
    <div className="v-dream-fund-app__segments" role="tablist" aria-label="Filter">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeId === tab.id}
          className={[
            "v-dream-fund-app__segment",
            activeId === tab.id ? "v-dream-fund-app__segment--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
