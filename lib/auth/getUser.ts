import { User } from "@/lib/types/navbarTypes";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies(); // ✅ Await here
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const res = await fetch(
    "https://treasurepal-backened.onrender.com/api/user/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.user
    ? {
        name: data.user.name,
        avatarUrl: data.user.avatarUrl,
      }
    : null;
}
