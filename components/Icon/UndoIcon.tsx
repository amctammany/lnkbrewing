import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const UndoIcon = ({ variant, size, className }: IconProps) => (
  <ArrowLeftIcon className={clsx(iconStyles({ variant, size }), className)} />
);
