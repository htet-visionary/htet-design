import type { DreamFundGoal } from "@/lib/dream-fund-app-data";

export const DREAM_CATEGORY_FILTERS = [
  "All",
  "Travel",
  "Tech",
  "Lifestyle",
  "Giving",
  "Safety",
] as const;

export type DreamCategoryFilter = (typeof DREAM_CATEGORY_FILTERS)[number];

export type DreamCategory = Exclude<DreamCategoryFilter, "All">;

export function getDreamCategory(goal: DreamFundGoal): DreamCategory {
  const name = goal.name.toLowerCase();

  if (/trip|travel|japan|europe|beach|vacation|flight|holiday/.test(name)) {
    return "Travel";
  }

  if (/mac|camera|watch|tech|laptop|phone|computer/.test(name)) {
    return "Tech";
  }

  if (/gift|parent|giving|donat|charity/.test(name)) {
    return "Giving";
  }

  if (/emergency|safety|rainy|fund/.test(name)) {
    return "Safety";
  }

  return "Lifestyle";
}

export function dreamCategoryTone(category: DreamCategory): string {
  switch (category) {
    case "Travel":
      return "travel";
    case "Tech":
      return "tech";
    case "Giving":
      return "giving";
    case "Safety":
      return "safety";
    default:
      return "lifestyle";
  }
}
