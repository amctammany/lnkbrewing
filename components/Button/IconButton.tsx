import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { cx, VariantProps } from "class-variance-authority";
import { LinkButton } from "./LinkButton";
import { LucideIcon } from "lucide-react";

export type IconButtonProps = {
  icon: LucideIcon;
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
  href,
  className,
  ...props
}: IconButtonProps) {
  return href ? (
    <LinkButton href={href} variant="outline" size={props.size} {...props}>
      <Icon size={props.size ?? "md"} />
      <span className={cx("hidden md:block")}>{label ?? children}</span>
    </LinkButton>
  ) : (
    <Button variant="outline" size={props.size} {...props}>
      <Icon size={props.size ?? "md"} />
      <span className={cx("hidden md:block")}>{label ?? children}</span>
    </Button>
  );
}
