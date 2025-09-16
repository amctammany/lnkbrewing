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
import clsx from "clsx";

export default function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "string",
  placeholder,
  description,
  unit,
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
} & ComponentProps<"input">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={clsx("flex cap", className)}>
          <FormLabel>{label ?? name}</FormLabel>
          <FormControl className="flex-grow">
            <div className="flex mx-4 p-1">
              <Input
                className="flex-grow bg-white"
                type={type}
                placeholder={placeholder}
                {...props}
                {...field}
              />
              <div className="grid m-2 bg-slate-500 text-white">
                <span className="m-auto">{unit}</span>
              </div>
            </div>
          </FormControl>
          <FormDescription className={description ? "" : "hidden"}>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
