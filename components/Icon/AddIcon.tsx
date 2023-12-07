import { PlusIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const AddIcon = ({ variant, size, className }: IconProps) => (
  <PlusIcon className={clsx(iconStyles({ variant, size }), className)} />
);
