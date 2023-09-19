import { Label } from "./Label";

export type NumberFieldProps = {
  name: string;
  label?: string;
  defaultValue: any;
  step?: number;
  disabled?: boolean;
};
export const NumberField = ({
  name,
  label,
  step,
  defaultValue,
  disabled,
}: NumberFieldProps) => {
  return (
    <Label label={label || name}>
      <input
        disabled={disabled || false}
        className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        type="number"
        step={step || 1}
        name={name}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
