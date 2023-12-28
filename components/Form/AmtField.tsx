import { forwardRef } from "react";
import { AmountFieldProps, amountFieldStyles } from "./AmountField";
import clsx from "clsx";

const AmountType = ({
  type,
  options,
}: {
  options?: [k: string, v: any][];
  type: any;
}) => {
  if (options?.length == 0) {
    return <div className="grid pt-2 px-2 border border-black">{type}</div>;
  }
  return type ? (
    <select value={type}>
      {options?.map(([k, v]) => (
        <option key={k} value={v}>
          {k}
        </option>
      ))}
    </select>
  ) : (
    <div className="grid pt-2 px-2 border border-black">{type}</div>
  );
};
export const AmtField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function AmtField(
    {
      name,
      label,
      amountType: _amountType,
      amountTypes,
      options,
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
      children,
    }: AmountFieldProps,
    ref
  ) {
    return (
      <div className={clsx("flex", className)}>
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
        {children || <AmountType type={_amountType} options={options} />}
      </div>
    );
  }
);
