"use client";
import TextInput from "@/components/Form/TextInput";
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

  function handleAction(values: any, e: any) {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value as any);
    }
    startTransition(async () => {
      formAction(formData);
    });
    return false;
  }
  const onSubmit = (data: any) => {
    // You can still perform client-side validation here if needed
    // Then, trigger the server action
    //    formAction(data); // Pass form data to the server action
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        action={formAction}
        //        onSubmit={form.handleSubmit(handleAction)}
        onError={(e) => {
          console.log(e);
          e.preventDefault();
        }}
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
    </>
  );
}
