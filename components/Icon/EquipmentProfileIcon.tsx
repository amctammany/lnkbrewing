import { EyeDropperIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from ".";

export const EquipmentProfileIcon = ({
  variant,
  size,
  className,
}: IconProps) => (
  <EyeDropperIcon className={clsx(iconStyles({ variant, size }), className)} />
);
