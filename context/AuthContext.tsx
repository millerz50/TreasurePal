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
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").trim();
const API_BASE_V1 =
  process.env.NEXT_PUBLIC_API_URLV1?.replace(/\/+$/, "") ?? "";
const API_BASE_V2 =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
const API_BASE_URL =
  API_VERSION === "v2" && API_BASE_V2 ? API_BASE_V2 : API_BASE_V1;

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
  bio?: string;

  country?: string;
  dateOfBirth?: string;
  agentId?: string;

  avatarUrl?: string;
  credits?: number;
};

interface AuthContextType {
  user: UserPayload | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

/* ----------------------------------
   CONTEXT
----------------------------------- */
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

  const fetchLock = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (fetchLock.current) return;
    fetchLock.current = true;

    (async () => {
      try {
        /* -----------------------------
           1️⃣ Get Appwrite user
        ------------------------------ */
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

        /* -----------------------------
           2️⃣ Get JWT for backend
        ------------------------------ */
        let jwt: string | null = null;
        try {
          const jwtRes = await account.createJWT();
          jwt = jwtRes.jwt;
        } catch (err) {
          console.warn("Failed to create JWT", err);
          jwt = null;
        }

        /* -----------------------------
           3️⃣ Fetch backend profile
        ------------------------------ */
        let profile: any = null;
        if (jwt && API_BASE_URL) {
          try {
            const res = await fetch(
              `${API_BASE_URL}/api/${API_VERSION}/users/me`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );
            if (res.ok) {
              profile = await res.json();
            } else {
              console.warn("Backend profile fetch failed", res.status);
            }
          } catch (err) {
            console.warn("Failed to fetch backend profile", err);
          }
        }

        /* -----------------------------
           4️⃣ Build avatar URL
        ------------------------------ */
        let avatarUrl: string | undefined;
        const fileId =
          profile?.avatarFileId ?? appwriteUser?.prefs?.avatarFileId;

        if (fileId && APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID) {
          avatarUrl = `${APPWRITE_ENDPOINT}/storage/buckets/userAvatars/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
        } else {
          const displayName =
            profile?.firstName ||
            appwriteUser?.name ||
            appwriteUser?.email ||
            "User";

          avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=random&color=fff`;
        }

        /* -----------------------------
           5️⃣ Normalize user payload
        ------------------------------ */
        const payload: UserPayload = {
          userId: appwriteUser.$id,
          email: appwriteUser.email,

          firstName: profile?.firstName ?? "",
          surname: profile?.surname ?? "",

          roles: Array.isArray(profile?.roles)
            ? profile.roles
            : Array.isArray(appwriteUser.prefs?.roles)
            ? appwriteUser.prefs.roles
            : ["user"],

          status:
            typeof profile?.status === "string" ? profile.status : "Active",

          phone: profile?.phone ?? undefined,
          bio: profile?.bio ?? undefined,

          country: profile?.country ?? undefined,
          dateOfBirth: profile?.dateOfBirth ?? undefined,
          agentId: profile?.agentId ?? undefined,
          credits: profile?.credits ?? undefined,

          avatarUrl,
        };

        if (mounted.current) setUser(payload);
      } catch (err) {
        console.error("AuthProvider unexpected error:", err);
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setLoading(false);
        fetchLock.current = false;
      }
    })();
  }, []);

  /* ----------------------------------
     SIGN OUT
  ----------------------------------- */
  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.warn("signOut failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ----------------------------------
   HOOK
----------------------------------- */
export const useAuth = () => useContext(AuthContext);
