import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemIconStyles = cva(
  ["flex items-center text-center text-bold justify-center  "],
  {
    variants: {
      variant: {
        default: [],
        icon: ["rounded-full w-12 h-12 p-1 border-2 border-black"], // "w-12", "h-12", "p-1.5"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export type ListItemIconProps = VariantProps<typeof listItemIconStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode;
  };
export const ListItemIcon = ({
  children,
  variant,
  className,
}: ListItemIconProps) => {
  return (
    <div className={clsx(listItemIconStyles({ variant }), className)}>
      <div className="my-auto">{children}</div>
    </div>
  );
};