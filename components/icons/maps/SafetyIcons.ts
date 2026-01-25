"use client";

import * as Lucide from "lucide-react";
import { SafeFallback, ElevatorFallback, ShowerFallback } from "@/components/icons/fallbacks/SafetyFallbacks";

export const SAFETY_ICONS: Record<string, Lucide.LucideIcon> = {
  safe: SafeFallback,
  safe_box: SafeFallback,
  elevator: ElevatorFallback,
  wheelchair: ElevatorFallback,
  bath: ShowerFallback,
  restroom: ShowerFallback,
  security: Lucide.Shield,
  lock: Lucide.Lock,
  key: Lucide.Key,
  cctv: Lucide.Camera,
  fence: Lucide.Shield,
};
