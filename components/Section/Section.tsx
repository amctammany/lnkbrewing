import { VariantProps, cva } from "class-variance-authority";

const section = cva(["flex"], {
  variants: {
    variant: {
      primary: ["bg-slate-200"],
      warning: ["bg-red-200"],
      alert: ["bg-red-500"],
    },
    size: {
      small: ["te"],
      default: ["min-w-full"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const sectionHeader = cva("h4", {
  variants: {
    variant: {
      primary: ["border-red-300"],
      warning: ["text-white"],
      alert: ["text-white"],
    },
    size: {
      small: ["flex-grow", "m-0", "py-1", "px-2", "text-sm"],
      default: ["flex-grow", "m-1", "py-2", "px-4", "text-lg", "font-bold"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});
const sectionBody = cva(["bg-white"], {
  variants: {
    variant: {
      primary: ["border-red-300"],
      warning: [],
      alert: [],
    },
    size: {
      small: ["p-1", "shadow-sm", "text-sm"],
      default: ["flex-grow", "p-2", "shadow-lg", "text-lg"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface SectionProps extends VariantProps<typeof section> {
  header?: string;
  icon?: string;
  actions?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

export const Section = ({
  header,
  icon,
  actions,
  children,
  size,
  variant,
}: SectionProps) => {
  return (
    <div className="min-w-full ">
      <div className={section({ size, variant })}>
        <div className="flex-shrink">{icon}</div>
        <h4 className={sectionHeader({ size, variant })}>{header}</h4>
        <div>{actions}</div>
      </div>

      <div className={sectionBody({ size, variant })}>{children}</div>
    </div>
  );
};
