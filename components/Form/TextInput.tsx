import React from "react";
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
  placeholder,
  description,
  className = "",
}: {
  className?: string;
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={clsx("flex", className)}>
          <FormLabel>{label ?? name}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
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
