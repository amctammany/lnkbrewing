import { PencilIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const MashProfileIcon = ({ variant, size, className }: IconProps) => (
  <PencilIcon className={clsx(iconStyles({ variant, size }), className)} />
);
