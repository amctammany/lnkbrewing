import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

export type ListProps = VariantProps<typeof listStyles> &
  ComponentProps<"ul"> & {
    children?: React.ReactNode;
  };
const listStyles = cva(["w-full"], {
  variants: {
    variant: {
      default: ["bg-white"],
      warning: ["bg-warning-500"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const List = ({ children, variant }: ListProps) => {
  return (
    <div className={listStyles({ variant })}>
      <ul className="">{children}</ul>
    </div>
  );
};
