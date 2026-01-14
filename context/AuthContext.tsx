// components/AuthProvider.tsx
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
   API URL RESOLUTION
   - Prefer explicit versioned env vars, fall back to legacy NEXT_PUBLIC_API_URL
----------------------------------- */
function getApiUrl(): string {
  const v = process.env.NEXT_PUBLIC_API_VERSION;
  const v1 = process.env.NEXT_PUBLIC_API_URLV1;
  const v2 = process.env.NEXT_PUBLIC_API_URLV2;
  const legacy = process.env.NEXT_PUBLIC_API_URL;

  if (v === "v2" && v2) return v2;
  if (v === "v1" && v1) return v1;
  if (v2) return v2;
  if (v1) return v1;
  if (legacy) return legacy;
  return "";
}

/* ----------------------------------
   ENV (used for avatar URL construction)
----------------------------------- */
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

/* ----------------------------------
   API
   - fetchProfileMe uses the resolved API base
   - accepts optional AbortSignal
----------------------------------- */
async function fetchProfileMe(jwt: string, signal?: AbortSignal | null) {
  try {
    const API_BASE = getApiUrl();
    if (!API_BASE) throw new Error("API base URL is not configured");

    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/api/users/me`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      signal: signal ?? undefined,
    });

    if (!res.ok) throw new Error("Profile fetch failed");
    return await res.json();
  } catch {
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
    const signal = abortCtrl.current.signal;

    (async () => {
      try {
        // Attempt to get Appwrite session user
        let appwriteUser: Models.User<any> | null = null;
        try {
          appwriteUser = await account.get();
        } catch (err) {
          // If Appwrite session is not available, treat as unauthenticated
          appwriteUser = null;
        }

        // If no Appwrite user, bail out early
        if (!appwriteUser) {
          if (mounted.current) setUser(null);
          return;
        }

        // Create JWT for backend calls (may throw)
        let jwtResponse: { jwt?: string } | null = null;
        try {
          jwtResponse = await account.createJWT();
        } catch {
          jwtResponse = null;
        }

        // Fetch backend profile if we have a JWT
        const profile =
          jwtResponse?.jwt != null
            ? await fetchProfileMe(jwtResponse.jwt, signal)
            : null;

        /* -----------------------------
           AVATAR
        ------------------------------ */
        let avatarUrl: string | undefined;

        const fileId =
          profile?.avatarFileId ?? appwriteUser.prefs?.avatarFileId;

        if (fileId && APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID) {
          avatarUrl = `${APPWRITE_ENDPOINT.replace(
            /\/$/,
            ""
          )}/storage/buckets/userAvatars/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
        } else {
          const displayName =
            profile?.firstName ||
            appwriteUser.name ||
            appwriteUser.email ||
            "User";

          avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=random&color=fff`;
        }

        /* -----------------------------
           NORMALIZED USER
        ------------------------------ */
        const payload: UserPayload = {
          userId: appwriteUser.$id,
          email: appwriteUser.email ?? "",

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
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setLoading(false);
        fetchLock.current = false;
      }
    })();

    return () => {
      abortCtrl.current?.abort();
    };
    // Intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----------------------------------
     SIGN OUT
  ----------------------------------- */
  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch {
      // ignore errors on sign out
      setUser(null);
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
