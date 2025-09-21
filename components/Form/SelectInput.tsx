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
const selectStyles = cva("w-fll", {
  variants: {
    variant: {
      default: ["flex"],
      inline: ["flex"],
      grid: ["grid grid-cols-2 items-center justify-content"],
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
            <FormLabel className="block  whitespace-nowrap justify-center items-center ">
              {label ?? name}
            </FormLabel>
            <FormControl>
              <div className="flex w-full flex-grow p-1 ">
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="flex-grow w-full flex ">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(options).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        <div className="flex-grow text-center">{value}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
