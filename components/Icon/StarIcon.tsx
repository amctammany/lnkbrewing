import { StarIcon as Star } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const StarIcon = ({ variant, size, className }: IconProps) => (
  <Star className={clsx(iconStyles({ variant, size }), className)} />
);
export const SolidStarIcon = ({ variant, size, className }: IconProps) => (
  <StarSolid className={clsx(iconStyles({ variant, size }), className)} />
);
