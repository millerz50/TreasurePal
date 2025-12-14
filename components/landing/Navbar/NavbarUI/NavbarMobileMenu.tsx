"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavbarUser from "./NavbarUser";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <div className="sm:hidden flex justify-end w-full relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="btn btn-ghost btn-circle text-primary"
        aria-label="Toggle mobile menu">
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-[999] p-4 shadow bg-base-100 rounded-box w-56 flex flex-col gap-2 text-base-content">
          {loading ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          ) : user ? (
            <NavbarUser />
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full text-sm border border-accent text-accent dark:text-accent hover:bg-accent/10"
                onClick={() => router.push("/auth/signin")}>
                Sign In
              </Button>
              <Button
                className="w-full text-sm bg-gradient-to-r from-green-500 to-blue-600 text-white hover:opacity-90"
                onClick={() => router.push("/auth/signup")}>
                Sign Up
              </Button>
            </>
          )}
          <div className="pt-2">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </div>
  );
}
