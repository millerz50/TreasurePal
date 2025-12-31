import React from "react";

interface AvatarFieldProps {
  avatar?: File | null;
  onChange: (file: File | null) => void;
}

export default function AvatarField({ avatar, onChange }: AvatarFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="avatar" className="text-sm font-semibold text-slate-700">
        Avatar
      </label>

      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="input"
      />

      {avatar && (
        <img
          src={URL.createObjectURL(avatar)}
          alt="Avatar preview"
          className="mt-2 h-16 w-16 rounded-full object-cover border"
          onLoad={(e) => {
            // cleanup memory
            URL.revokeObjectURL((e.target as HTMLImageElement).src);
          }}
        />
      )}
    </div>
  );
}
