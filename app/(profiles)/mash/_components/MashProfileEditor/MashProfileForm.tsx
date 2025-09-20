"use client";
import InlineField from "@/components/Form/InlineField";
import { InlineInput } from "@/components/Form/InlineInput";
import TextInput from "@/components/Form/TextInput";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { MashProfileType } from "@/types/Profile";
import { MashProfile } from "@prisma/client";
import React, { useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";
export type MashProfileFormContainerProps<S = unknown> = {
  profile: MashProfileType;
  action: (state: S, formData: FormData) => Promise<S> | S;
  children?: React.ReactNode | React.ReactNode[];
};
export function MashProfileFormContainer({
  action,
  profile,
  children,
}: MashProfileFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm({ defaultValues: profile, errors: state?.errors });
  return (
    <Form {...form}>
      <form action={formAction}>{children}</form>
    </Form>
  );
}
export function MashProfileForm() {
  const { register, control } = useFormContext<MashProfile>();
  return (
    <div className="m-2 rounded border-2 p-2 gap-2 *:mb-2">
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("forkedFrom")} />
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Description" {...register("description")} />
      <div className="grid grid-cols-3 gap-2"></div>
    </div>
  );
}
