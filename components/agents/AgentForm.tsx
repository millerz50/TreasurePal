"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export type AgentFormValues = {
  userId?: string; // logged-in user's ID
  fullName: string;
  email?: string;
  phone?: string;
  city?: string;
  licenseNumber?: string;
  agencyId?: string;
  rating?: number | "";
  verified?: boolean;
  message?: string;
};

// API payload type
export type AgentPayload = {
  userId: string;
  fullName: string;
  email?: string;
  phone?: string;
  city?: string;
  licenseNumber?: string;
  agencyId?: string;
  rating?: number;
  verified?: boolean;
  message?: string;
};

// Submit to your API
async function submitAgentApplication(payload: AgentPayload) {
  const API_URL = "https://treasurepalapi.onrender.com/api/agents/apply";

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || `Failed to submit: ${res.status}`);
  }

  return res.json();
}

export default function AgentForm({
  onSuccess,
  userAccountId,
}: {
  onSuccess?: () => void;
  userAccountId?: string;
}) {
  const { user, loading } = useAuth();

  const [values, setValues] = useState<AgentFormValues>({
    userId: userAccountId,
    fullName: "",
    email: "",
    phone: "",
    city: "",
    licenseNumber: "",
    agencyId: "",
    rating: "",
    verified: false,
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Prefill user info if logged in
  useEffect(() => {
    if (loading) return;

    if (!user && !userAccountId) {
      toast.error("You need an account to apply for an agency.");
      return;
    }

    if (user) {
      setValues((v) => ({
        ...v,
        userId: user.userId,
        fullName:
          user.firstName && user.surname
            ? `${user.firstName} ${user.surname}`
            : v.fullName,
        email: user.email,
        phone: user.phone || v.phone,
        city: user.country || v.city,
      }));
    }
  }, [user, userAccountId, loading]);

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => setValues((v) => ({ ...v, ...patch })),
    []
  );

  const validate = (v: AgentFormValues) => {
    if (!v.userId) return "You must be logged in.";
    if (!v.fullName.trim()) return "Full name is required.";
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email))
      return "Invalid email address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate(values);
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);

    try {
      const payload: AgentPayload = {
        userId: values.userId!,
        fullName: values.fullName,
        email: values.email || undefined, // Use undefined instead of null
        phone: values.phone || undefined,
        city: values.city || undefined,
        licenseNumber: values.licenseNumber || undefined,
        agencyId: values.agencyId || undefined,
        rating: typeof values.rating === "number" ? values.rating : undefined,
        verified: values.verified || false,
        message: values.message || undefined,
      };

      await submitAgentApplication(payload);

      toast.success("Application submitted successfully!");

      // Reset optional fields
      setValues((v) => ({
        ...v,
        licenseNumber: "",
        agencyId: "",
        rating: "",
        verified: false,
        message: "",
      }));

      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-sm text-slate-500">Loading your profile…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={values.fullName}
          onChange={(e) => update({ fullName: e.target.value })}
          placeholder="Full name"
          className="input"
        />
        <input
          value={values.email || ""}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="Email"
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={values.phone || ""}
          onChange={(e) => update({ phone: e.target.value })}
          placeholder="Phone"
          className="input"
        />
        <input
          value={values.city || ""}
          onChange={(e) => update({ city: e.target.value })}
          placeholder="City"
          className="input"
        />
        <input
          type="number"
          value={values.rating || ""}
          onChange={(e) =>
            update({
              rating: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          placeholder="Years experience"
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={values.licenseNumber || ""}
          onChange={(e) => update({ licenseNumber: e.target.value })}
          placeholder="License number"
          className="input"
        />
        <input
          value={values.agencyId || ""}
          onChange={(e) => update({ agencyId: e.target.value })}
          placeholder="Agency ID"
          className="input"
        />
      </div>

      <textarea
        value={values.message || ""}
        onChange={(e) => update({ message: e.target.value })}
        rows={4}
        placeholder="Tell us about your experience"
        className="input"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!values.verified}
          onChange={(e) => update({ verified: e.target.checked })}
        />
        I confirm the information is accurate
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-60">
        {submitting ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
