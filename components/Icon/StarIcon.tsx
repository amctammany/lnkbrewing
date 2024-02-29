import { StarIcon as Star } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const StarIcon = ({ variant, size, className }: IconProps) => (
  <Star className={clsx(iconStyles({ variant, size }), className)} />
);
