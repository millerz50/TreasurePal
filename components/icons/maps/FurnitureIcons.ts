"use client";

import * as Lucide from "lucide-react";
import {
  ChairFallback,
  PatioFallback,
} from "@/components/icons/fallbacks/FurnitureFallbacks";

export const FURNITURE_ICONS: Record<string, Lucide.LucideIcon> = {
  chair: ChairFallback,
  seating: ChairFallback,
  patio: PatioFallback,
  bed: Lucide.Bed,
  layout: Lucide.LayoutGrid,
  lighting: Lucide.Lightbulb,
};
