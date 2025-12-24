"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { domainConfig } from "../Navbar/ssrWrapperNav/domains";
import HeroImages from "./HeroImages";
import HeroStats from "./HeroStats";
import PromoAd from "./PromoAd.client";

export default function HeroClient() {
  const [brand, setBrand] = useState(domainConfig.default);
  const [showAd, setShowAd] = useState(false);

  // replace with real auth later
  const isPremium = false;

  useEffect(() => {
    const host = window.location.hostname;
    setBrand(domainConfig[host] || domainConfig.default);

    if (!isPremium) {
      const t = setTimeout(() => setShowAd(true), 3000);
      return () => clearTimeout(t);
    }
  }, [isPremium]);

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Find Property
            </span>
            <br />
            Without the Stress
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            {brand.description}. Discover homes, rentals, and commercial spaces
            — all in one trusted platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2">
              Browse Listings <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              List Your Property
            </Button>
          </div>

          <HeroStats />
        </div>

        {/* RIGHT */}
        <HeroImages />
      </div>

      <AnimatePresence>
        {showAd && !isPremium && <PromoAd onClose={() => setShowAd(false)} />}
      </AnimatePresence>
    </section>
  );
}
