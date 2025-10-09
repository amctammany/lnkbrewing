import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UserGravityPreference } from "@prisma/client";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Link from "next/link";
import { cx, VariantProps } from "class-variance-authority";
import { inlineFieldStyles } from "./InputField";
export type RadioGroupInputProps<T extends FieldValues> = {
  className?: string;
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string | React.ReactNode;
  placeholder?: string;
  options: Record<string, string>;
  description?: string;
  onBlur?: any;
} & VariantProps<typeof inlineFieldStyles>;
export default function RadioGroupInput<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  description,
  onBlur,
  className = "",
  variant,
}: RadioGroupInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cx(inlineFieldStyles({ variant }), className)}>
          <FormLabel className="text-left">{label}</FormLabel>
          <FormControl className="mx-auto justify-items-center">
            <RadioGroup
              name={field.name}
              onValueChange={field.onChange}
              value={field.value}
              onChange={onBlur}
              className="flex gap-0 *:not-last:border-r-4 border-black rounded-lg border-2"
            >
              {Object.entries(options).map(([key, value]) => (
                <FormItem key={key} className="flex items-center gap-1">
                  <FormControl>
                    <Label className="px-4 py-2 cursor-pointer has-checked:bg-blue-500 has-checked:text-white">
                      <RadioGroupItem value={key} className="hidden peer" />
                      {value}
                    </Label>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
