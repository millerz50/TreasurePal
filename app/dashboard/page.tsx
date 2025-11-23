// app/dashboard/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashClient = dynamic(
  () =>
    import("./pageClient").then((m) => {
      // Prefer default export, otherwise fallback to named export DashboardPageClient
      const comp = (m as any).default ?? (m as any).DashboardPageClient;
      if (!comp) {
        // Throw a helpful error early so the build log shows a clear reason
        throw new Error(
          "Dynamic import resolved but no default or named export 'DashboardPageClient' found in ./pageClient"
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
