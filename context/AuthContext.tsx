"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface AgentPayload {
  userId?: string;
  email?: string;
  status?: string;
  role?: string;
}

interface AuthContextType {
  agent: AgentPayload | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  agent: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [agent, setAgent] = useState<AgentPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch(
          "https://treasurepal-backened.onrender.com/api/agents/me",
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
          console.error("❌ Agent fetch failed:", res.status, errorText);
          throw new Error("Failed to fetch agent");
        }

        const data = await res.json();
        console.log("✅ Raw agent response:", data);

        // Normalize whether agent is top-level or nested
        const agentData = data.agent ?? data;

        if (!agentData || !agentData.email) {
          console.warn("⚠️ Agent missing or malformed:", agentData);
          setAgent(null);
          return;
        }

        const payload: AgentPayload = {
          userId: agentData._id || agentData.userId,
          email: agentData.email,
          role: agentData.role,
          status: agentData.status,
        };

        setAgent(payload);
        console.log("🔍 Final agent payload:", payload);
      } catch (err) {
        console.error("❌ Auth fetch failed:", err);
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, []);

  return (
    <AuthContext.Provider value={{ agent, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
