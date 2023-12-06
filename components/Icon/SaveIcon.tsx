import { DocumentIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from ".";

export const SaveIcon = ({ variant, size, className }: IconProps) => (
  <DocumentIcon className={clsx(iconStyles({ variant, size }), className)} />
);
