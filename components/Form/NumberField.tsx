import { SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";

export type NumberFieldProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  step?: number;
  disabled?: boolean;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
};
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  function NumberField(
    {
      name,
      label,
      step,
      defaultValue,
      disabled,
      onBlur,
      onChange,
      value,
    }: NumberFieldProps,
    ref
  ) {
    return (
      <Label label={label || name}>
        <input
          disabled={disabled || false}
          className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="number"
          step={step || 1}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
      </Label>
    );
  }
);
