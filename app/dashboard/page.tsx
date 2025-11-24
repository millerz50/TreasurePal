// app/dashboard/page.tsx
import type { Metadata } from "next";
import DashClient from "./pageClient"; // static import of a "use client" module

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return <DashClient />;
}
