import React, { ComponentProps } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cx, cva, VariantProps } from "class-variance-authority";
import { Slider } from "../ui/slider";

const rangeFieldStyles = cva("", {
  variants: {
    variant: {
      default: "",
      inline: "flex",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const rangeFieldLabelStyles = cva("", {
  variants: {
    variant: {
      default: "",
      inline: "flex",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const rangeFieldControlStyles = cva("", {
  variants: {
    variant: {
      default: "",
      inline: "flex-grow",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export default function RangeField<T extends FieldValues>({
  control,
  low,
  name,
  high,
  median,
  label,
  type = "string",
  placeholder,
  description,
  unit,
  variant,
  min = 0,
  max = 100,
  className = "",
  ...props
}: {
  className?: string;
  control?: Control<T>;
  type?: any;
  name: FieldPath<T>;
  low: FieldPath<T>;
  high: FieldPath<T>;
  median: FieldPath<T>;
  min?: number;
  max?: number;
  unit?: string | React.ReactNode;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string;
} & ComponentProps<"input"> &
  VariantProps<typeof rangeFieldStyles>) {
  const { register } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cx(rangeFieldStyles({ variant }), className)}>
            <FormLabel className={rangeFieldLabelStyles({ variant })}>
              {label ?? name}
            </FormLabel>
            <FormControl className={rangeFieldControlStyles({ variant })}>
              <div className="">
                <div className="flex">
                  <input
                    className="ring rounded text-center w-8"
                    type="number"
                    value={field.value[0]}
                    {...register(low)}
                  />

                  <Slider
                    className="flex-grow mx-2"
                    min={min}
                    max={max}
                    value={field.value}
                    ref={field.ref}
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                  />

                  <input
                    className="ring rounded text-center w-8"
                    type="number"
                    value={field.value[2]}
                    {...register(high)}
                  />
                </div>
                <div className="w-full flex">
                  <div className="w-8"></div>
                  <div className="w-full relative">
                    <input
                      className="block absolute ring rounded text-center w-8 mx-2"
                      type="number"
                      value={field.value[1]}
                      style={{
                        marginLeft: `calc(${
                          (field.value[1] * 100) / max
                        }%  - 0px)`,
                      }}
                      {...register(median)}
                    />
                  </div>
                  <div className="w-8 h-8"></div>
                </div>
              </div>
            </FormControl>
          </div>
          <FormDescription className={description ? "" : "hidden"}>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
