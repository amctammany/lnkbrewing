import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemStyles = cva(["flex px-2 pb-1 items-center"], {
  variants: {
    variant: {
      default: ["group-hover:bg-red-500/10"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ListItemProps = VariantProps<typeof listItemStyles> &
  ComponentProps<"li"> & {
    children?: React.ReactNode;
  };
export const ListItem = ({ children, variant, className }: ListItemProps) => {
  return (
    <li className="group">
      <div className={clsx(listItemStyles({ variant }), className)}>
        {children}
      </div>
    </li>
  );
};
