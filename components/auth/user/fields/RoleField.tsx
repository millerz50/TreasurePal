import { Label } from "../../../ui/label";

export default function RoleField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="role">
        <strong>Role</strong>
      </Label>
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        className="select select-bordered w-full">
        <option value="user">User</option>
        <option value="agent">Agent</option>
      </select>
    </div>
  );
}
