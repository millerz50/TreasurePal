// src/features/auth/components/SignupForm.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import usePhoneFormatter from "../../../hooks/usePhoneFormatter";
import { SignupFormData, SignupSchema } from "../SignupSchema";
import SocialSignup from "../SocialSignup";

import BioField from "./BioField";
import ContactFields from "./ContactFields";
import CountryLocationFields from "./CountryLocationFields";
import DOBField from "./DOBField";
import NameFields from "./NameFields";
import PasswordField from "./PasswordField";

/* ----------------------------------
   DEBUG UTILITIES
----------------------------------- */

const DEBUG = true;

function logGroup(label: string, data?: unknown) {
  if (!DEBUG) return;
  // Use collapsed groups to keep the console readable
  // Expand when you want detail.

  console.groupCollapsed(`🔎 ${label}`);
  if (data !== undefined) console.log(data);
  console.groupEnd();
}

function formatZodError(err: unknown) {
  if (!err || typeof err !== "object") return String(err);
  // ZodError shape: { issues: [{ path, message, code, ... }] }
  const anyErr = err as any;
  if (Array.isArray(anyErr?.issues)) {
    return anyErr.issues
      .map((i: any) => `• ${i.path?.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
  }
  return String(err);
}

function safeJson(res: Response) {
  // Some error responses may be empty or non‑JSON
  return res
    .clone()
    .json()
    .catch(() => null);
}

/* ----------------------------------
   PROPS
----------------------------------- */

interface SignupFormProps {
  redirectTo?: string;
}

/* ----------------------------------
   COMPONENT
----------------------------------- */

export default function SignupForm({
  redirectTo = "/auth/signin",
}: SignupFormProps) {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  // Track initial UUID for visibility
  const initialAccountIdRef = useRef<string>(crypto.randomUUID());

  const [form, setForm] = useState<SignupFormData>({
    accountid: initialAccountIdRef.current,
    email: "",
    firstName: "",
    surname: "",
    phone: undefined,
    country: "",
    location: "",
    roles: ["user"],
    status: "Pending",
    bio: undefined,
    password: "",
    dateOfBirth: undefined,
  });

  /* ----------------------------------
     PHONE FORMATTER
  ----------------------------------- */

  const { phone, setPhone, getE164 } = usePhoneFormatter(form.country);

  // Mirror display phone back into derived form for child components
  const formWithDerivedPhone = useMemo(
    () => ({ ...form, phone }),
    [form, phone]
  );

  /* ----------------------------------
     DEBUG: State changes
  ----------------------------------- */

  useEffect(() => {
    logGroup("Form state changed", form);
  }, [form]);

  useEffect(() => {
    logGroup("Display phone changed", {
      displayPhone: phone,
      country: form.country,
    });
  }, [phone, form.country]);

  /* ----------------------------------
     HANDLERS
  ----------------------------------- */

  const updateField = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
      updateField("phone", value);
      logGroup("handleChange: phone", { raw: value });
      return;
    }
    updateField(name, value);
    logGroup(`handleChange: ${name}`, { raw: value });
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const trimmed = value.trim();
    updateField(name, trimmed === "" ? undefined : trimmed);
    if (name === "phone") setPhone(trimmed);
    logGroup("handleBlur", {
      field: name,
      raw: value,
      trimmed,
      stored: trimmed === "" ? undefined : trimmed,
    });
  };

  /* ----------------------------------
     IMAGE UPLOAD
  ----------------------------------- */

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      logGroup("Avatar change: no file selected");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      logGroup("Avatar change: invalid file type", {
        type: file.type,
        name: file.name,
        size: file.size,
      });
      return;
    }
    setAvatar(file);
    logGroup("Avatar selected", {
      type: file.type,
      name: file.name,
      size: file.size,
    });
  };

  /* ----------------------------------
     CLEAN PAYLOAD
  ----------------------------------- */

  const cleanForm = (obj: Record<string, any>) => {
    const cleaned = Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => {
          if (typeof v === "string") {
            const trimmed = v.trim();
            return [k, trimmed === "" ? undefined : trimmed];
          }
          return [k, v];
        })
        .filter(([, v]) => v !== undefined)
    );
    logGroup("cleanForm result", cleaned);
    return cleaned;
  };

  /* ----------------------------------
     SUBMIT
  ----------------------------------- */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Performance marks
    if (DEBUG && performance?.mark) performance.mark("signup-start");

    setLoading(true);

    try {
      logGroup("Submit: raw form state", form);

      // Normalize base payload
      const payload = cleanForm(form);
      payload.email = String(payload.email).toLowerCase();
      payload.phone = getE164() ?? undefined;

      logGroup("Submit: normalized payload", {
        payload,
        e164: payload.phone,
        contentType: "application/json",
        endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
      });

      // Zod validation
      const parsedResult = SignupSchema.safeParse(payload);
      if (!parsedResult.success) {
        const formatted = formatZodError(parsedResult.error);
        logGroup("Zod validation failed", parsedResult.error);
        console.error("Zod errors:\n" + formatted);
        alert("Please fix the following:\n" + formatted);
        throw new Error("Client validation failed");
      }
      const parsed = parsedResult.data;
      logGroup("Zod validation passed (parsed)", parsed);

      // Send signup
      console.time("signup:fetch");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed),
        }
      );
      console.timeEnd("signup:fetch");

      logGroup("Signup response meta", {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        url: res.url,
      });

      if (!res.ok) {
        const body = await safeJson(res);
        logGroup("Signup response body (error)", body);
        throw new Error(
          body?.message || body?.error || `Signup failed (${res.status})`
        );
      }

      const responseBody = await safeJson(res);
      logGroup("Signup response body (success)", responseBody);

      // Avatar upload (optional)
      if (avatar) {
        logGroup("Uploading avatar start", {
          accountid: parsed.accountid,
          name: avatar.name,
          sizeKB: Math.round(avatar.size / 1024),
          type: avatar.type,
        });

        const avatarForm = new FormData();
        avatarForm.append("file", avatar);
        avatarForm.append("accountid", parsed.accountid);

        console.time("avatar:fetch");
        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/storage/upload`,
          {
            method: "POST",
            body: avatarForm,
          }
        );
        console.timeEnd("avatar:fetch");

        logGroup("Avatar upload response meta", {
          ok: uploadRes.ok,
          status: uploadRes.status,
          statusText: uploadRes.statusText,
        });

        if (!uploadRes.ok) {
          const uploadBody = await safeJson(uploadRes);
          logGroup("Avatar upload response body (error)", uploadBody);
          console.warn("Avatar upload failed");
        } else {
          const uploadBody = await safeJson(uploadRes);
          logGroup("Avatar upload response body (success)", uploadBody);
        }
      } else {
        logGroup("Avatar skipped: no file selected");
      }

      const redirectUrl = `${redirectTo}?email=${encodeURIComponent(
        parsed.email
      )}`;
      logGroup("Redirecting", { to: redirectUrl });
      window.location.href = redirectUrl;
    } catch (err: any) {
      // Detailed error reporting
      logGroup("Submit error caught", {
        message: err?.message,
        stack: err?.stack,
      });
      console.error("Signup error:", err);
      alert(err?.message ?? "Signup failed. Please try again.");
    } finally {
      setLoading(false);
      if (DEBUG && performance?.mark && performance?.measure) {
        performance.mark("signup-end");
        performance.measure("signup-total", "signup-start", "signup-end");
      }
    }
  };

  /* ----------------------------------
     UI
  ----------------------------------- */

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl
                 bg-gradient-to-br from-green-500 via-teal-500 to-blue-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Extra debug attributes for inspection
      data-debug="signup-form">
      <div
        className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md
                      p-6 shadow-lg space-y-6 flex flex-col">
        <div className="flex flex-col items-center gap-3">
          <label className="font-medium text-sm">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm"
            data-debug="avatar-input"
          />
        </div>

        <NameFields form={form} onChange={handleChange} onBlur={handleBlur} />
        <ContactFields
          form={formWithDerivedPhone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <CountryLocationFields
          form={form}
          onChange={handleChange}
          onLocationSelect={(loc) => {
            const name = loc?.name?.trim?.() ?? "";
            logGroup("Location selected", { raw: loc, stored: name });
            setForm((prev) => ({ ...prev, location: name || undefined }));
          }}
        />
        <BioField form={form} onChange={handleChange} />
        <DOBField form={form} onChange={handleChange} onBlur={handleBlur} />
        <PasswordField
          form={form}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
          <Button
            type="submit"
            disabled={loading}
            className="btn-primary w-full sm:w-auto"
            data-debug="submit-btn">
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <a
            href="/auth/signin"
            className="btn-outline w-full sm:w-auto text-center">
            Already have an account?
          </a>
        </div>

        <SocialSignup />
      </div>
    </motion.form>
  );
}
