"use client";

import { AuthProvider } from "@/context/AuthContext"; // adjust path if needed

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
