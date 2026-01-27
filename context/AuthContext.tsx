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

/* ----------------------------
   ENV
---------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";
const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(/\/+$/, "") ?? "";
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";

/* ----------------------------
   TYPES
---------------------------- */
export type UserPayload = {
  // 🔑 Core identifiers
  userId: string; // Appwrite auth user id
  accountid: string; // ✅ REQUIRED – users collection identity

  // 👤 Profile
  email: string;
  firstName: string;
  surname: string;

  // 🧭 Status & roles
  roles: ("user" | "agent" | "admin")[];
  status: "Not Verified" | "Pending" | "Active" | "Suspended";

  // 📞 Optional profile fields
  phone?: string;
  avatarUrl?: string;
  country?: string;
  dateOfBirth?: string;

  // 💰 Credits
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

/* ----------------------------
   PROVIDER
---------------------------- */
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
        // 1️⃣ Check Appwrite session (uses cookies)
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

        // 2️⃣ Fetch backend profile using fresh JWT
        const jwtResponse = await account.createJWT();
        const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/users/me`, {
          headers: { Authorization: `Bearer ${jwtResponse.jwt}` },
        });

        if (!res.ok) throw new Error("Unauthorized");
        const profile = await res.json();

        // 3️⃣ Build avatar URL
        const avatarUrl = profile?.avatarFileId
          ? `${APPWRITE_ENDPOINT}/storage/buckets/userAvatars/files/${profile.avatarFileId}/view?project=${APPWRITE_PROJECT_ID}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(appwriteUser.email)}`;

        // 4️⃣ Set normalized user
        if (mounted.current) {
          setUser({
            userId: appwriteUser.$id, // Appwrite auth ID
            accountid: profile.accountid, // ✅ REQUIRED (users collection ID)

            email: appwriteUser.email,
            firstName: profile.firstName ?? "",
            surname: profile.surname ?? "",

            roles: profile.roles ?? ["user"],
            status: profile.status ?? "Active",

            phone: profile.phone,
            country: profile.country,
            credits: profile.credits ?? 0,
            dateOfBirth: profile.dateOfBirth,

            avatarUrl,
          });
        }
      } catch (err) {
        console.error("AuthProvider error:", err);
        if (mounted.current) setUser(null);
      } finally {
        if (mounted.current) setLoading(false);
      }
    })();
  }, []);

  const signOut = async () => {
    await account.deleteSession("current"); // clears Appwrite session cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
