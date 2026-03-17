"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { MOCK_HERO_BANNERS } from "@/shared/lib/mocks";

export function HeroBannerCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {MOCK_HERO_BANNERS.map((banner) => (
            <div key={banner.id} className="min-w-0 flex-[0_0_100%]">
              <div
                className={cn(
                  "flex h-80 flex-col items-center justify-center px-6 text-center",
                  banner.bgColor,
                )}
              >
                <h2 className="text-3xl font-bold text-white">
                  {banner.title}
                </h2>
                <p className="mt-2 text-lg text-white/80">{banner.subtitle}</p>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="mt-6 bg-white text-foreground hover:bg-white/90"
                >
                  <Link href={banner.ctaHref}>{banner.ctaText}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {MOCK_HERO_BANNERS.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === selectedIndex
                ? "w-6 bg-white"
                : "bg-white/50 hover:bg-white/75",
            )}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
