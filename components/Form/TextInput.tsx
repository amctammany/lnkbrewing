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
  className = "",
  ...props
}: {
  className?: string;
  control?: Control<T>;
  type?: any;
  name: FieldPath<T>;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string;
} & ComponentProps<"input">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={clsx("flex", className)}>
          <FormLabel>{label ?? name}</FormLabel>
          <FormControl className="flex-grow">
            <div className=" flex px-4">
              <Input
                className="flex-grow"
                type={type}
                placeholder={placeholder}
                {...props}
                {...field}
              />
              <span>ppm</span>
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
