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

// ✅ Hard‑coded API base URL (production)
const API_BASE_URL = "https://treasurepal-backened.onrender.com/api";

// ✅ Hard‑coded Appwrite endpoint + project
const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "treasureproject";

async function fetchProfileMe(jwt: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) throw new Error("Profile fetch failed");
    return await res.json();
  } catch {
    return null;
  }
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

  const fetchLock = useRef(false);
  const mounted = useRef(true);
  const abortCtrl = useRef<AbortController | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (abortCtrl.current) abortCtrl.current.abort();
    };
  }, []);

  useEffect(() => {
    if (fetchLock.current) return;
    fetchLock.current = true;

    abortCtrl.current = new AbortController();
    const signal = abortCtrl.current.signal;

    (async () => {
      try {
        const appwriteUser: Models.User<any> = await account.get();
        const jwt = await account.createJWT();

        const profile = await fetchProfileMe(jwt.jwt);

        // ✅ Avatar URL logic
        let avatarUrl: string | undefined;
        const fileId =
          profile?.avatarFileId ?? appwriteUser.prefs?.avatarFileId;
        if (fileId) {
          avatarUrl = `${APPWRITE_ENDPOINT}/storage/buckets/userAvatars/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
        } else {
          const displayName = profile?.firstName
            ? `${profile.firstName} ${profile.surname ?? ""}`
            : appwriteUser.name || appwriteUser.email;

          if (displayName) {
            avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName
            )}&background=random&color=fff`;
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

        if (mounted.current) setUser(payload);
      } catch (err) {
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setLoading(false);
        fetchLock.current = false;
      }
    })();
  }, []);

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch {
      // swallow error or handle UI notification
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
