import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { cx, VariantProps } from "class-variance-authority";

export type IconButtonProps = {
  icon?: any;
  href?: string;
  label?: any;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
export default function IconButton({
  icon: Icon,
  label,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button {...props}>
      <Icon />
      <span className={cx("hidden md:block")}>{label ?? children}</span>
    </Button>
  );
}
