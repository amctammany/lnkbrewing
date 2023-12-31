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
  ComponentProps<"div"> & {
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
  onClick,
  secondaryAction,
}: ListItemProps) => {
  const cn = clsx(listItemStyles({ variant }), className);
  const child = href ? (
    <Link
      //{...props}
      href={href || ""}
      scroll={scroll ?? false}
      className={cn}
    >
      {children}
    </Link>
  ) : (
    <div onClick={onClick} className={cn}>
      {children}
    </div>
  );

  return (
    <li className="group relative flex flex-col">
      {child}
      <div className="absolute right-1 top-1/2 -translate-y-1/2">
        {secondaryAction}
      </div>
    </li>
  );
};
