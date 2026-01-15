"use client";

import { account } from "@/lib/appwrite";
import type { Models } from "appwrite";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* ----------------------------------
   ENV
----------------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(/\/+$/, "") ?? "";
const APPWRITE_PROJECT_ID =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";

/* ----------------------------------
   TYPES
----------------------------------- */
export type UserPayload = {
  userId: string;
  email: string;
  firstName: string;
  surname: string;
  roles: ("user" | "agent" | "admin")[];
  status: string;
  phone?: string;
  avatarUrl?: string;

  // ✅ ADD THIS
  credits?: number;
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

/* ----------------------------------
   PROVIDER
----------------------------------- */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        /* 1️⃣ Appwrite session */
        let appwriteUser: Models.User<any> | null = null;
        try {
          appwriteUser = await account.get();
        } catch {
          appwriteUser = null;
        }

        if (!appwriteUser) {
          if (mounted.current) setUser(null);
          return;
        }

        /* 2️⃣ Backend profile (COOKIE-BASED) */
        const res = await fetch(
          `${API_BASE_URL}/api/${API_VERSION}/users/me`,
          {
            credentials: "include", // ✅ CRITICAL
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const profile = await res.json();

        /* 3️⃣ Avatar */
        const avatarUrl = profile?.avatarFileId
          ? `${APPWRITE_ENDPOINT}/storage/buckets/userAvatars/files/${profile.avatarFileId}/view?project=${APPWRITE_PROJECT_ID}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              appwriteUser.email
            )}`;

        /* 4️⃣ Normalize */
        if (mounted.current) {
          setUser({
            userId: appwriteUser.$id,
            email: appwriteUser.email,
            firstName: profile.firstName ?? "",
            surname: profile.surname ?? "",
            roles: profile.roles ?? ["user"],
            status: profile.status ?? "Active",
            phone: profile.phone,
            avatarUrl,
          });
        }
      } catch {
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setLoading(false);
      }
    })();
  }, []);

  const signOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
