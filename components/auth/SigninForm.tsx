"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

import EmailField from "./user/fields/EmailField";
import PasswordField from "./user/fields/PasswordField";

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
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    const tId = toast.loading("Signing you in…");
    try {
      // 🔐 Create session using email/password
      await account.createEmailPasswordSession(email.toLowerCase(), password);

      // 👤 Fetch authenticated user
      const user = await account.get();

      // 🎉 Notify and redirect
      toast.success(`Welcome back, ${user.name || user.email}!`, {
        description: "Redirecting to your dashboard…",
      });
      toast.dismiss(tId);

      router.push(redirectTo);
    } catch (err: unknown) {
      let msg = "Login failed";

      if (err instanceof Error) {
        msg = err.message;
      } else if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        msg = (err as { message: string }).message;
      }

      toast.error(msg);
      toast.dismiss(tId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-xl mx-auto p-4 sm:p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />

        <div className="grid grid-cols-1 gap-4">
          <EmailField
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <PasswordField
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-500 hover:to-blue-500 transition-transform duration-200 hover:scale-[1.02]">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <a
            className="w-full sm:w-auto rounded-md border px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
            href="/signup"
            aria-label="Go to signup">
            Don&apos;t have an account?
          </a>
        </div>
      </div>
    </motion.form>
  );
}
