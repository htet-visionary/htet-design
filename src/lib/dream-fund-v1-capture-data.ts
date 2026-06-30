export type DreamFundV1Currency = "JPY" | "USD" | "EUR" | "GBP";

export const DREAM_FUND_V1_CURRENCIES = [
  { id: "JPY" as const, label: "Yen (¥)" },
  { id: "USD" as const, label: "US Dollar ($)" },
  { id: "EUR" as const, label: "Euro (€)" },
  { id: "GBP" as const, label: "Pound (£)" },
];

export const FUEL_SOURCE_OPTIONS = ["Cash", "Bank account", "Wallet", "Other"] as const;

export type FuelSource = (typeof FUEL_SOURCE_OPTIONS)[number];

export function dreamFundV1CurrencyLabel(currency: DreamFundV1Currency): string {
  return DREAM_FUND_V1_CURRENCIES.find((option) => option.id === currency)?.label ?? currency;
}

export function dreamFundV1CurrencySymbol(currency: DreamFundV1Currency): string {
  const symbols: Record<DreamFundV1Currency, string> = {
    JPY: "¥",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  return symbols[currency];
}

export function formatDreamFundV1Amount(
  amount: number,
  currency: DreamFundV1Currency,
): string {
  if (!amount) {
    return "";
  }

  const locale = currency === "JPY" ? "ja-JP" : "en-US";
  return amount.toLocaleString(locale);
}

export type DreamFundV1CaptureDraft = {
  name: string;
  story: string;
  photoUrl: string | null;
  currency: DreamFundV1Currency;
  amount: number;
  targetDate: string;
};

export const emptyDreamFundV1CaptureDraft = (): DreamFundV1CaptureDraft => ({
  name: "",
  story: "",
  photoUrl: null,
  currency: "JPY",
  amount: 0,
  targetDate: "",
});

export type DreamFundV1CaptureStep = "onboarding" | "dream-1" | "dream-2" | "dream-3";

export const DREAM_CAPTURE_PROGRESS: Record<DreamFundV1CaptureStep, number> = {
  onboarding: 0,
  "dream-1": 1,
  "dream-2": 2,
  "dream-3": 3,
};

export type V1DreamDisplayMeta = {
  story: string;
  photoUrl: string | null;
  currency: DreamFundV1Currency;
};

export type V1AppPhase = "home" | "add-fuel" | "smart-split";
