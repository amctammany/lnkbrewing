import { cva, cx, VariantProps } from "class-variance-authority";
const propStyles = cva("[&_span]:my-auto ", {
  variants: {
    variant: {
      default: "block md:*:block align-tex-bottom  py-2 [&_span]:leading-",
      inline: "flex *:block py-1",
      grid: "grid grid-cols-2 justify-center items-center *:block *:first:text-right",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type PropProps = {
  label: string | React.ReactNode;
  value?: string | number | null | React.ReactNode;
  unit?: string | React.ReactNode;
  children?: string | number | null | React.ReactNode;
} & VariantProps<typeof propStyles>;

export const Prop = ({ label, value, unit, children, variant }: PropProps) => {
  return (
    <div className={propStyles({ variant })}>
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
