"use client";

interface Props {
  value: string;
  onChange: (val: string) => void; // 👈 emit string, not event
}

const COUNTRIES = [
  "Zimbabwe",
  "South Africa",
  "Botswana",
  "Zambia",
  "Mozambique",
];

export default function CountrySelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)} // 👈 convert event to string
      className="select select-bordered w-full">
      <option value="">Select country</option>
      {COUNTRIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
