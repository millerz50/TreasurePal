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

async function fetchProfileMe(jwt: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
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

  // Prevent overlapping fetches across Strict Mode remounts
  const fetchLock = useRef(false);
  // Track mounted state to avoid setState after unmount
  const mounted = useRef(true);
  // Abort controller for fetchProfileMe
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
        // create JWT (Appwrite SDK)
        const jwt = await account.createJWT();

        // fetch profile from your API; pass abort signal if you adapt fetchProfileMe to accept it
        const profile = await fetchProfileMe(jwt.jwt);

        // build avatar URL or initials fallback
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

        if (mounted.current) setUser(payload);
      } catch (err) {
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setLoading(false);
        fetchLock.current = false;
      }
    })();

    // no dependencies: run once per mount; fetchLock prevents overlap
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
