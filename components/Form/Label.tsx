import { VariantProps, cva } from "class-variance-authority";

export type LabelProps = {
  children?: React.ReactNode;
  label?: string;
} & VariantProps<typeof labelStyles>;
const labelStyles = cva(["block"], {
  variants: {
    variant: {
      default: [],
    },
    size: {
      default: ["mb-4"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});
const labelLabelStyles = cva(["block"], {
  variants: {
    variant: {
      default: ["text-gray-600", "capitalize"],
    },
    size: {
      default: ["block"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const Label = ({ children, label, variant, size }: LabelProps) => {
  return (
    <label className={labelStyles({ variant, size })}>
      <span className={labelLabelStyles({ variant, size })}>{label}</span>
      {children}
    </label>
  );
};
