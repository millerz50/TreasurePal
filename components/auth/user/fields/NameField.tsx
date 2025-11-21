// components/auth/user/fields/NameField.tsx
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function NameField({
  firstName,
  surname,
  onChange,
}: {
  firstName: string;
  surname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="firstName">
          <strong>First name</strong>
        </Label>
        <Input
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="surname">
          <strong>Surname</strong>
        </Label>
        <Input
          id="surname"
          name="surname"
          value={surname}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}
