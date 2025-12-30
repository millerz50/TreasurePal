// components/agents/AgentForm.tsx
"use client";

import { submitAgentApplication, type AgentPayload } from "@/lib/api/agents";
import React, { useCallback, useState } from "react";

export type AgentFormValues = {
  accountid?: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  licenseNumber?: string;
  agencyId?: string;
  rating?: number | "";
  verified?: boolean;
  message?: string;
};

export default function AgentForm({
  accountid,
  onSuccess,
}: {
  accountid?: string;
  onSuccess?: () => void;
}) {
  const [values, setValues] = useState<AgentFormValues>({
    accountid: accountid ?? "",
    userId: undefined,
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
  const [status, setStatus] = useState<{
    type: "idle" | "error" | "success";
    message?: string;
  }>({ type: "idle" });

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => setValues((v) => ({ ...v, ...patch })),
    []
  );

  const validate = (v: AgentFormValues) => {
    if (!v.accountid || typeof v.accountid !== "string")
      return "Account id is required (login required).";
    if (!v.fullName.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email || ""))
      return "Please enter a valid email.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle" });

    const err = validate(values);
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }

    setSubmitting(true);
    try {
      const payload: AgentPayload = {
        accountid: values.accountid!,
        userId: values.userId ?? null,
        fullName: values.fullName || null,
        email: values.email || null,
        phone: values.phone || null,
        city: values.city || null,
        licenseNumber: values.licenseNumber || null,
        agencyId: values.agencyId || null,
        rating: typeof values.rating === "number" ? values.rating : null,
        verified: !!values.verified,
        message: values.message || null,
      };

      const result = await submitAgentApplication(payload);
      setStatus({
        type: "success",
        message: "Application submitted. We'll be in touch.",
      });
      setValues({
        accountid: values.accountid,
        userId: undefined,
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
      onSuccess?.();
      return result;
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Submission failed",
      });
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input type="hidden" value={values.accountid} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="Jane Doe"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update({ email: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-sm font-medium">Phone</span>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => update({ phone: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="+263 77 123 4567"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">City</span>
          <input
            type="text"
            value={values.city}
            onChange={(e) => update({ city: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="Harare"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Years experience</span>
          <input
            type="number"
            min={0}
            value={values.rating as any}
            onChange={(e) =>
              update({
                rating: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="2"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium">License number (optional)</span>
          <input
            type="text"
            value={values.licenseNumber}
            onChange={(e) => update({ licenseNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="License #"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Agency ID (optional)</span>
          <input
            type="text"
            value={values.agencyId}
            onChange={(e) => update({ agencyId: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="Agency ID"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">
          Tell us about your experience
        </span>
        <textarea
          value={values.message}
          onChange={(e) => update({ message: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          placeholder="Briefly describe your background"
        />
      </label>

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!values.verified}
            onChange={(e) => update({ verified: e.target.checked })}
          />
          <span>I confirm the information is accurate</span>
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-md bg-emerald-500 text-white">
          {submitting ? "Submitting…" : "Submit application"}
        </button>

        <div className="text-sm">
          {status.type === "error" && (
            <span className="text-red-600">{status.message}</span>
          )}
          {status.type === "success" && (
            <span className="text-emerald-600">{status.message}</span>
          )}
        </div>
      </div>
    </form>
  );
}
