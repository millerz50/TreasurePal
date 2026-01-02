"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarUser() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading…</div>;
  }

  // ❌ When NOT authenticated, render nothing
  if (!user) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-3">
      <motion.button
        type="button"
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-accent/10">
        <span className="text-sm font-medium text-accent">
          {user.email ?? user.userId}
        </span>

        {user.avatarUrl && (
          <Image
            src={user.avatarUrl}
            alt="User avatar"
            width={36}
            height={36}
            className="rounded-full object-cover shadow"
          />
        )}
      </motion.button>
    </div>
  );
}

/* ------------------ */

function NavItem({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`justify-start text-sm ${
        danger
          ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          : "hover:bg-accent/10"
      }`}>
      {label}
    </Button>
  );
}
