"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    // DaisyUI theme
    html.setAttribute("data-theme", isDark ? "dark" : "light");

    // ShadCN trigger
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-warning" />
      <Switch checked={isDark} onCheckedChange={setIsDark} />
      <Moon className="h-4 w-4 text-info" />
    </div>
  );
}
