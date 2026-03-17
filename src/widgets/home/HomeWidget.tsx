import { HeroBannerCarousel } from "./HeroBannerCarousel";
import { FeaturedSection } from "./FeaturedSection";
import { TrendingSection } from "./TrendingSection";
import { CategoryGrid } from "./CategoryGrid";
import { ModelTabSection } from "./ModelTabSection";
import { NewestSection } from "./NewestSection";
import { MonthlyPopular } from "./MonthlyPopular";
import { SellerCTABanner } from "./SellerCTABanner";
import { HireCTABanner } from "./HireCTABanner";

export function HomeWidget() {
  return (
    <div className="space-y-10">
      <HeroBannerCarousel />
      <FeaturedSection />
      <TrendingSection />
      <CategoryGrid />
      <ModelTabSection />
      <NewestSection />
      <MonthlyPopular />
      <SellerCTABanner />
      <HireCTABanner />
    </div>
  );
}
