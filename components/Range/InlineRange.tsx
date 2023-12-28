import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";

export type InlineRangeProps = {
  label?: string;
  precision?: number;
  range: [number | null, number | null];
  value?: number | null;
  className?: string;
} & VariantProps<typeof inlineRangeStyles>;
const labelStyles = cva("uppercase underline mr-2", {
  variants: {
    variant: {
      default: [""],
      warning: ["text-contrast-primary"],
    },
    size: {
      default: ["text-lg"],
      small: ["text-sm"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
const valueStyles = cva("absolute grid  text-center text-sm mt-5", {
  variants: {
    type: {
      above: [" text-right"],
      below: ["text-left"],
      default: ["text-center"],
    },
    variant: {
      default: [""],
      warning: ["bg-warning-300"],
    },
    size: {
      default: [""],
      small: ["text-sm"],
    },
  },
  defaultVariants: {
    type: "default",
    variant: "default",
    size: "default",
  },
});

const rangeValueStyles = cva(
  "absolute top-0 bottom-0 text-center block h-full bg-purple-300 border-l-2 border-black border-r-2",
  {
    variants: {
      type: {
        above: ["left-"],
        below: [""],
        default: ["text-center"],
      },
      variant: {
        default: [""],
        warning: ["bg-warning-300"],
      },
      size: {
        default: [""],
        small: ["text-sm"],
      },
    },
    defaultVariants: {
      type: "default",
      variant: "default",
      size: "default",
    },
  }
);

const inlineRangeStyles = cva("flex px-2", {
  variants: {
    variant: {
      default: [""],
      warning: ["bg-warning-300"],
    },
    size: {
      default: [""],
      small: ["text-sm"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
enum RangeType {
  Above = "above",
  Below = "below",
  Default = "default",
}
export function InlineRange({
  label,
  className,
  precision,
  variant,
  size,
  range,
  value: _value,
}: InlineRangeProps) {
  const value = _value ?? 0;
  const sMin = Math.min(range[0]!, value);
  const sMax = Math.max(range[1]!, value);
  const scaleX = sMax - sMin;
  const width = (100 * (range[1]! - range[0]!)) / scaleX;
  const left = (100 * (range[0]! - sMin)) / scaleX;
  const valLeft =
    value < range[0]! ? 0 : value > range[1]! ? 100 : (100 * value) / scaleX;
  const type =
    value < range[0]!
      ? RangeType.Below
      : value > range[1]!
      ? RangeType.Above
      : RangeType.Default;
  return (
    <div className={clsx(inlineRangeStyles({ variant, size }), className)}>
      <h4 className={labelStyles({ variant, size })}>{label}</h4>
      <div className="w-[100%] h-6 block m-auto relative">
        <div
          style={{
            display: value !== undefined ? "block" : "none",
            width: 1,
            zIndex: 1,
            left: `${valLeft}%`,
          }}
          className={rangeValueStyles({ variant, size, type })}
        ></div>
        <div
          style={{
            zIndex: 1,
            left: `${valLeft - 0}%`,
          }}
          className={valueStyles({ variant, size, type })}
        >
          {value?.toPrecision(precision ?? 2)}
        </div>
        <div
          style={{ width: `${width}%`, left: `${left}%` }}
          className="absolute top-0 bottom-0 block h-full bg-purple-300 border-l-2 border-black border-r-2 mx-3"
        >
          <div className="absolute flex w-full my-3 h-full">
            <div className="absolute block -top-1/2 left-0 w-full ">
              <span className="absolute left-1 text-xs">{range?.[0]}</span>
              <span className="absolute right-1 text-xs">{range?.[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
