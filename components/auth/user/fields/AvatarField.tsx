// components/auth/fields/AvatarField.tsx
// components/auth/fields/AvatarField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function AvatarField({
  onChange,
}: {
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="avatar">
        <strong>Avatar</strong>
      </Label>
      <Input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </div>
  );
}
