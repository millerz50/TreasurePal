"use client";

import AgentSignInForm from "@/components/Agent/AgentSignInForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AgentSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lockedOut, setLockedOut] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const handleLockout = () => {
    setLockedOut(true);
    setTimeout(() => {
      setAttempts(0);
      setLockedOut(false);
    }, 60 * 60 * 1000); // 1 hour
  };

  const handleSubmit = async () => {
    console.log("📨 Submitted password:", `"${password}"`, typeof password);
    console.log(
      "🔍 Char codes:",
      [...password].map((c) => c.charCodeAt(0))
    );

    setError("");
    setSuccess(false);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (lockedOut) {
      setError("Too many failed attempts. Try again in 1 hour.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://treasurepal-backened.onrender.com/api/agents/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setSuccess(true);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAttempts((prev) => prev + 1);
        if (attempts + 1 >= 5) handleLockout();
        setError(err.response?.data?.error || err.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-muted px-4">
      <div className="w-full max-w-md bg-background p-6 rounded-lg shadow-md">
        <header className="mb-6 text-center space-y-1">
          <h1 className="text-3xl font-bold text-primary">
            Welcome Back, Agent
          </h1>
          <p className="text-sm text-muted-foreground">
            Step 1: Sign in with your credentials.
            <br />
            Step 2: Access your dashboard.
          </p>
        </header>

        <AgentSignInForm
          email={email}
          password={password}
          lockedOut={lockedOut}
          loading={loading}
          error={error}
          success={success}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
