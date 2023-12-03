import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

export type LabelProps = {
  children?: React.ReactNode;
  label?: string;
} & VariantProps<typeof labelStyles> &
  ComponentProps<"label">;
const labelStyles = cva(["block"], {
  variants: {
    variant: {
      default: [],
    },
    size: {
      default: ["mb-4"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});
const labelLabelStyles = cva(["block"], {
  variants: {
    variant: {
      default: ["text-gray-600", "capitalize"],
    },
    size: {
      default: ["block"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const Label = ({
  children,
  label,
  variant,
  size,
  className,
}: LabelProps) => {
  return (
    <label className={clsx(labelStyles({ variant, size }), className)}>
      <span className={labelLabelStyles({ variant, size })}>{label}</span>
      {children}
    </label>
  );
};
