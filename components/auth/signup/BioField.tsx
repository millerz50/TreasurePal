import React from "react";

interface BioFieldProps {
  form: { bio?: string };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function BioField({ form, onChange }: BioFieldProps) {
  return (
    <div>
      <label htmlFor="bio" className="text-sm font-semibold text-slate-700">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        value={form.bio || ""}
        onChange={onChange}
        rows={3}
        className="input"
        placeholder="Tell us a little about yourself..."
      />
    </div>
  );
}
