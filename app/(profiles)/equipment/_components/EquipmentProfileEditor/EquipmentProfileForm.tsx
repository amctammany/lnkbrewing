"use client";
import AmountField from "@/components/Form/AmountField";
import InlineField from "@/components/Form/InlineField";
import { InlineInput } from "@/components/Form/InlineInput";
import TextInput from "@/components/Form/TextInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext";
import { OptionalNullable } from "@/lib/utils";
import { EquipmentProfileType } from "@/types/Profile";
import { EquipmentProfile, UserPreferences } from "@prisma/client";
import React, { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";
export type EquipmentProfileFormContainerProps<S = unknown> = {
  profile: EquipmentProfileType;
  preferences: Partial<UserPreferences>;
  action: (state: S, formData: FormData) => Promise<S> | S;
  children?: React.ReactNode | React.ReactNode[];
};
export function EquipmentProfileFormContainer({
  action,
  profile,
  preferences,
  children,
}: EquipmentProfileFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm({ defaultValues: profile, errors: state?.errors });
  return (
    <UserPreferencesContext value={preferences}>
      <Form {...form}>
        <form action={formAction}>{children}</form>
      </Form>
    </UserPreferencesContext>
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
      <div className="grid lg:grid-cols-3 gap-2">
        <Card className="grid">
          <CardHeader>
            <CardTitle>Volumes</CardTitle>
          </CardHeader>
          <CardContent>
            <InlineField
              control={control}
              name="boilTime"
              type="number"
              step={1}
              label="Boil Time "
            />
            <AmountField
              name="batchVolume"
              type="number"
              amountType="volume"
              step={1}
              label="Batch Volume"
            />
            <InlineField
              control={control}
              name="boilOffRate"
              type="number"
              step={1}
              label="Boil Off Rate"
            />

            <AmountField
              amountType="volume"
              name="mashLoss"
              type="number"
              step={1}
              label="Mash Loss"
            />

            <AmountField
              amountType="volume"
              name="fermenterLoss"
              type="number"
              step={1}
              label="Fermenter Loss"
            />
            <AmountField
              amountType="volume"
              name="trubLoss"
              type="number"
              step={1}
              label="Trub Loss"
            />
          </CardContent>
        </Card>
        <Card className="grid">
          <CardHeader>
            <CardTitle>Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            {" "}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
