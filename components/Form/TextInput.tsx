import React, { ComponentProps } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
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

const textInputStyles = cva("", {
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
const textInputLabelStyles = cva("", {
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
const textInputControlStyles = cva("", {
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
export default function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "string",
  placeholder,
  description,
  unit,
  variant,
  className = "",
  ...props
}: {
  className?: string;
  control?: Control<T>;
  type?: any;
  name: FieldPath<T>;
  unit?: string | React.ReactNode;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string;
} & ComponentProps<"input"> &
  VariantProps<typeof textInputStyles>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cx(textInputStyles({ variant }), className)}>
            <FormLabel className={textInputLabelStyles({ variant })}>
              {label ?? name}
            </FormLabel>
            <FormControl className={textInputControlStyles({ variant })}>
              <div className="flex p-1">
                <Input
                  className="flex-grow bg-white"
                  type={type}
                  placeholder={placeholder}
                  {...props}
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
                <div
                  className={`grid m-2 bg-slate-500 text-white ${
                    unit ? "" : "hidden"
                  }`}
                >
                  <span className="m-auto items-center">{unit}</span>
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
