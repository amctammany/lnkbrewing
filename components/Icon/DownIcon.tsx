import { ArrowDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const DownIcon = ({ variant, size, className }: IconProps) => (
  <ArrowDownIcon className={clsx(iconStyles({ variant, size }), className)} />
);
