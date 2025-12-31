// components/agents/AgentForm.tsx
"use client";

import { submitAgentApplication, type AgentPayload } from "@/lib/api/agents";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

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
  accountid: initialAccountId,
  onSuccess,
}: {
  accountid?: string;
  onSuccess?: () => void;
}) {
  const router = useRouter();

  const [values, setValues] = useState<AgentFormValues>({
    accountid: initialAccountId ?? "",
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

  const [loadingUser, setLoadingUser] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "error" | "success";
    message?: string;
  }>({ type: "idle" });

  const update = useCallback(
    (patch: Partial<AgentFormValues>) => setValues((v) => ({ ...v, ...patch })),
    []
  );

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchMe() {
      setLoadingUser(true);
      try {
        const controller = new AbortController();
        const API_BASE = process.env.NEXT_PUBLIC_API_URL;
        if (!API_BASE) throw new Error("API base URL is not configured");

        const res = await fetch(`${API_BASE}/users/me`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
          signal: controller.signal,
        });

        if (res.status === 401) {
          const returnTo =
            typeof window !== "undefined"
              ? window.location.pathname
              : "/agents/join";
          router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
          return;
        }
        const json = await res.json();
        if (!mounted) return;

        if (json?.success && json?.data) {
          const u = json.data;
          update({
            accountid: u.accountid ?? u.$id ?? u.id ?? values.accountid,
            userId: u.$id ?? u.id ?? u.userId ?? values.userId,
            fullName: u.fullName ?? u.name ?? values.fullName,
            email: u.email ?? values.email,
            phone: u.phone ?? values.phone,
            city: u.city ?? values.city,
          });
        }
      } catch {
        // intentionally ignored
      } finally {
        if (mounted) setLoadingUser(false);
      }
    }

    fetchMe();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [initialAccountId, update, router, values]);

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

      await submitAgentApplication(payload);

      setStatus({
        type: "success",
        message: "Application submitted. We'll be in touch.",
      });

      setValues((prev) => ({
        accountid: prev.accountid,
        userId: prev.userId,
        fullName: "",
        email: "",
        phone: "",
        city: "",
        licenseNumber: "",
        agencyId: "",
        rating: "",
        verified: false,
        message: "",
      }));

      onSuccess?.();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Submission failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input type="hidden" name="accountid" value={values.accountid} />

      {loadingUser && (
        <div className="text-sm text-slate-500">Loading your profile…</div>
      )}

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
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Agency ID (optional)</span>
          <input
            type="text"
            value={values.agencyId}
            onChange={(e) => update({ agencyId: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2"
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
          disabled={submitting || loadingUser}
          className="px-4 py-2 rounded-md bg-emerald-500 text-white disabled:opacity-60">
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
