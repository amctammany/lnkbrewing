import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const fieldValueStyles = cva(" text-center ", {
  variants: {
    variant: {
      default: ["border-r-4"],
      child: ["border-b-2"],
    },
    padding: {
      default: ["py-2"],
      none: ["py-1"],
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});
export type FieldValueProps = VariantProps<typeof fieldValueStyles> &
  ComponentProps<"div"> & { value: unknown };
export function FieldValue({
  value,
  variant,
  padding,
  className,
}: FieldValueProps) {
  if (Array.isArray(value))
    return (
      <ul className="border-r-4 px-4">
        {value.map((v, i) => (
          <li key={i}>
            <FieldValue variant="child" padding="none" value={v} />
          </li>
        ))}
      </ul>
    );
  return (
    <div className={clsx(fieldValueStyles({ variant, padding }), className)}>
      {(value || "-") as string}
    </div>
  );
}
export default FieldValue;
