// components/auth/fields/PhoneField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function PhoneField({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="phone">
        <strong>Phone</strong>
      </Label>
      <Input id="phone" name="phone" value={value} onChange={onChange} />
    </div>
  );
}
