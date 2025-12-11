"use client";

import React from "react";

interface PasswordFieldProps {
  form: { password: string };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function PasswordField({
  form,
  onChange,
  onBlur,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor="password"
        className="text-sm font-semibold text-slate-700">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password || ""}
        onChange={onChange}
        onBlur={onBlur}
        className="input w-full"
        placeholder="Enter your password"
        required
      />
    </div>
  );
}
