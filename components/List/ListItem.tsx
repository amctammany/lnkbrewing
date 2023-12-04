import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
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
    href?: string;
    secondaryAction?: any;
    scroll?: boolean;
  };
export const ListItem = ({
  children,
  variant,
  className,
  scroll,
  href,
  secondaryAction,
}: ListItemProps) => {
  const Comp = href ? Link : "div";
  return (
    <li className="group relative flex flex-col">
      <Comp
        href={href || ""}
        scroll={scroll || false}
        className={clsx(listItemStyles({ variant }), className)}
      >
        {children}
      </Comp>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        {secondaryAction}
      </div>
    </li>
  );
};
