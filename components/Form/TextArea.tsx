import { Label } from "./Label";

export type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  defaultValue: any;
};
export const TextArea = ({
  name,
  label,
  rows,
  defaultValue,
}: TextAreaProps) => {
  return (
    <Label label={label || name}>
      <textarea
        className="block w-full"
        name={name}
        rows={rows || 3}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
