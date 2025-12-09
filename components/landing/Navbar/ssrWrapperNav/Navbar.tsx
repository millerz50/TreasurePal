"use client";

import { NavbarBrand } from "@/components/landing/Navbar/NavbarUI/NavbarBrand";
import { NavbarDesktopActions } from "@/components/landing/Navbar/NavbarUI/NavbarDesktopActions";
import { NavbarMobileMenu } from "@/components/landing/Navbar/NavbarUI/NavbarMobileMenu";
import { useEffect, useState } from "react";
import { domainConfig } from "./domains"; // import centralized config

export default function Navbar() {
  // Default brand (fallback)
  const [brand, setBrand] = useState(domainConfig["default"]);

  useEffect(() => {
    const host = window.location.hostname;
    setBrand(domainConfig[host] || domainConfig["default"]);
  }, []);

  return (
    <div className="navbar bg-base-100 border-b border-base-300 shadow-sm z-50 px-4 py-2">
      <div className="flex-1">
        <NavbarBrand name={brand.name} description={brand.description} />
      </div>
      <div className="flex-none hidden sm:flex">
        <NavbarDesktopActions />
      </div>
      <div className="flex-none sm:hidden">
        <NavbarMobileMenu />
      </div>
    </div>
  );
}
