// src/features/auth/components/SignupForm.tsx
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Camera, CheckCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";

import usePhoneFormatter from "../../../hooks/usePhoneFormatter";
import { SignupFormData, SignupSchema } from "../SignupSchema";
import SocialSignup from "../SocialSignup";

import AvatarField from "./AvatarField";
import BioField from "./BioField";
import ContactFields from "./ContactFields";
import CountryLocationFields from "./CountryLocationFields";
import DOBField from "./DOBField";
import NameFields from "./NameFields";
import PasswordField from "./PasswordField";

/* ----------------------------------
   DEBUG UTILITIES
----------------------------------- */
const DEBUG = false; // set to true to enable debug logs
function logGroup(label: string, data?: unknown) {
  if (!DEBUG) return;
  console.groupCollapsed(`🔎 ${label}`);
  if (data !== undefined) console.log(data);
  console.groupEnd();
}

function formatZodError(err: unknown) {
  if (!err || typeof err !== "object") return String(err);
  const anyErr = err as any;
  if (Array.isArray(anyErr?.issues)) {
    return anyErr.issues
      .map((i: any) => `• ${i.path?.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
  }
  return String(err);
}

function safeJson(res: Response) {
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
  const updateField = (name: string, value: any) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
      updateField("phone", value);
      return;
    }
    updateField(name, value);
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
  };

  const cleanForm = (obj: Record<string, any>) => {
    const cleaned = Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) =>
          typeof v === "string"
            ? [k, v.trim() === "" ? undefined : v.trim()]
            : [k, v]
        )
        .filter(([, v]) => v !== undefined)
    );
    return cleaned;
  };

  /* ----------------------------------
     SUBMIT
  ----------------------------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const tId = toast.loading("Creating your account...");

    try {
      const payload = cleanForm(form);
      payload.email = String(payload.email).toLowerCase();
      payload.phone = getE164() ?? undefined;

      const parsedResult = SignupSchema.safeParse(payload);
      if (!parsedResult.success) {
        const formatted = formatZodError(parsedResult.error);
        toast.error(formatted, { icon: <AlertTriangle className="w-5 h-5" /> });
        throw new Error("Client validation failed");
      }

      const parsed = parsedResult.data;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed),
        }
      );

      if (!res.ok) {
        const body = await safeJson(res);
        throw new Error(
          body?.message || body?.error || `Signup failed (${res.status})`
        );
      }

      // Avatar upload
      if (avatar) {
        const avatarForm = new FormData();
        avatarForm.append("file", avatar);
        avatarForm.append("accountid", parsed.accountid);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/storage/upload`,
          {
            method: "POST",
            body: avatarForm,
          }
        );

        if (!uploadRes.ok) {
          toast.error("Avatar upload failed", {
            icon: <AlertTriangle className="w-5 h-5" />,
          });
        }
      }

      toast.success("Account created!", {
        icon: <CheckCircle className="w-5 h-5" />,
      });

      window.location.href = `${redirectTo}?email=${encodeURIComponent(
        parsed.email
      )}`;
    } catch (err: any) {
      if (DEBUG) console.error("Signup error:", err);
      toast.error(err?.message || "Signup failed", {
        icon: <AlertTriangle className="w-5 h-5" />,
      });
    } finally {
      toast.dismiss(tId);
      setLoading(false);
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
      transition={{ duration: 0.5 }}>
      <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md p-6 shadow-lg space-y-6 flex flex-col">
        <AvatarField
          avatar={avatar}
          onChange={(file: File | null) => {
            setAvatar(file);
            if (file) {
              toast.success("Avatar selected", {
                icon: <Camera className="w-5 h-5" />,
              });
            }
          }}
        />

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
            const name = loc?.name?.trim() ?? "";
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
            className="btn-primary w-full sm:w-auto">
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
