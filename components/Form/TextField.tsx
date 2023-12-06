import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";

export type TextFieldProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
} & VariantProps<typeof textFieldStyles> &
  ComponentProps<"input">;
const textFieldStyles = cva(
  "disabled:bg-slate-50 disabled:shadow-none disabled:text-slate-500 disabled:border-slate-200",
  {
    variants: {
      variant: {
        error: ["border-2 border-red-500"],
        default: ["block"],
      },
      size: {
        default: ["w-full"],
      },
    },
    defaultVariants: { size: "default", variant: "default" },
  }
);
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      name,
      onChange,
      onBlur,
      value,
      error,
      errorMessage,
      disabled,
      label,
      defaultValue,
      variant,
      size,
      ...props
    }: TextFieldProps,
    ref
  ) {
    console.log({ error, errorMessage });
    return (
      <Label variant={error ? "error" : "default"} label={label || name}>
        <input
          disabled={disabled}
          className={textFieldStyles({
            variant: error ? "error" : variant,
            size,
          })}
          //className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="text"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...props}
          ref={ref}
        />
        <b>{error ? errorMessage : ""}</b>
      </Label>
    );
  }
);
