import React from "react";

interface PasswordFieldProps {
  form: { password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordField({ form, onChange }: PasswordFieldProps) {
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
        className="input"
        placeholder="Enter your password"
        required
      />
    </div>
  );
}
