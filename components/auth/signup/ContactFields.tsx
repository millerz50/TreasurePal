import React from "react";

interface ContactFieldsProps {
  form: { email: string; phone: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactFields({ form, onChange }: ContactFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Email field */}
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email || ""}
          onChange={onChange}
          placeholder="you@example.com"
          className="input"
          required
        />
      </div>

      {/* Phone field */}
      <div>
        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone || ""}
          onChange={onChange}
          placeholder="+263771234567"
          className="input"
          required
        />
      </div>
    </div>
  );
}
