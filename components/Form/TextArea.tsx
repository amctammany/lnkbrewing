import { SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";

export type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
};
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextAreaComp(
    {
      name,
      label,
      rows,
      disabled,
      defaultValue,
      onChange,
      onBlur,
      value,
    }: TextAreaProps,
    ref
  ) {
    return (
      <Label label={label || name}>
        <textarea
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          value={value}
          disabled={disabled}
          className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          name={name}
          rows={rows || 3}
        />
      </Label>
    );
  }
);
