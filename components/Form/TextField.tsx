import { SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";

export type TextFieldProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
};
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      name,
      onChange,
      onBlur,
      value,
      disabled,
      label,
      defaultValue,
    }: TextFieldProps,
    ref
  ) {
    return (
      <Label label={label || name}>
        <input
          disabled={disabled}
          className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="text"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
      </Label>
    );
  }
);
