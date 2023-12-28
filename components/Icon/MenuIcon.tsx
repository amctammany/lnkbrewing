import { Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const MenuIcon = ({ variant, size, className }: IconProps) => (
  <Bars3Icon className={clsx(iconStyles({ variant, size }), className)} />
);
