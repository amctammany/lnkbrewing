"use client";
import InlineField from "@/components/Form/InlineField";
import { InlineInput } from "@/components/Form/InlineInput";
import TextInput from "@/components/Form/TextInput";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { MashProfileType } from "@/types/Profile";
import { MashProfile, UserPreferences } from "@prisma/client";
import React, { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { MashProfileStepsForm } from "./MashProfileStepsForm";
import { SessionProvider } from "next-auth/react";
import {
  UserPreferencesContext,
  UserPreferencesType,
} from "@/contexts/UserPreferencesContext";
import AmountField from "@/components/Form/AmountField";
export type MashProfileFormContainerProps<S = unknown> = {
  profile: MashProfileType;
  action: (state: S, formData: FormData) => Promise<S> | S;
  preferences: Partial<UserPreferences>;
  children?: React.ReactNode | React.ReactNode[];
};
export function MashProfileFormContainer({
  action,
  profile,
  preferences,
  children,
}: MashProfileFormContainerProps) {
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
export function MashProfileForm({ profile }: { profile: MashProfileType }) {
  const { register, control } = useFormContext<MashProfile>();
  return (
    <div className="m-2 rounded border-2 p-2 gap-2 *:mb-2">
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("forkedFrom")} />
      <TextInput label="Name" control={control} name="name" />
      <TextInput label="Description" control={control} name="description" />
      <div className="grid grid-cols-1 gap-2">
        <MashProfileStepsForm src={profile} />
      </div>
      <div className="grid grid-cols-2">
        <div>
          <h4>Mash</h4>
          <AmountField
            label="Grain Temp"
            name="grainTemp"
            variant="inline"
            amountType="temperature"
          />
          <AmountField
            label="Mash Tun Temp"
            name="mashTunTemp"
            variant="inline"
            amountType="temperature"
          />
          <TextInput
            label="Grain Weight Basis"
            name="grainWeightBasis"
            variant="inline"
            control={control}
          />
        </div>
        <div>
          <h4>Sparge</h4>
          <AmountField
            label="Sparge Temp"
            name="spargeTemp"
            variant="inline"
            amountType="temperature"
          />
        </div>
      </div>
    </div>
  );
}
