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
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";

/* ----------------------------------
   API
----------------------------------- */
async function fetchProfileMe(jwt: string, signal?: AbortSignal) {
  if (!API_BASE_URL) {
    console.warn("fetchProfileMe: API_BASE_URL is not configured");
    return null;
  }

  const profilePath = `/api/${API_VERSION}/users/me`;
  const url = `${API_BASE_URL}${profilePath}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      signal,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.warn("fetchProfileMe failed", {
        url,
        status: res.status,
        statusText: res.statusText,
      });
      return null;
    }

    return await res.json();
  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.info("fetchProfileMe aborted");
    } else {
      console.error("fetchProfileMe error:", err);
    }
    return null;
  }
}

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
        // Debug info in non-production builds
        if (process.env.NODE_ENV !== "production") {
          console.debug("AuthProvider init", {
            API_VERSION,
            API_BASE_URL,
            APPWRITE_ENDPOINT,
            APPWRITE_PROJECT_ID,
          });
        }

        /* -----------------------------
           APPWRITE SESSION
        ------------------------------ */
        let appwriteUser: Models.User<any> | null = null;
        let jwtToken: string | null = null;

        try {
          appwriteUser = await account.get();
        } catch (err) {
          // If there's no session or Appwrite call fails, treat as unauthenticated
          console.info("Appwrite account.get failed or no session", err);
          appwriteUser = null;
        }

        try {
          const jwtResp = await account.createJWT();
          jwtToken = jwtResp?.jwt ?? null;
        } catch (err) {
          console.info("Appwrite createJWT failed", err);
          jwtToken = null;
        }

        /* -----------------------------
           BACKEND PROFILE
        ------------------------------ */
        let profile: any = null;
        if (jwtToken) {
          profile = await fetchProfileMe(
            jwtToken,
            abortCtrl.current?.signal ?? undefined
          );
        } else {
          // No JWT available, skip backend profile fetch
          profile = null;
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
        } else {
          // No authenticated Appwrite user
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
