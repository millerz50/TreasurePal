// app/dashboard/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashClient = dynamic(
  () => import("./pageClient").then((m) => m.default),
  { ssr: false }
);

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/signin");

  return <DashClient />;
}
