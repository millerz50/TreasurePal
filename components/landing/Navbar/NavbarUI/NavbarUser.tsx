"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NavbarUser() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-accent/10 cursor-pointer">
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
    </motion.div>
  );
}
