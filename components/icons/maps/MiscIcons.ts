"use client";

import * as Lucide from "lucide-react";
import {
  RecycleSvg,
  PawFallback,
  SolarFallback,
  SmartSvg,
  CraneFallback,
} from "@/components/icons/fallbacks/MiscFallbacks";

export const MISC_ICONS: Record<string, Lucide.LucideIcon> = {
  recycle: RecycleSvg,
  pet: PawFallback,
  solar: SolarFallback,
  smart: SmartSvg,
  crane: CraneFallback,
  truck: Lucide.Truck,
  storage: Lucide.Package,
  loading_dock: Lucide.Truck,
  rooftop: Lucide.Sun,
  garden: Lucide.TreePine,
  view: Lucide.Mountain,
  pool: Lucide.CloudSun,
  balcony: Lucide.Sun,
};
