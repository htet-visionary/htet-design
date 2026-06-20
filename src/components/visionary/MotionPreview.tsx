import type { CSSProperties } from "react";
import { motion } from "@design-system/visionary";

type DurationToken = keyof typeof motion.duration;
type EasingToken = keyof typeof motion.easing;

function MotionDurationTrack({ varName }: { varName: string }) {
  return (
    <span
      className="v-motion-duration-track"
      style={
        {
          "--motion-duration": `var(${varName})`,
        } as CSSProperties
      }
      aria-hidden
    >
      <span className="v-motion-duration-track__bar" />
    </span>
  );
}

function MotionEasingTrack({ easing }: { easing: string }) {
  return (
    <span
      className="v-motion-easing-track"
      style={{ "--motion-easing": easing } as CSSProperties}
      aria-hidden
    >
      <span className="v-motion-easing-track__dot" />
    </span>
  );
}

function MotionUsageSpecimen({
  variant,
  durationMs,
  easing,
}: {
  variant: "enter" | "exit" | "standard";
  durationMs: number;
  easing: string;
}) {
  return (
    <span
      className={`v-motion-specimen v-motion-specimen--${variant}`}
      style={
        {
          "--motion-duration": `${durationMs}ms`,
          "--motion-easing": easing,
        } as CSSProperties
      }
      aria-hidden
    >
      <span className="v-motion-specimen__panel" />
    </span>
  );
}

export function MotionDurationScalePreview() {
  const durationVar: Record<DurationToken, string> = {
    instant: "--v-motion-instant",
    fast: "--v-motion-fast",
    normal: "--v-motion-normal",
    slow: "--v-motion-slow",
  };

  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Motion duration scale">
      {(Object.keys(motion.duration) as DurationToken[]).map((name) => {
        const ms = motion.duration[name];
        return (
          <li key={name} className="v-spacing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{name}</code>
            <MotionDurationTrack varName={durationVar[name]} />
            <span className="v-spacing-scale__px">{ms}ms</span>
          </li>
        );
      })}
    </ul>
  );
}

export function MotionEasingScalePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-scale" aria-label="Motion easing scale">
      {(Object.keys(motion.easing) as EasingToken[]).map((name) => {
        const curve = motion.easing[name];
        return (
          <li key={name} className="v-spacing-scale__row v-motion-easing-scale__row">
            <code className="v-code v-code--sm v-spacing-scale__token">{name}</code>
            <MotionEasingTrack easing={curve} />
            <span className="v-spacing-scale__px v-motion-easing-scale__value">{curve}</span>
          </li>
        );
      })}
    </ul>
  );
}

const usageRows = [
  {
    name: "Modal, dropdown open",
    token: "enter",
    durationMs: motion.duration.normal,
    easing: motion.easing.enter,
    properties: "opacity, transform",
    variant: "enter" as const,
  },
  {
    name: "Toast dismiss, menu close",
    token: "exit",
    durationMs: motion.duration.fast,
    easing: motion.easing.exit,
    properties: "opacity, transform",
    variant: "exit" as const,
  },
  {
    name: "Button, link hover",
    token: "standard",
    durationMs: motion.duration.fast,
    easing: motion.easing.standard,
    properties: "color, background",
    variant: "standard" as const,
  },
];

export function MotionUsagePreview() {
  return (
    <ul className="v-foundation-preview v-spacing-usage" aria-label="Motion usage">
      {usageRows.map((row) => (
        <li key={row.name} className="v-spacing-usage__row v-motion-usage__row">
          <span className="v-spacing-usage__name">{row.name}</span>
          <MotionUsageSpecimen
            variant={row.variant}
            durationMs={row.durationMs}
            easing={row.easing}
          />
          <span className="v-spacing-usage__meta v-spacing-usage__meta--motion">
            <code className="v-code v-code--sm">{row.token}</code>
            <span className="v-motion-usage__values">
              <span>{row.durationMs}ms</span>
              <span aria-hidden>·</span>
              <span className="v-motion-usage__curve">{row.easing}</span>
            </span>
            <span className="v-motion-usage__properties">{row.properties}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
