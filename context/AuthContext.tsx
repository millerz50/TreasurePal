"use client";

import { account } from "@/lib/appwrite";
import type { Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

async function fetchProfileMe(jwt: string): Promise<{
  role?: string;
  status?: boolean | string;
  phone?: string;
  bio?: string;
  avatarFileId?: string;
  firstName?: string;
  surname?: string;
} | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) {
      console.error(
        "fetchProfileMe non-ok response",
        res.status,
        await res.text()
      );
      throw new Error("Profile fetch failed");
    }
    return await res.json();
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    return null;
  }
}

export interface UserPrefs {
  role?: "admin" | "agent" | "user";
  avatarFileId?: string;
  firstName?: string;
  surname?: string;
}

export type UserPayload = {
  userId: string;
  email?: string;
  status?: boolean | string;
  role?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
};

interface AuthContextType {
  user: UserPayload | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    console.log("[AuthProvider] mount - starting fetchUser");

    const fetchUser = async () => {
      try {
        console.log("[AuthProvider] calling account.get()");
        const appwriteUser: Models.User<UserPrefs> =
          await account.get<UserPrefs>();
        console.log("[AuthProvider] account.get() returned", {
          id: appwriteUser.$id,
          email: appwriteUser.email,
        });

        console.log("[AuthProvider] creating JWT");
        const jwt = await account.createJWT();
        console.log("[AuthProvider] jwt created");

        const profile = await fetchProfileMe(jwt.jwt);
        console.log("[AuthProvider] profile fetch result:", profile);

        let avatarUrl: string | undefined;
        const fileId =
          profile?.avatarFileId ?? appwriteUser.prefs?.avatarFileId;
        if (fileId) {
          avatarUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/userAvatars/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
        } else {
          const firstLetter =
            profile?.firstName?.[0] ?? appwriteUser.name?.split(" ")[0]?.[0];
          const surnameLetter =
            profile?.surname?.[0] ??
            appwriteUser.name?.split(" ")[1]?.[0] ??
            "";
          const initials = `${firstLetter ?? ""}${
            surnameLetter ?? ""
          }`.toUpperCase();
          if (initials.trim().length > 0) {
            avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=random`;
          }
        }

        const payload: UserPayload = {
          userId: appwriteUser.$id,
          email: appwriteUser.email,
          role: (profile?.role ?? appwriteUser.prefs?.role)?.toLowerCase(),
          status: profile?.status ?? appwriteUser.status,
          phone: profile?.phone,
          bio: profile?.bio,
          avatarUrl,
        };

        console.log("[AuthProvider] built payload:", payload);
        if (active) setUser(payload);
      } catch (err) {
        console.error("❌ Auth fetch failed:", err);
        if (active) setUser(null);
      } finally {
        if (active) {
          setLoading(false);
          console.log("[AuthProvider] fetchUser complete - loading false");
        }
      }
    };

    fetchUser();

    return () => {
      active = false;
      console.log("[AuthProvider] unmount - active set false");
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("[AuthProvider] signOut requested");
      await account.deleteSession("current");
      setUser(null);
      console.log("[AuthProvider] signOut success");
    } catch (err) {
      console.error("❌ Sign out failed:", err);
    }
  };

  // debug log on every render (kept minimal)
  console.log("[AuthProvider] render", {
    loading,
    user: user ? { id: user.userId, email: user.email } : null,
  });

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
