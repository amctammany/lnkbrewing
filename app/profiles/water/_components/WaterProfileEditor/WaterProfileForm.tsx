"use client";
import TextInput from "@/components/Form/TextInput";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { WaterProfileType } from "@/types/Profile";
import { WaterProfile } from "@prisma/client";
import React, { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";
export type WaterProfileFormContainerProps<S = unknown> = {
  profile: WaterProfileType;
  action: (state: S, formData: FormData) => Promise<S> | S;
  children?: React.ReactNode | React.ReactNode[];
};
export function WaterProfileFormContainer({
  action,
  profile,
  children,
}: WaterProfileFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm({ defaultValues: profile, errors: state?.errors });
  return (
    <Form {...form}>
      <form action={formAction}>{children}</form>
    </Form>
  );
}
export function WaterProfileForm() {
  const { register, control } = useFormContext<WaterProfile>();
  return (
    <div className="m-2 rounded border-2 p-2 gap-2 *:mb-2">
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("forkedFrom")} />
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Description" {...register("description")} />
      <div className="grid grid-cols-3 gap-2">
        <TextInput
          className="block"
          step=".01"
          type="number"
          label="Calcium"
          unit="PPM"
          description="ppm (0-250)"
          {...register("calcium")}
        />{" "}
        <TextInput
          step=".01"
          type="number"
          className="block"
          label="magnesium"
          {...register("magnesium")}
        />{" "}
        <TextInput
          step=".01"
          type="number"
          label="sulfate"
          {...register("sulfate")}
        />{" "}
        <TextInput
          step=".01"
          type="number"
          label="Sodium"
          {...register("sodium")}
        />{" "}
        <TextInput
          step=".01"
          type="number"
          label="Bicarbonate"
          {...register("bicarbonate")}
        />
        <TextInput
          step=".01"
          type="number"
          label="Chloride"
          {...register("chloride")}
        />
      </div>
    </div>
  );
}
