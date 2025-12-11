"use client";

import React from "react";

interface NameFieldsProps {
  form: { firstName: string; surname: string };
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

export default function NameFields({
  form,
  onChange,
  onBlur,
}: NameFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="firstName"
          className="text-sm font-semibold text-slate-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName || ""}
          onChange={onChange}
          onBlur={onBlur}
          className="input"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="surname"
          className="text-sm font-semibold text-slate-700">
          Surname
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={form.surname || ""}
          onChange={onChange}
          onBlur={onBlur}
          className="input"
          placeholder="Enter your surname"
          required
        />
      </div>
    </div>
  );
}
