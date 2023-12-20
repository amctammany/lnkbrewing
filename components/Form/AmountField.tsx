import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { UserMassPreference } from "@prisma/client";
import clsx from "clsx";
const massFactors: Record<UserMassPreference, number> = {
  Kg: 1,
  g: 1000,
  Lb: 2.20462,
  LbOz: 2.20462,
  Oz: 2.20462 * 16,
};
export function getAmount(value: number | undefined, type: UserMassPreference) {
  return value === undefined ? value : value * massFactors[type];
}

export type AmountFieldProps = {
  name: string;
  amountType?: UserMassPreference;
  label?: string;
  defaultValue?: any;
  error?: SchemaFieldError;
  step?: number;
  disabled?: boolean;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
} & VariantProps<typeof amountFieldStyles> &
  ComponentProps<"input">;
const amountFieldStyles = cva("input", {
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
      default: ["w-full"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const AmountField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function AmountField(
    {
      name,
      label,
      amountType: _amountType,
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
    }: AmountFieldProps,
    ref
  ) {
    const amountType = _amountType ?? UserMassPreference.g;
    const translatedValue = getAmount(value, amountType);
    //console.log({ value, translatedValue, amountType });
    return (
      <Label
        className={clsx("", className)}
        label={label || name}
        error={error}
      >
        <div className="flex">
          <input
            disabled={disabled || false}
            className={amountFieldStyles({
              variant: error ? "error" : variant,
              size,
            })}
            type="number"
            step={step || 1}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            value={translatedValue}
            ref={ref}
          />
          <div className="grid pt-2 px-2 border border-black">{amountType}</div>
        </div>
      </Label>
    );
  }
);
