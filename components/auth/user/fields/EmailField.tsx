// components/auth/fields/EmailField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function EmailField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="email">
        <strong>Email</strong>
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
