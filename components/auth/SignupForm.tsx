"use client";
import { ID } from "appwrite";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../components/ui/button";

const SignupSchema = z.object({
  accountId: z.string().min(1, "Account ID required"),
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name required"),
  surname: z.string().min(1, "Surname required"),
  phone: z.string().max(11).optional(),
  role: z.enum(["user", "agent"]).default("user"),
  status: z
    .enum(["Not Verified", "Pending", "Active", "Suspended"])
    .default("Pending"),
  nationalId: z.string().optional(),
  bio: z.string().max(300).optional(),
  metadata: z.array(z.string()).optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormData = z.infer<typeof SignupSchema>;

export default function SignupForm({
  redirectTo = "/signin",
}: {
  redirectTo?: string;
}) {
  const [form, setForm] = useState<SignupFormData>({
    accountId: ID.unique(),
    email: "",
    firstName: "",
    surname: "",
    phone: "",
    role: "user",
    status: "Pending",
    nationalId: "",
    bio: "",
    metadata: [],
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = SignupSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message, {
        icon: "❌",
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    const tId = toast.loading("Creating your account…", {
      description: "Please wait while we finalize your details.",
      icon: "⏳",
    });

    try {
      const payload = {
        accountId: parsed.data.accountId,
        email: parsed.data.email.toLowerCase(),
        firstName: parsed.data.firstName,
        surname: parsed.data.surname,
        password: parsed.data.password,
        role: parsed.data.role,
        status: "Active",
        phone: parsed.data.phone || null,
        nationalId: parsed.data.nationalId || null,
        bio: parsed.data.bio || null,
        metadata: parsed.data.metadata || [],
      };

      // ✅ Use production API domain
      let res = await fetch("https://www.treasureprops.com/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // ✅ Optional fallback to regional domain if global fails
      if (!res.ok) {
        console.warn("Primary signup failed, trying fallback…");
        res = await fetch("https://www.treasureprops.co.zw/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          body?.error || body?.message || `Signup failed (${res.status})`;
        toast.error(msg, { icon: "⚠️", duration: 5000 });
        toast.dismiss(tId);
        return;
      }

      toast.success("Account created successfully!", {
        description: "Redirecting you to signin…",
        icon: "✅",
        duration: 3000,
      });
      toast.dismiss(tId);

      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1200);
    } catch {
      toast.error("Network error. Try again.", { icon: "🌐", duration: 5000 });
      toast.dismiss(tId);
    } finally {
      setLoading(false);
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
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-sm"
            />
          </div>

          {/* First Name + Surname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                placeholder="John"
                className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 mb-1">
                Surname
              </label>
              <input
                name="surname"
                value={form.surname}
                onChange={onChange}
                placeholder="Doe"
                className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={onChange}
              placeholder="+263 77 000 0000"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Role + National ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-sm">
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 mb-1">
                National ID
              </label>
              <input
                name="nationalId"
                value={form.nationalId || ""}
                onChange={onChange}
                placeholder="63-123456A12"
                className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Bio */}
          {/* Bio */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio || ""}
              onChange={onChange}
              placeholder="Tell us about yourself..."
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 transition-all duration-200 shadow-sm"
              rows={3}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
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
              {loading ? "Creating..." : "Create account"}
            </Button>
          </motion.div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signin"
            className="w-full sm:w-auto rounded-md border-2 border-blue-500 px-4 py-2 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Go to login">
            Already have an account?
          </motion.a>
        </div>
      </motion.div>
    </motion.form>
  );
}
