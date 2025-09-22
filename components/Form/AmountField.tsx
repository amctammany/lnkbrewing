"use client";
import React, { ComponentProps, useContext } from "react";
import { useSession } from "next-auth/react";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { cx, cva, VariantProps } from "class-variance-authority";
import { InlineInput } from "./InlineInput";
import { BASE_UNITS, UnitTypes } from "@/lib/Converter/UnitDict";
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext";

const amountFieldStyles = cva("", {
  variants: {
    variant: {
      default: "",
      inline: "flex",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const amountFieldLabelStyles = cva(
  "block px-1 m-auto whitespace-nowrap justify-center items-center leading-6",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const amountFieldControlStyles = cva("", {
  variants: {
    variant: {
      default: "",
      inline: "flex-grow",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export default function AmountField<T extends FieldValues>({
  name,
  label,
  type = "string",
  amountType,
  placeholder,
  description,
  unit,
  variant,
  min = 0,
  max = 100,
  className = "",
  ...props
}: {
  className?: string;
  control?: Control<T>;
  type?: any;
  name: FieldPath<T>;
  //   low: FieldPath<T>;
  //   high: FieldPath<T>;
  //   median: FieldPath<T>;
  amountType: UnitTypes;
  min?: number;
  max?: number;
  unit?: string | React.ReactNode;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string;
} & ComponentProps<"input"> &
  VariantProps<typeof amountFieldStyles>) {
  const { register, control } = useFormContext();
  const prefs = useContext(UserPreferencesContext);
  const defUnit = BASE_UNITS[amountType];
  console.log({ prefs, defUnit, baseUnit: prefs?.[amountType] ?? defUnit });
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cx(amountFieldStyles({ variant }), className)}>
            <FormLabel className={amountFieldLabelStyles({ variant })}>
              {label ?? name}
            </FormLabel>
            <FormControl className={amountFieldControlStyles({ variant })}>
              <div className="flex-grow w-full">
                <div className="flex flex-grow p-1">
                  <InlineInput
                    className="flex-grow text-center  bg-white"
                    type="number"
                    placeholder={placeholder}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    value={field.value === null ? "" : field.value}
                  />
                  <input
                    type="hidden"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                  />
                </div>
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
