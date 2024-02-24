import { ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const UpIcon = ({ variant, size, className }: IconProps) => (
  <ArrowUpIcon className={clsx(iconStyles({ variant, size }), className)} />
);
