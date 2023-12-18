import Yeast from "./svgr/Yeast";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const YeastIcon = ({ variant, size, className }: IconProps) => (
  <Yeast
    color="red"
    className={clsx(iconStyles({ variant, size }), className)}
  />
);
