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
export type SelectInputProps<T extends FieldValues> = {
  className?: string;
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string | React.ReactNode;
  placeholder?: string;
  options: Record<string, string>;
  description?: string;
};
export default function SelectInput<T extends FieldValues>({
  className,
  control,
  name,
  label,
  placeholder,
  options,
  description,
}: SelectInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className=" grid grid-flow-col grid-cols-2 items-cnter lex gap-">
            <FormLabel className="block my-auto justify-center items-center w-full text-right">
              {label ?? name}
            </FormLabel>
            <div className="flex w-full  flex-grow border-box mx-4 p-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full flex-grow">
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(options).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
