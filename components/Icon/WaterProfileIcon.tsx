import { ChartBarSquareIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from ".";

export const WaterProfileIcon = ({ variant, size, className }: IconProps) => (
  <ChartBarSquareIcon
    className={clsx(iconStyles({ variant, size }), className)}
  />
);
