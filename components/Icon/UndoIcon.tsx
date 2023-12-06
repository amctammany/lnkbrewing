import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from ".";

export const UndoIcon = ({ variant, size, className }: IconProps) => (
  <ArrowLeftIcon className={clsx(iconStyles({ variant, size }), className)} />
);
