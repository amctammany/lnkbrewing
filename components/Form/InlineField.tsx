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
      default:
        "grid grid-flow-col grid-cols-2 tems-center w-full ustify-center",
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
  PrependIcon,
  AppendIcon,
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
  PrependIcon?: any;
  AppendIcon?: any;
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
            <FormLabel className="block my-auto justify-center items-center w-full text-right">
              {label ?? name}
            </FormLabel>
            <FormControl>
              <div className="flex w-full  flex-grow border-box mx-4 p-1">
                <InlineInput
                  className="flex-grow bg-white"
                  prepend={PrependIcon}
                  append={AppendIcon}
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
