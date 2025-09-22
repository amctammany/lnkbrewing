import { cn } from "@/lib/utils";
import { cva, cx, VariantProps } from "class-variance-authority";
import React from "react";

const badgePropStyles = cva("inline-flex px-2 py-1 border gap-2", {
  variants: {
    variant: {
      default: [""],
      outlined: [""],
    },
    size: {
      default: [""],
      lg: [""],
      sm: [""],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export type BadgePropProps = {
  Icon: any;
  value?: any;
  children?: any;
  className?: string;
} & VariantProps<typeof badgePropStyles>;

export default function BadgeProp({
  Icon,
  className,
  value,
  variant,
  size,
  children,
}: BadgePropProps) {
  const val = value ?? children;
  return (
    <div className={cn(badgePropStyles({ variant, size }), className)}>
      <Icon width="8" height="8" className="w-5 h-5" />
      <span>{val}</span>
    </div>
  );
}
