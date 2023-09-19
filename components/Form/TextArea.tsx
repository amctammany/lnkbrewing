import { Label } from "./Label";

export type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
  defaultValue: any;
};
export const TextArea = ({
  name,
  label,
  rows,
  disabled,
  defaultValue,
}: TextAreaProps) => {
  return (
    <Label label={label || name}>
      <textarea
        disabled={disabled}
        className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        name={name}
        rows={rows || 3}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
