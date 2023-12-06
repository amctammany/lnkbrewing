"use client";
import { SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";

export type SelectProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;

  //onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref: any;
} & VariantProps<typeof selectStyles>;
const selectStyles = cva("input", {
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      name,
      label,
      children,
      options,
      disabled,
      defaultValue,
      value,
      onChange,
      onBlur,
      variant,
      size,
    }: SelectProps,
    ref
  ) {
    const opts = options
      ? Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))
      : children;
    return (
      <Label label={label === undefined ? name : label}>
        <select
          disabled={disabled}
          className={selectStyles({ size, variant })}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        >
          {opts}
        </select>
      </Label>
    );
  }
);
