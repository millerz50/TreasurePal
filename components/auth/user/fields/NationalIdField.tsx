// components/auth/fields/NationalIdField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function NationalIdField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="nationalId">
        <strong>National ID</strong>
      </Label>
      <Input
        id="nationalId"
        name="nationalId"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
