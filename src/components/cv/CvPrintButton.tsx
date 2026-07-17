"use client";

export function CvPrintButton() {
  return (
    <button
      type="button"
      className="v-cmp-btn v-cmp-btn--primary-green v-cmp-btn--md v-portfolio-action-btn v-portfolio-topbar__cv"
      onClick={() => window.print()}
    >
      Export PDF
    </button>
  );
}
