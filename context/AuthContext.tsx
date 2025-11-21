"use client";

import { account } from "@/lib/appwrite"; // import Appwrite client
import { createContext, useContext, useEffect, useState } from "react";

export interface UserPayload {
  userId: string;
  email?: string;
  status?: boolean; // Appwrite returns boolean for status
  role?: string; // "admin" | "agent" | "user" (stored in prefs or DB)
}

interface AuthContextType {
  user: UserPayload | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Get current Appwrite user session
        const appwriteUser = await account.get();

        const payload: UserPayload = {
          userId: appwriteUser.$id,
          email: appwriteUser.email,
          role: appwriteUser.prefs?.role, // store role in prefs or a collection
          status: appwriteUser.status, // boolean
        };

        setUser(payload);
        console.log("🔍 Final user payload:", payload);
      } catch (err) {
        console.error("❌ Auth fetch failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
