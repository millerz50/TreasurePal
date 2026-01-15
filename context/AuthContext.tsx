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
   TYPES (SOURCE OF TRUTH)
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
  const abortCtrl = useRef<AbortController | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      abortCtrl.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (fetchLock.current) return;
    fetchLock.current = true;

    abortCtrl.current = new AbortController();

    (async () => {
      try {
        /* -----------------------------
           APPWRITE SESSION
        ------------------------------ */
        let appwriteUser: Models.User<any> | null = null;

        try {
          appwriteUser = await account.get(); // ✅ REAL SESSION
        } catch {
          appwriteUser = null;
        }

        /* -----------------------------
           BACKEND PROFILE (SESSION-BASED)
        ------------------------------ */
        let profile: any = null;

        if (appwriteUser && API_BASE_URL) {
          try {
            const res = await fetch(
              `${API_BASE_URL}/api/${API_VERSION}/users/me`,
              {
                method: "GET",
                credentials: "include", // ✅ REQUIRED
                signal: abortCtrl.current.signal,
              }
            );

            if (res.ok) {
              profile = await res.json();
            }
          } catch (err) {
            console.warn("Failed to fetch backend profile", err);
          }
        }

        /* -----------------------------
           AVATAR
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
           NORMALIZED USER
        ------------------------------ */
        if (appwriteUser) {
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
              typeof profile?.status === "string"
                ? profile.status
                : "Active",

            phone: profile?.phone ?? undefined,
            bio: profile?.bio ?? undefined,

            country: profile?.country ?? undefined,
            dateOfBirth: profile?.dateOfBirth ?? undefined,
            agentId: profile?.agentId ?? undefined,
            credits: profile?.credits ?? undefined,

            avatarUrl,
          };

          if (mounted.current) setUser(payload);
        } else {
          if (mounted.current) setUser(null);
        }
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

