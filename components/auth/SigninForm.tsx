"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

import { account } from "@/lib/appwrite";

export default function SigninForm({
  redirectTo = "/",
}: {
  redirectTo?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required", {
        icon: "⚠️",
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    const tId = toast.loading("Signing you in…", {
      description: "Authenticating your credentials",
      icon: "⏳",
    });
    try {
      // 🔑 Create session
      await account.createEmailPasswordSession(email.toLowerCase(), password);

      // 👤 Get user info
      const user = await account.get();
      console.log("User info from Appwrite:", user);

      // 🎟️ Generate JWT for backend calls
      const jwt = await account.createJWT();

      // ✅ Debug: log the raw JWT string
      console.log("Generated JWT:", jwt.jwt);

      // Store JWT in localStorage
      localStorage.setItem("token", jwt.jwt);

      // ✅ Debug: confirm what’s stored
      console.log(
        "Stored token in localStorage:",
        localStorage.getItem("token")
      );

      toast.success(`Welcome back, ${user.name || user.email}!`, {
        description: "Redirecting to your dashboard…",
        icon: "✅",
        duration: 3000,
      });
      toast.dismiss(tId);

      // ✅ Debug: show where we’re redirecting
      console.log("Redirecting to:", redirectTo);

      router.push(redirectTo);
    } catch (err: unknown) {
      let msg = "Login failed";

      if (err instanceof Error) {
        msg = err.message;
        console.error("Login error (Error):", err);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        msg = (err as { message: string }).message;
        console.error("Login error (object):", err);
      } else {
        console.error("Login error (unknown):", err);
      }

      toast.error(msg, { icon: "❌", duration: 5000 });
      toast.dismiss(tId);
    } finally {
      setLoading(false);
      console.log("Signin process finished, loading set to false");
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 sm:p-8 shadow-lg">
        {/* Animated accent bar */}
        <motion.div className="mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 animate-pulse" />

        <motion.div
          className="grid grid-cols-1 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}>
          {/* Email input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 text-white font-bold shadow-md hover:from-green-500 hover:via-teal-400 hover:to-blue-500 transition-transform duration-200">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </motion.div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signup"
            className="w-full sm:w-auto rounded-md border-2 border-blue-500 px-4 py-2 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Go to signup">
            Don&apos;t have an account?
          </motion.a>
        </div>
      </motion.div>
    </motion.form>
  );
}
