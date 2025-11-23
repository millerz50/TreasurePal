// app/dashboard/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Robust dynamic import: prefer default export, fallback to named export
const DashClient = dynamic(
  () =>
    import("./pageClient").then((m) => {
      const comp = (m as any).default ?? (m as any).DashboardPageClient;
      if (!comp) {
        throw new Error(
          "Dynamic import failed: no default or named export 'DashboardPageClient' in ./pageClient"
        );
      }
      return comp as React.ComponentType<any>;
    }),
  { ssr: false }
);

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/signin");

  return <DashClient />;
}
