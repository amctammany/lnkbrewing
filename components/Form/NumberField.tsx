import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";

export type NumberFieldProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  error?: SchemaFieldError;
  step?: number;
  disabled?: boolean;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
} & VariantProps<typeof numberFieldStyles> &
  ComponentProps<"input">;
const numberFieldStyles = cva("input w-full", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
      error: ["bg-error-200"],
    },
    size: {
      default: [""],
      small: [""],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

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
      variant,
      size,
      error,
      className,
    }: NumberFieldProps,
    ref
  ) {
    return (
      <Label
        className={className}
        size={size}
        label={label || name}
        error={error}
      >
        <input
          disabled={disabled || false}
          className={numberFieldStyles({
            variant: error ? "error" : variant,
            size,
          })}
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
