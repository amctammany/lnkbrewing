import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemTextStyles = cva(["flex-auto grid px-2"], {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ListItemTextProps = VariantProps<typeof listItemTextStyles> &
  ComponentProps<"div"> & {
    primary?: string;
    secondary?: string;
    children?: React.ReactNode;
  };
export const ListItemText = ({
  children,
  primary,
  secondary,
  variant,
  className,
}: ListItemTextProps) => {
  return (
    <div className={clsx(listItemTextStyles({ variant }), className)}>
      <div className="text-lg">{primary || children}</div>
      <div className="text-xs">{secondary}</div>
    </div>
  );
};
