"use client";

import { ChevronLeft, Clover, Plus } from "lucide-react";
import { useEffect, useRef, type ChangeEvent, type ReactNode } from "react";
import {
  dreamFundV1CurrencySymbol,
  formatDreamFundV1Amount,
  type DreamFundV1Currency,
} from "@/lib/dream-fund-v1-capture-data";

type V1FlowChromeProps = {
  progressStep?: number;
  progressTotal?: number;
  onBack?: () => void;
  showBack?: boolean;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  primaryTone?: "brand" | "accent";
  onSkip?: () => void;
  skipLabel?: string;
  children: ReactNode;
};

export function V1FlowChrome({
  progressStep = 0,
  progressTotal = 3,
  onBack,
  showBack = true,
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  primaryTone = "brand",
  onSkip,
  skipLabel = "Skip for now",
  children,
}: V1FlowChromeProps) {
  return (
    <div className="v-dream-fund-v1__device">
      {progressStep > 0 ? (
        <header className="v-dream-fund-v1__header">
          {showBack ? (
            <button
              type="button"
              className="v-dream-fund-v1__icon-btn"
              onClick={onBack}
              aria-label="Back"
            >
              <ChevronLeft strokeWidth={2} size={20} />
            </button>
          ) : (
            <span className="v-dream-fund-v1__header-spacer" aria-hidden />
          )}
          <div className="v-dream-fund-v1__progress" aria-hidden>
            {Array.from({ length: progressTotal }, (_, index) => (
              <span
                key={index}
                className={[
                  "v-dream-fund-v1__progress-segment",
                  index < progressStep ? "v-dream-fund-v1__progress-segment--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
          <span className="v-dream-fund-v1__header-spacer" aria-hidden />
        </header>
      ) : null}

      <main
        className={[
          "v-dream-fund-v1__main",
          progressStep > 0 ? "v-dream-fund-v1__main--capture" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </main>

      <footer className="v-dream-fund-v1__footer">
        <button
          type="button"
          className={[
            "v-cmp-btn v-cmp-btn--md",
            primaryTone === "accent" ? "v-cmp-btn--accent-primary" : "v-cmp-btn--primary-green",
          ].join(" ")}
          onClick={onPrimary}
          disabled={primaryDisabled}
        >
          <span className="v-cmp-btn__label">{primaryLabel}</span>
        </button>
        {onSkip ? (
          <button type="button" className="v-dream-fund-v1__text-link" onClick={onSkip}>
            {skipLabel}
          </button>
        ) : null}
      </footer>
    </div>
  );
}

export function V1PhotoPicker({
  photoUrl,
  onPhotoChange,
}: {
  photoUrl: string | null;
  onPhotoChange: (photoUrl: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const photoUrlRef = useRef(photoUrl);

  useEffect(() => {
    photoUrlRef.current = photoUrl;
  }, [photoUrl]);

  useEffect(() => {
    return () => {
      if (photoUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrlRef.current);
      }
    };
  }, []);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file?.type.startsWith("image/")) {
      return;
    }

    if (photoUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(photoUrl);
    }

    onPhotoChange(URL.createObjectURL(file));
    event.target.value = "";
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="v-dream-fund-v1__photo-input"
        onChange={handleFileChange}
        aria-hidden
        tabIndex={-1}
      />
      <button
        type="button"
        className={[
          "v-dream-fund-v1__photo-trigger",
          photoUrl ? "v-dream-fund-v1__photo-trigger--filled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => inputRef.current?.click()}
      >
        {photoUrl ? (
          <>
            <span className="v-dream-fund-v1__photo-trigger-preview">
              <img src={photoUrl} alt="" className="v-dream-fund-v1__photo-trigger-image" />
            </span>
            <span className="v-dream-fund-v1__photo-trigger-label">Change photo</span>
          </>
        ) : (
          <>
            <span className="v-dream-fund-v1__photo-trigger-icon" aria-hidden>
              <Plus strokeWidth={2} size={20} />
            </span>
            <span className="v-dream-fund-v1__photo-trigger-label">Add a photo</span>
          </>
        )}
      </button>
    </>
  );
}

function V1PolaroidFrame({ photoUrl }: { photoUrl?: string | null }) {
  return (
    <div className="v-dream-fund-v1__polaroid-shell">
      <div className="v-dream-fund-v1__polaroid">
        <img
          src="/dream-fund/sticky-tape.png"
          alt=""
          className="v-dream-fund-v1__polaroid-tape"
          aria-hidden
        />
        <div className="v-dream-fund-v1__polaroid-photo">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="v-dream-fund-v1__polaroid-image" />
          ) : (
            <span className="v-dream-fund-v1__polaroid-placeholder">
              <Plus strokeWidth={2} size={24} aria-hidden />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function V1DreamHeroCard({
  name,
  story,
  amount,
  currency = "JPY",
  photoUrl,
  compact = false,
  showDivider = true,
}: {
  name: string;
  story: string;
  amount?: number;
  currency?: DreamFundV1Currency;
  photoUrl?: string | null;
  compact?: boolean;
  showDivider?: boolean;
}) {
  return (
    <div
      className={[
        "v-dream-fund-v1__hero-card",
        compact ? "v-dream-fund-v1__hero-card--compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="v-dream-fund-v1__hero-card-media" aria-hidden>
        <V1PolaroidFrame photoUrl={photoUrl} />
      </div>
      <div
        className={[
          "v-dream-fund-v1__hero-card-body",
          !showDivider ? "v-dream-fund-v1__hero-card-body--plain" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <p className="v-dream-fund-v1__hero-card-name">{name || "Your dream"}</p>
        {story ? <p className="v-dream-fund-v1__hero-card-story">{story}</p> : null}
        {typeof amount === "number" && amount > 0 ? (
          <p className="v-dream-fund-v1__hero-card-target">
            Target : {dreamFundV1CurrencySymbol(currency)}{" "}
            {formatDreamFundV1Amount(amount, currency)}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function V1ScreenIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="v-dream-fund-v1__intro">
      <h1 className="v-dream-fund-v1__screen-title">{title}</h1>
      <p className="v-dream-fund-v1__screen-desc">{description}</p>
    </div>
  );
}

export function V1BrandMark() {
  return (
    <p className="v-dream-fund-v1__brand">
      <span className="v-dream-fund-v1__brand-dream">Dream </span>
      <span className="v-dream-fund-v1__brand-fund">Fund</span>
    </p>
  );
}

export function V1CloverMark() {
  return <Clover className="v-dream-fund-v1__clover" strokeWidth={1.75} aria-hidden />;
}
