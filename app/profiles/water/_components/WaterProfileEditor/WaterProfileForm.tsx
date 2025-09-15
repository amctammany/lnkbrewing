"use client";
import TextInput from "@/components/Form/TextInput";
import { Form } from "@/components/ui/form";
import { WaterProfile } from "@prisma/client";
import React, { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";
export type WaterProfileFormContainerProps<S = unknown> = {
  profile: WaterProfile;
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
    <>
      <input type="hidden" {...register("id")} />
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Description" {...register("description")} />
      <TextInput
        step=".01"
        type="number"
        label="Calcium"
        {...register("calcium")}
      />{" "}
      <TextInput
        step=".01"
        type="number"
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
    </>
  );
}
