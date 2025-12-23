"use client";

import React from "react";
import { SignupFormData } from "../SignupSchema";

type Role = SignupFormData["roles"][number];

interface RoleAndNationalIdFieldsProps {
  form: {
    roles: Role[];
    nationalId?: string;
  };
  onRoleChange: (role: Role) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function RoleAndNationalIdFields({
  form,
  onRoleChange,
  onChange,
  onBlur,
}: RoleAndNationalIdFieldsProps) {
  const selectedRole = form.roles?.[0] ?? "user";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* ROLE */}
      <div>
        <label htmlFor="role" className="text-sm font-semibold text-slate-700">
          Role
        </label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          className="input">
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      {/* NATIONAL ID */}
      <div>
        <label
          htmlFor="nationalId"
          className="text-sm font-semibold text-slate-700">
          National ID
        </label>
        <input
          type="text"
          id="nationalId"
          name="nationalId"
          value={form.nationalId ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className="input"
          placeholder="Enter your national ID"
        />
      </div>
    </div>
  );
}
