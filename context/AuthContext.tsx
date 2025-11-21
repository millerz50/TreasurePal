"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface UserPayload {
  userId: string;
  email?: string;
  status?: string;
  role?: string; // "admin" | "agent" | "user"
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
        const res = await fetch(
          "https://treasurepal-backened.onrender.com/api/users/me", // ✅ corrected
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ User fetch failed:", res.status, errorText);
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        console.log("✅ Raw user response:", data);

        const userData = data.user ?? data;

        if (!userData || !userData.email) {
          console.warn("⚠️ User missing or malformed:", userData);
          setUser(null);
          return;
        }

        const payload: UserPayload = {
          userId: userData._id || userData.userId,
          email: userData.email,
          role: userData.role,
          status: userData.status,
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
