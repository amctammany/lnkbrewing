import { ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const RedoIcon = ({ variant, size, className }: IconProps) => (
  <ArrowRightIcon className={clsx(iconStyles({ variant, size }), className)} />
);
