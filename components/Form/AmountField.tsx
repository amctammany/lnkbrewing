import { ComponentProps, useState, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { UserMassPreference } from "@prisma/client";
import clsx from "clsx";
import { AmtField } from "./AmtField";
import { LbOzField } from "./LbOzField";
const massFactors: Record<UserMassPreference, number> = {
  Kg: 1,
  g: 1000,
  Lb: 2.20462,
  LbOz: 2.20462,
  Oz: 2.20462 * 16,
};
export function getAmount(value: number | undefined, type: UserMassPreference) {
  return value === undefined ? 0 : value * massFactors[type];
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
export const amountFieldStyles = cva("input", {
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
    console.log({ value, defaultValue, amountType });
    const translatedValue = getAmount(value, amountType);
    //console.log({ value, translatedValue, amountType });
    const Comp = amountType === "LbOz" ? LbOzField : AmtField;
    return (
      <Label
        className={clsx("", className)}
        label={label || name}
        error={error}
      >
        <Comp
          disabled={disabled || false}
          className={amountFieldStyles({
            variant: error ? "error" : variant,
            size,
          })}
          //type="number"
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