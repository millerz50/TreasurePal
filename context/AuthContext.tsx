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
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

/* ----------------------------------
   API
----------------------------------- */
async function fetchProfileMe(jwt: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/me`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!res.ok) throw new Error("Profile fetch failed");

    return await res.json();
  } catch {
    return null;
  }
}

/* ----------------------------------
   TYPES (THIS IS THE CONTRACT)
----------------------------------- */
export type UserPayload = {
  userId: string;

  email: string;

  firstName: string;
  surname: string;

  role: string;
  status: string;

  phone?: string;
  bio?: string;

  country?: string;
  dateOfBirth?: string;
  agentId?: string;

  avatarUrl?: string;
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
        const appwriteUser: Models.User<any> = await account.get();
        const jwt = await account.createJWT();

        /* -----------------------------
           BACKEND PROFILE
        ------------------------------ */
        const profile = await fetchProfileMe(jwt.jwt);

        /* -----------------------------
           AVATAR
        ------------------------------ */
        let avatarUrl: string | undefined;

        const fileId =
          profile?.avatarFileId ?? appwriteUser.prefs?.avatarFileId;

        if (fileId && APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID) {
          avatarUrl = `${APPWRITE_ENDPOINT}/storage/buckets/userAvatars/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
        } else {
          const displayName =
            profile?.firstName || appwriteUser.name || appwriteUser.email;

          avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=random&color=fff`;
        }

        /* -----------------------------
           NORMALIZED USER (IMPORTANT)
        ------------------------------ */
        const payload: UserPayload = {
          userId: appwriteUser.$id,

          email: appwriteUser.email,

          firstName: profile?.firstName ?? "",
          surname: profile?.surname ?? "",

          role: (
            profile?.role ??
            appwriteUser.prefs?.role ??
            "user"
          ).toLowerCase(),

          status:
            typeof profile?.status === "string" ? profile.status : "Active",

          phone: profile?.phone ?? undefined,
          bio: profile?.bio ?? undefined,

          country: profile?.country ?? undefined,
          dateOfBirth: profile?.dateOfBirth ?? undefined,
          agentId: profile?.agentId ?? undefined,

          avatarUrl,
        };

        if (mounted.current) setUser(payload);
      } catch {
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
    } catch {
      // optional toast
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
