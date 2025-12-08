import React from "react";

interface AvatarFieldProps {
  form: { avatarUrl?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarField({ form, onChange }: AvatarFieldProps) {
  return (
    <div>
      <label
        htmlFor="avatarUrl"
        className="text-sm font-semibold text-slate-700">
        Avatar
      </label>
      <input
        id="avatarUrl"
        name="avatarUrl"
        type="file" // ✅ use file input
        accept="image/*" // restrict to images
        onChange={onChange} // handle file selection
        className="input"
      />

      {/* Optional preview if avatarUrl is set */}
      {form.avatarUrl && (
        <img
          src={form.avatarUrl}
          alt="Avatar preview"
          className="mt-2 h-16 w-16 rounded-full object-cover"
        />
      )}
    </div>
  );
}
