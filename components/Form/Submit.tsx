import { VariantProps, cva } from "class-variance-authority";

export type SubmitProps = {
  children: React.ReactNode;
} & VariantProps<typeof submitStyles>;
const submitStyles = cva("input", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
        "text-white",
        "bg-blue-700",
        "hover:bg-blue-800",
        "focus:ring-4",
        "focus:outline-none",
        "focuse-ring-blue-300",
        "text-center",
        "dark:bg-blue-600",
        "dark:hover:bg-blue-700",
        "dark:focus:ring-blue-800",
      ],
    },
    size: {
      default: ["w-full", "text-sm", "px-5", "py-2.5"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const Submit = ({ children, variant, size }: SubmitProps) => {
  return (
    <button type="submit" className={submitStyles({ variant, size })}>
      {children}
    </button>
  );
};
