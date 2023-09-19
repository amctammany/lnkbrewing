import { Label } from "./Label";

export type TextFieldProps = {
  name: string;
  label?: string;
  defaultValue: any;
  disabled?: boolean;
};
export const TextField = ({
  name,
  disabled,
  label,
  defaultValue,
}: TextFieldProps) => {
  return (
    <Label label={label || name}>
      <input
        disabled={disabled}
        className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        type="text"
        name={name}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
