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
      default: [],
      inline: ["inline-block"],
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
            <FormLabel className="block my-auto justify-center items-center ">
              {label ?? name}
            </FormLabel>
            <FormControl className="glex mx-4 p-1">
              <div className="flex x-4 p-1">
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="w-full" placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(options).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
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
