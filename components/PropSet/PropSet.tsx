import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

export type PropSetProps = {
  label?: string;
  value?: string | number | null;
} & VariantProps<typeof propSetStyle> &
  ComponentProps<"fieldset">;
const propSetStyle = cva("", {
  variants: {
    variant: {
      default: ["border-black"],
      warning: ["border-red-500"],
    },
    size: {
      default: ["border-2"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export const PropSet = ({
  label,
  value,
  className,
  variant,
  size,
}: PropSetProps) => {
  return (
    <fieldset className={clsx(propSetStyle({ variant, size }), className)}>
      <legend className="ml-4 px-2">{label}</legend>
      <div className="px-2 pb-2 text-center justify-center">{value}</div>
    </fieldset>
  );
};
