"use client";

import * as Lucide from "lucide-react";
import {
  WasherFallback,
  DryerFallback,
  GrillFallback,
} from "@/components/icons/fallbacks/ApplianceFallbacks";

export const APPLIANCE_ICONS: Record<string, Lucide.LucideIcon> = {
  stove: GrillFallback,
  oven: GrillFallback,
  washer: WasherFallback,
  dryer: DryerFallback,
  kitchen: Lucide.Utensils,
  coffee: Lucide.Coffee,
  refrigerator: Lucide.Refrigerator,
  fridge: Lucide.Refrigerator,
};
