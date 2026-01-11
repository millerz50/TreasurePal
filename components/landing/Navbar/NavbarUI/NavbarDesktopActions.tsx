"use client";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import NavLinksDesktop from "./NavLinksDesktop";
import NavbarUser from "./NavbarUser";

export function NavbarDesktopActions() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <NavLinksDesktop />
      <ThemeSwitcher />
      <NavbarUser />
    </div>
  );
}
