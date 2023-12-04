import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

const listItemStyles = cva(["flex px-2 py-1 items-center"], {
  variants: {
    variant: {
      default: ["group-hover:bg-primary-500/10"],
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
  const child = href ? (
    <Link
      //{...props}
      href={href || ""}
      scroll={scroll ?? false}
      className={clsx(listItemStyles({ variant }), className)}
    >
      {children}
    </Link>
  ) : (
    <div className={clsx(listItemStyles({ variant }), className)}>
      {children}
    </div>
  );

  return (
    <li className="group relative flex flex-col">
      {child}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {secondaryAction}
      </div>
    </li>
  );
};
