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
const rangeFieldLabelStyles = cva(
  "block px-1 m-auto whitespace-nowrap justify-center items-center leading-6",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
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
              <div className="flex-grow w-full">
                <div className="flex">
                  <input
                    className="ring rounded text-center w-8"
                    type="number"
                    value={field.value[0] ?? 0}
                    {...register(low)}
                  />
                  <div className="flex-grow flex w-full relative mx-2 pt-4">
                    <span className="font-bold block absolute left-1 -top-2 text-center">
                      {min}
                    </span>
                    <Slider
                      className="flex-grow mx-2 py-2 border-r-2 border-l-2 border-black"
                      min={min}
                      max={max}
                      value={field.value}
                      ref={field.ref}
                      onValueChange={(v) => {
                        field.onChange(v);
                      }}
                    />

                    <span className="font-bold block absolute -top-2 right-0 text-center ">
                      {max}
                    </span>
                  </div>
                  <input
                    className="ring rounded text-center w-8"
                    type="number"
                    value={field.value[2] ?? 0}
                    {...register(high)}
                  />
                </div>
                <div className="w-full flex">
                  <div className="w-8"></div>
                  <div className="w-full relative">
                    <input
                      className="block absolute ring rounded text-center w-8 mx-2"
                      type="number"
                      value={field.value[1] ?? 0}
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
