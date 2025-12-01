"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../components/ui/button";

// ✅ Schema without phone validation
const SignupSchema = z.object({
  accountId: z.string().min(1, "Account ID required"),
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name required"),
  surname: z.string().min(1, "Surname required"),
<<<<<<< HEAD
=======
  phone: z.string().optional(),
>>>>>>> 6e3919ce1e9604b8c3f6c7e4f44f93630d7f28a2
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
    accountId: crypto.randomUUID(), // ✅ use browser UUID generator
    email: "",
    firstName: "",
    surname: "",
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
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    const tId = toast.loading("Creating your account…", {
      description: "Please wait while we finalize your details.",
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
<<<<<<< HEAD
=======
        phone: parsed.data.phone || null,
>>>>>>> 6e3919ce1e9604b8c3f6c7e4f44f93630d7f28a2
        nationalId: parsed.data.nationalId || null,
        bio: parsed.data.bio || null,
        metadata: parsed.data.metadata || [],
      };

      const res = await fetch(
        "https://treasurepal-backened.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(
          body.error || body.message || `Signup failed (${res.status})`
        );
        toast.dismiss(tId);
        return;
      }

      toast.success("Account created successfully!", {
        description: "Redirecting you to signin…",
      });

      toast.dismiss(tId);

      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1200);
    } catch {
      toast.error("Network error. Try again.");
      toast.dismiss(tId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full sm:max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl 
                 bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg">
        <div className="grid grid-cols-1 gap-6">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="input"
            />
          </div>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Surname
              </label>
              <input
                name="surname"
                value={form.surname}
                onChange={onChange}
                className="input"
              />
            </div>
          </div>

          {/* Role + National ID */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={onChange}
                className="input">
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                National ID
              </label>
              <input
                name="nationalId"
                value={form.nationalId}
                onChange={onChange}
                className="input"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-semibold text-slate-700">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={onChange}
              className="input"
              rows={3}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="input"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <a href="/signin" className="btn-outline">
            Already have an account?
          </a>
        </div>
      </div>
    </motion.form>
  );
}


