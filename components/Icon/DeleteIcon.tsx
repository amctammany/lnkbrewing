import { TrashIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from ".";

export const DeleteIcon = ({ variant, size, className }: IconProps) => (
  <TrashIcon className={clsx(iconStyles({ variant, size }), className)} />
);
