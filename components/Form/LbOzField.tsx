import { forwardRef, useState } from "react";
import { AmountFieldProps, amountFieldStyles } from "./AmountField";
import clsx from "clsx";
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
    //console.log({ value, lbs, ozs });
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name: _name, value: _v } = e.currentTarget;
      const v = parseFloat(_v);
      let newValue = value;
      //console.log({ _name, v });
      if (_name === "lbs") {
        newValue = v + ozs / 16;
        setLbs(v);
      } else if (_name === "ozs") {
        newValue = lbs + v / 16;
        setOzs(v);
      }
      if (onChange) {
        //console.log({ name, newValue }, e.currentTarget);
        onChange({
          ...e,
          currentTarget: { ...e.currentTarget, name, value: newValue },
        });
      }
    };
    return (
      <div className={clsx("grid grid-cols-2 gap-3", className)}>
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
