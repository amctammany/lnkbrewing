import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ComponentProps } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

const IconMap = {
  edit: PencilIcon,
};

export type IconProps = ComponentProps<"div"> &
  VariantProps<typeof iconStyles> & { icon: keyof typeof IconMap };
const iconStyles = cva("", {
  variants: {
    variant: {
      default: [""],
    },
    size: {
      default: ["w-6 h-6 p-0"],
      small: ["w-3 h-3 p-0"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export function Icon({ variant, size, className, icon }: IconProps) {
  const IconComp = IconMap[icon];
  return (
    <IconComp className={clsx(iconStyles({ variant, size }), className)} />
  );
}
export default Icon;
