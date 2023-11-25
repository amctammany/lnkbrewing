import { SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";

export type TextFieldProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
} & VariantProps<typeof textFieldStyles>;
const textFieldStyles = cva("input", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
    },
    size: {
      default: ["w-full"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});
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
      variant,
      size,
    }: TextFieldProps,
    ref
  ) {
    return (
      <Label label={label || name}>
        <input
          disabled={disabled}
          className={textFieldStyles({ variant, size })}
          //className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
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
