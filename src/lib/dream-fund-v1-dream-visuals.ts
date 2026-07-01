import type { DreamFundGoal } from "@/lib/dream-fund-app-data";
import {
  dreamCategoryTone,
  getDreamCategory,
  type DreamCategory,
} from "@/lib/dream-fund-v1-dream-categories";

const DREAM_GOAL_SAMPLE_PHOTOS: Partial<Record<string, string>> = {
  "japan-trip": "/portfolio/gallery/11-tokyo-tower.png",
  "weekend-camera": "/portfolio/hero-photo.png",
  "new-laptop": "/portfolio/work/design-system.png",
};

const DREAM_CATEGORY_SAMPLE_PHOTOS: Record<DreamCategory, string> = {
  Travel: "/portfolio/gallery/11-tokyo-tower.png",
  Tech: "/portfolio/hero-photo.png",
  Lifestyle: "/portfolio/gallery/14-cherry-blossoms.png",
  Giving: "/portfolio/gallery/07-capybara.png",
  Safety: "/portfolio/gallery/09-sky-moon.png",
};

export function getDreamCardTone(goal: DreamFundGoal): string {
  return dreamCategoryTone(getDreamCategory(goal));
}

export function getDreamGoalSamplePhoto(goal: DreamFundGoal): string {
  return (
    DREAM_GOAL_SAMPLE_PHOTOS[goal.id] ??
    DREAM_CATEGORY_SAMPLE_PHOTOS[getDreamCategory(goal)]
  );
}

export function getDreamCardPhotoUrl(
  goal: DreamFundGoal,
  primaryGoalId: string | undefined,
  primaryPhotoUrl: string | null | undefined,
): string {
  if (primaryGoalId && goal.id === primaryGoalId && primaryPhotoUrl) {
    return primaryPhotoUrl;
  }

  return getDreamGoalSamplePhoto(goal);
}
