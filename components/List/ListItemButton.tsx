import Link from "next/link";
//import { ListItem, ListItemProps } from "./ListItem";

//export type ListItemButtonProps = ListItemProps & {
//href: string;
//};
//export const ListItemButton = ({
//href,
//children,
//...props
//}: ListItemButtonProps) => {
//return (
//<ListItem {...props}>
//<Link href={href}>{children}</Link>
//</ListItem>
//);
//};
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemButtonStyles = cva(["flex px-2 pb-1 items-center"], {
  variants: {
    variant: {
      default: ["group-hover:bg-red-500/10"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ListItemButtonProps = VariantProps<typeof listItemButtonStyles> &
  ComponentProps<"li"> & {
    children?: React.ReactNode;
    href?: string;
    scroll?: boolean;
    secondaryAction?: any;
  };
export const ListItemButton = ({
  children,
  variant,
  className,
  secondaryAction,
  href,
  scroll,
}: ListItemButtonProps) => {
  return (
    <li className="group relative flex flex-col">
      <Link
        href={href || ""}
        scroll={scroll || false}
        className={clsx(listItemButtonStyles({ variant }), className)}
      >
        {children}
      </Link>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        {secondaryAction}
      </div>
    </li>
  );
};
