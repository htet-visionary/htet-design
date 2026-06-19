import { V2Nav } from "./_components/V2Nav";
import { HeroSection } from "./_components/HeroSection";
import { PhilosophySection } from "./_components/PhilosophySection";
import { ColorGardenSection } from "./_components/ColorGardenSection";
import { TypographySection } from "./_components/TypographySection";
import { RabbitSection } from "./_components/RabbitSection";
import { EmotionSection } from "./_components/EmotionSection";
import { SurfaceSection } from "./_components/SurfaceSection";
import { ComponentSection } from "./_components/ComponentSection";
import { MotionSection } from "./_components/MotionSection";
import {
  WorldShowcaseSection,
  FooterSection,
} from "./_components/WorldSection";

export const metadata = {
  title: "Lucky Charm World — Design System v2",
  description:
    "A luxury storybook design system for the gentle lifestyle brand Lucky Charm.",
};

export default function LuckyCharmV2Page() {
  return (
    <>
      <V2Nav />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ColorGardenSection />
        <TypographySection />
        <RabbitSection />
        <EmotionSection />
        <SurfaceSection />
        <ComponentSection />
        <MotionSection />
        <WorldShowcaseSection />
      </main>
      <FooterSection />
    </>
  );
}
