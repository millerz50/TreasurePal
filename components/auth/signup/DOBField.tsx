interface DOBFieldProps {
  form: { dateOfBirth?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DOBField({ form, onChange }: DOBFieldProps) {
  return (
    <div>
      <label
        htmlFor="dateOfBirth"
        className="text-sm font-semibold text-slate-700">
        Date of Birth
      </label>
      <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        value={form.dateOfBirth || ""}
        onChange={onChange}
        className="input"
        required
      />
    </div>
  );
}
