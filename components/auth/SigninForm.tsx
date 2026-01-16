"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

import usePhoneFormatter from "@/hooks/usePhoneFormatter";
import { account } from "@/lib/appwrite";

export default function SigninForm({
  redirectTo = "/",
}: {
  redirectTo?: string;
}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneModal, setPhoneModal] = useState(false);
  const { phone, setPhone, getE164 } = usePhoneFormatter("default");

  const [loading, setLoading] = useState(false);

  /* -----------------------------
     STEP 2: SAVE PHONE + OTP
  ------------------------------ */
  async function updatePhoneAndVerify() {
    const e164 = getE164();

    if (!e164) {
      toast.error("Invalid phone number format");
      return;
    }

    const tId = toast.loading("Updating phone number…");

    try {
      await account.updatePhone(e164, password);
      await account.createPhoneVerification();

      toast.success("Verification code sent!");
      toast.dismiss(tId);

      const user = await account.get();
      router.push(`/auth/verify?userId=${user.$id}`);
    } catch (err: any) {
      console.error("Phone update error:", err);
      toast.error(err?.message || "Failed to update phone");
      toast.dismiss(tId);
    }
  }

  /* -----------------------------
     STEP 1: LOGIN
  ------------------------------ */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    const tId = toast.loading("Signing you in…");

    try {
      /* ---------------------------------
         1️⃣ Create Appwrite session
      ---------------------------------- */
      await account.createEmailPasswordSession(
        email.toLowerCase(),
        password
      );

      /* ---------------------------------
         2️⃣ Ensure session is active
      ---------------------------------- */
      const user = await account.get();

      /* ---------------------------------
         3️⃣ Warm up JWT (CRITICAL)
      ---------------------------------- */
      await account.createJWT();

      /* ---------------------------------
         4️⃣ Phone required
      ---------------------------------- */
      if (!user.phone) {
        toast.dismiss(tId);
        setPhoneModal(true);
        return;
      }

      toast.success("Welcome back!");
      toast.dismiss(tId);

      /* ---------------------------------
         5️⃣ Redirect
      ---------------------------------- */
      router.refresh();
      router.push(redirectTo);
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.message || "Login failed");
      toast.dismiss(tId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* LOGIN FORM */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl
                   bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="border p-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="border p-3 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <a
            href="/auth/signup"
            className="block text-center mt-3 text-blue-700 underline"
          >
            Create an account
          </a>
        </div>
      </motion.form>

      {/* PHONE MODAL */}
      {phoneModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-center">
              Add Phone Number
            </h2>

            <p className="text-sm text-gray-600 text-center">
              Please verify your phone number to continue.
            </p>

            <input
              type="tel"
              className="border p-3 rounded-lg w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+263 771 234 567"
            />

            <Button
              onClick={updatePhoneAndVerify}
              className="w-full bg-green-600 text-white"
            >
              Save & Verify Phone
            </Button>

            <Button
              variant="ghost"
              className="w-full text-gray-600"
              onClick={() => setPhoneModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
