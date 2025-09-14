"use client";
import TextInput from "@/components/Form/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { User } from "@prisma/client";
import React, { startTransition, useActionState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export type SettingsFormContainerProps<S = unknown> = {
  user: User;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children: React.ReactNode;
};
export function SettingsContainerForm({
  user,
  action,
  children,
}: SettingsFormContainerProps) {
  const [state, formAction] = useActionState<any, FormData>(action, null);
  const form = useForm<User>({ defaultValues: user, errors: state?.errors });

  return (
    <Form {...form}>
      <form
        action={formAction}
        //        onSubmit={form.handleSubmit(handleAction)}
      >
        {children}
      </form>
    </Form>
  );
}

export type SettingsFormProps = {
  user: User;
  //  action: (formData: FormData) => Promise<void>;
};
export function SettingsForm({ user }: SettingsFormProps) {
  const { register } = useFormContext<User>();
  return (
    <>
      <input type="hidden" {...register("id")} />
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Username" {...register("username")} />
      <TextInput label="Email" {...register("email")} />
      <Button type="submit">Save</Button>
    </>
  );
}
