"use client";

import { account } from "@/lib/appwrite";
import type { Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

async function fetchProfileMe(jwt: string): Promise<{
  role?: string;
  status?: boolean | string;
  phone?: string;
  bio?: string;
} | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) throw new Error("Profile fetch failed");
    return await res.json();
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    return null;
  }
}

export interface UserPrefs {
  role?: "admin" | "agent" | "user";
}

export type UserPayload = {
  userId: string;
  email?: string;
  status?: boolean | string;
  role?: string;
  phone?: string;
  bio?: string;
};

interface AuthContextType {
  user: UserPayload | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Get Appwrite session user
        const appwriteUser: Models.User<UserPrefs> =
          await account.get<UserPrefs>();

        // 2. Get JWT for API calls
        const jwt = await account.createJWT();

        // 3. Fetch extended profile from backend
        const profile = await fetchProfileMe(jwt.jwt);

        // 4. Merge both sources
        const payload: UserPayload = {
          userId: appwriteUser.$id,
          email: appwriteUser.email,
          role: (profile?.role ?? appwriteUser.prefs?.role)?.toLowerCase(),
          status: profile?.status ?? appwriteUser.status,
          phone: profile?.phone,
          bio: profile?.bio,
        };

        setUser(payload);
        console.log("🔍 Final user payload:", payload);
      } catch (err) {
        console.error("❌ Auth fetch failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
