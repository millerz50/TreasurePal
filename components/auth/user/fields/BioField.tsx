import { Label } from "../../../ui/label";

export default function BioField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mb-4">
      <Label htmlFor="bio">
        <strong>Bio</strong>
      </Label>
      <textarea
        id="bio"
        name="bio"
        value={value}
        onChange={onChange}
        rows={3}
        className="textarea textarea-bordered w-full"
      />
    </div>
  );
}
