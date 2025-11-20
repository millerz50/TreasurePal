// components/auth/fields/PasswordField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function PasswordField({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="password">
        <strong>Password</strong>
      </Label>
      <Input
        id="password"
        name="password"
        type="password"
        value={value}
        onChange={onChange}
        required
      />
      <p className="text-sm text-muted mt-1">Minimum 8 characters</p>
    </div>
  );
}
