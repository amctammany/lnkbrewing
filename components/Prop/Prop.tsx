import { cva, cx, VariantProps } from "class-variance-authority";
import { Chocolate_Classical_Sans } from "next/font/google";
const propStyles = cva("[&_span]:my-auto ", {
  variants: {
    variant: {
      default:
        "block md:*:inline-flex md:*:w-full align-text-bottom  py-2 [&_span]:leading-",
      inline: "flex *:block py-1",
      grid: "grid grid-cols-2 justify-center items-center *:inline-flex *:first:text-right",
    },
  },
  defaultVariants: {
    variant: "grid",
  },
});

export type PropProps = {
  label: string | React.ReactNode;
  value?: string | number | null | React.ReactNode;
  unit?: string | React.ReactNode;
  className?: string;
  children?: string | number | null | React.ReactNode;
} & VariantProps<typeof propStyles>;

export const Prop = ({
  label,
  value,
  unit,
  children,
  className,
  variant,
}: PropProps) => {
  return (
    <div className={cx(propStyles({ variant }), className)}>
      <span className="font-mono font-bold text-gray-700 px-2 shrink min-w-32">
        {label}:
      </span>
      <span className="px-2 font-mono grow border-b-2 text-center">
        {children ?? value}
        <span className={cx("pl-1", value === undefined && "hidden")}>
          {unit}
        </span>
      </span>
    </div>
  );
};
