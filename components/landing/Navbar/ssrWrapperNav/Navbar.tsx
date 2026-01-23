"use client";

import { NavbarBrand } from "../NavbarUI/NavbarBrand";
import { NavbarDesktopActions } from "../NavbarUI/NavbarDesktopActions";
import { NavbarMobileMenu } from "../NavbarUI/NavbarMobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-background/80 border-b">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <NavbarBrand />
        <NavbarDesktopActions />
        <NavbarMobileMenu />
      </div>
    </header>
  );
}
