"use client";
import InlineField from "@/components/Form/InlineField";
import { InlineInput } from "@/components/Form/InlineInput";
import TextInput from "@/components/Form/TextInput";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { EquipmentProfileType } from "@/types/Profile";
import { EquipmentProfile } from "@prisma/client";
import React, { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";
export type EquipmentProfileFormContainerProps<S = unknown> = {
  profile: EquipmentProfileType;
  action: (state: S, formData: FormData) => Promise<S> | S;
  children?: React.ReactNode | React.ReactNode[];
};
export function EquipmentProfileFormContainer({
  action,
  profile,
  children,
}: EquipmentProfileFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm({ defaultValues: profile, errors: state?.errors });
  return (
    <Form {...form}>
      <form action={formAction}>{children}</form>
    </Form>
  );
}
export function EquipmentProfileForm() {
  const { register, control } = useFormContext<EquipmentProfileType>();
  return (
    <div className="m-2 rounded border-2 p-2 gap-2 *:mb-2">
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("forkedFrom")} />
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Description" {...register("description")} />
      <div>
        <InlineField
          control={control}
          name="boilTime"
          type="number"
          step={1}
          label="Boil Time "
        />
        <InlineField
          control={control}
          name="mashEfficiency"
          type="number"
          step={1}
          label="Mash Efficiency "
        />
        <InlineField
          control={control}
          name="brewEfficiency"
          type="number"
          step={1}
          label="Brew Efficiency "
        />
        <InlineField
          control={control}
          name="batchVolume"
          type="number"
          step={1}
          label="Batch Volume"
        />
        <InlineField
          control={control}
          name="fermenterLoss"
          type="number"
          step={1}
          label="Fermenter Loss"
        />
      </div>
    </div>
  );
}
