import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ComponentProps } from "react";
/**
import {
  BackwardIcon,
  ForwardIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

*/

export type IconProps = ComponentProps<"div"> & VariantProps<typeof iconStyles>;
export const iconStyles = cva("", {
  variants: {
    variant: {
      default: [""],
      white: ["text-white"],
    },
    size: {
      default: ["w-6 h-6 p-0"],
      medium: ["w-5 h-5 p-0"],
      small: ["w-4 h-4 p-0"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export function Icon({ variant, size, className, children }: IconProps) {
  return (
    <div className={clsx(iconStyles({ variant, size }), className)}>
      {children}
    </div>
  );
}
export default Icon;
