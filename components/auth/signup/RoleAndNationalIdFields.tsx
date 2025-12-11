import React from "react";

interface RoleAndNationalIdFieldsProps {
  form: { role: string; nationalId?: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function RoleAndNationalIdFields({
  form,
  onChange,
}: RoleAndNationalIdFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label htmlFor="role" className="text-sm font-semibold text-slate-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={form.role || ""}
          onChange={onChange}
          className="input">
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
      </div>
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
          value={form.nationalId || ""}
          onChange={onChange}
          className="input"
          placeholder="Enter your national ID"
        />
      </div>
    </div>
  );
}
