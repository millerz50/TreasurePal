"use client";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuth } from "@/context/AuthContext";
import NavLinksDesktop from "./NavLinksDesktop";
import NavbarUser from "./NavbarUser";

export function NavbarDesktopActions() {
  const { loading } = useAuth(); // ✅ removed unused `user`

  return (
    <div className="hidden lg:flex items-center gap-4">
      <NavLinksDesktop />
      <ThemeSwitcher />

      {!loading && <NavbarUser />}
    </div>
  );
}
