"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";

export default function AgentSignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lockedOut, setLockedOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/agents/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-4"
      aria-label="Agent sign-in form"
      onSubmit={handleSubmit}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <Input
        id="email"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={lockedOut}
        aria-label="Email address"
        className="w-full"
      />

      <div className="relative">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={lockedOut}
          aria-label="Password"
          className="w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-2.5 text-muted-foreground">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <div
          className="flex items-center gap-2 text-red-500 text-sm"
          role="alert">
          <XCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          className="flex items-center gap-2 text-green-600 text-sm"
          role="status">
          <CheckCircle size={16} />
          <span>Login successful! OTP sent to your email.</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading || lockedOut}
        aria-label="Submit sign-in form"
        aria-busy={loading}>
        {loading ? <span className="animate-spin mr-2">⏳</span> : null}
        Sign In
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Don’t have an account?{" "}
        <a href="/agent/signup" className="text-primary underline">
          Register here
        </a>
      </p>
    </form>
  );
}
