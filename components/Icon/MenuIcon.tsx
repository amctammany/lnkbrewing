import { Bars3Icon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const MenuIcon = ({ variant, size, className }: IconProps) => (
  <Bars3Icon className={clsx(iconStyles({ variant, size }), className)} />
);
