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
import { InlineInput } from "./InlineInput";
import { ArrowDownToDotIcon, PoundSterlingIcon } from "lucide-react";

const inlineFieldStyles = cva("", {
  variants: {
    variant: {
      default: "flex items-center justify-center",
      inline: "flx",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export default function InlineField<T extends FieldValues>({
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
  VariantProps<typeof inlineFieldStyles>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cx(inlineFieldStyles({ variant }), className)}>
            <FormLabel>{label ?? name}</FormLabel>
            <FormControl>
              <div className="flex border-box mx-4 p-1">
                <InlineInput
                  className="flex-grow bg-white"
                  prepend={ArrowDownToDotIcon}
                  append={PoundSterlingIcon}
                  type={type}
                  placeholder={placeholder}
                  {...props}
                  {...field}
                />
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
