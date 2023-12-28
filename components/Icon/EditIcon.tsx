import { PencilIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const EditIcon = ({ variant, size, className }: IconProps) => (
  <PencilIcon className={clsx(iconStyles({ variant, size }), className)} />
);
