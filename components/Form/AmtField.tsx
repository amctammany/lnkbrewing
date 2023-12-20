import { forwardRef } from "react";
import { AmountFieldProps, amountFieldStyles } from "./AmountField";
import clsx from "clsx";

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
      <div className={clsx("grid grid-cols-2 gap-3", className)}>
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
