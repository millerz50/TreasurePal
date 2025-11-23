"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useAuth } from "@/context/AuthContext";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import NavbarUser from "./NavbarUser";

export function NavbarDesktopActions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="flex items-center gap-4">
      <ThemeSwitcher />
      {loading ? (
        <span className="text-sm text-muted-foreground">Loading...</span>
      ) : user ? (
        <NavbarUser />
      ) : (
        <>
          <Button
            variant="outline"
            className="text-sm border border-accent text-accent dark:text-accent hover:bg-accent/10"
            onClick={() => router.push("/signin")}>
            Sign In
          </Button>
          <Button
            className="text-sm bg-gradient-to-r from-green-500 to-blue-600 text-white hover:opacity-90"
            onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </>
      )}
    </motion.div>
  );
}
