import { TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const DeleteIcon = ({ variant, size, className }: IconProps) => (
  <TrashIcon className={clsx(iconStyles({ variant, size }), className)} />
);
