import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const SearchIcon = ({ variant, size, className }: IconProps) => (
  <MagnifyingGlassIcon
    className={clsx(iconStyles({ variant, size }), className)}
  />
);
