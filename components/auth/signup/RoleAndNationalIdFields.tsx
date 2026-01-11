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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {/* ROLE */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="role" className="text-sm font-semibold text-slate-700">
          Role
        </label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          className="
            w-full rounded-xl border border-slate-300 
            bg-white p-3 text-slate-800 
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            transition-all duration-300 ease-in-out
          ">
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      {/* NATIONAL ID */}
      <div className="flex flex-col space-y-2">
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
          placeholder="Enter your national ID"
          className="
            w-full rounded-xl border border-slate-300 
            bg-white p-3 text-slate-800 
            shadow-sm placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            transition-all duration-300 ease-in-out
          "
        />
      </div>
    </div>
  );
}
