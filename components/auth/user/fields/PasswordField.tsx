import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function PasswordField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    </div>
  );
}
