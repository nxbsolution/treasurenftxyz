import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomePageHeader from "./_components/WebHeader";
import HeroSection from "./_components/HeroSection";
import TreasureTitans from "./_components/TreasureTitans";
import MarketingBanner from "./_components/MarketingBanner";

export default function Page() {

  return (
    <div className="space-y-8 max-md:space-y-4 max-sm:space-y-2">
      <HeroSection heroImg={''} />
      <TreasureTitans TreasureTitonImg={''} />
      <MarketingBanner BannerImg={''} />
    </div>
  )
}