import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UserPressurePreference } from "@prisma/client";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { cva, VariantProps } from "class-variance-authority";
export type SelectInputProps<T extends FieldValues> = {
  className?: string;
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string | React.ReactNode;
  placeholder?: string;
  options: Record<string, string>;
  description?: string;
} & VariantProps<typeof selectStyles>;
const selectStyles = cva("w-full [&_button]:w-full", {
  variants: {
    variant: {
      default: "flex",
      grid: "grid grid-flow-col grid-cols-2 tems-center w-full ustify-center",
      inline: "flex *:first:flex-grow",
    },
    inputSize: {
      default: ["w-ful ontent-center"],
      full: ["w-full"],
      small: [""],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});
export default function SelectInput<T extends FieldValues>({
  className,
  control,
  name,
  label,
  placeholder,
  options,
  variant,
  inputSize,
  description,
}: SelectInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={selectStyles({ variant, inputSize })}>
            <FormLabel className="m-auto  leading-0 block whitespace-nowrap justify-center items-center ">
              {label ?? name}
            </FormLabel>
            <Select
              name={field.name}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="m-auto " aria-label={field.value}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(options).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    <div className="flex-grow text-center">{value}</div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
