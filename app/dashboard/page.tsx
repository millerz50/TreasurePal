// app/dashboard/page.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import DashClient from "./pageClient"; // static import of a "use client" module

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return <DashClient />;
}
