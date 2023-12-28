import { DocumentIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const SaveIcon = ({ variant, size, className }: IconProps) => (
  <DocumentIcon className={clsx(iconStyles({ variant, size }), className)} />
);
