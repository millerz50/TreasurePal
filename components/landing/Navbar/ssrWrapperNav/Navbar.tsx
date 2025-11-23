import { NavbarBrand } from "@/components/landing/Navbar/NavbarUI/NavbarBrand";
import { NavbarDesktopActions } from "@/components/landing/Navbar/NavbarUI/NavbarDesktopActions";
import { NavbarMobileMenu } from "@/components/landing/Navbar/NavbarUI/NavbarMobileMenu";
import { User } from "@/lib/types/navbarTypes";

export default function Navbar({ user }: { user: User | null }) {
  const isLoggedIn = !!user;

  return (
    <div className="navbar bg-base-100 border-b border-base-300 shadow-sm z-50 px-4 py-2">
      <div className="flex-1">
        <NavbarBrand
          name="TreasurePal"
          description="Empowering Zimbabwean Real Estate"
        />
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
