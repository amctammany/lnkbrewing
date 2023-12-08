import { ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const RedoIcon = ({ variant, size, className }: IconProps) => (
  <ArrowRightIcon className={clsx(iconStyles({ variant, size }), className)} />
);
