import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const CloseIcon = ({ variant, size, className }: IconProps) => (
  <XMarkIcon className={clsx(iconStyles({ variant, size }), className)} />
);
