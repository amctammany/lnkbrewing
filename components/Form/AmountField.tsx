import { ComponentProps, useState, SyntheticEvent, forwardRef } from "react";
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

export const LbOzField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function LbOzField(
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
    const [lbs, setLbs] = useState(Math.floor(value));
    const [ozs, setOzs] = useState((value % lbs) / (1 / 16));
    console.log({ value, lbs, ozs });
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name: _name, value: _v } = e.currentTarget;
      const v = parseFloat(_v);
      let newValue = value;
      console.log({ _name, v });
      if (_name === "lbs") {
        newValue = v + ozs / 16;
        setLbs(v);
      } else if (_name === "ozs") {
        newValue = lbs + v / 16;
        setOzs(v);
      }
      if (onChange) {
        console.log({ name, newValue }, e.currentTarget);
        onChange({
          ...e,
          currentTarget: { ...e.currentTarget, name, value: newValue },
        });
      }
    };
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="flex">
          <input
            disabled={disabled || false}
            className={amountFieldStyles({
              variant: error ? "error" : variant,
              size,
            })}
            type="number"
            step={1}
            name="lbs"
            //defaultValue={lbs}
            onChange={handleChange}
            onBlur={onBlur}
            value={lbs}
          />
          <div className="grid pt-2 px-2 border border-black">Lb</div>
        </div>
        <div className="flex">
          <input
            disabled={disabled || false}
            className={amountFieldStyles({
              variant: error ? "error" : variant,
              size,
            })}
            type="number"
            step={0.1}
            name="ozs"
            //defaultValue={ozs}
            onChange={handleChange}
            onBlur={onBlur}
            value={ozs}
          />
          <div className="grid pt-2 px-2 border border-black">Oz</div>
        </div>
        <input
          type="hidden"
          name={name}
          value={lbs + ozs / 16}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  }
);
export const AmtField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function AmtField(
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
    return (
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
          //defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
        <div className="grid pt-2 px-2 border border-black">{_amountType}</div>
      </div>
    );
  }
);

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
    console.log({ value, amountType });
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
          //defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          value={translatedValue}
          ref={ref}
        />
      </Label>
    );
  }
);
