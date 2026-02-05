"use client";

import { NavbarBrand } from "../NavbarUI/NavbarBrand";
import { NavbarDesktopActions } from "../NavbarUI/NavbarDesktopActions";
import { NavbarMobileMenu } from "../NavbarUI/NavbarMobileMenu";

export default function Navbar() {
  return (
    <header
      className="
        sticky top-0 z-50 w-full
        backdrop-blur-2xl
        bg-background/60
        supports-[backdrop-filter]:bg-background/50
        shadow-[0_1px_2px_rgba(0,0,0,0.06)]
        dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]
        transition-all
      "
    >
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <NavbarBrand />
        <NavbarDesktopActions />
        <NavbarMobileMenu />
      </div>
    </header>
  );
}
