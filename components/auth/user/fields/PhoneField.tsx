// components/auth/fields/PhoneField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function PhoneField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="phone">
        <strong>Phone</strong>
      </Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
