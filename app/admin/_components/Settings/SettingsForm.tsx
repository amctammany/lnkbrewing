"use client";
import TextInput from "@/components/Form/TextInput";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { User } from "@prisma/client";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";

export type SettingsFormContainerProps = {
  user: User;
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
};
export function SettingsContainerForm({
  user,
  action,
  children,
}: SettingsFormContainerProps) {
  const form = useForm<User>({ defaultValues: user });
  return (
    <Form {...form}>
      <form action={action}>{children}</form>
    </Form>
  );
}

export type SettingsFormProps = {
  user: User;
  action: (formData: FormData) => Promise<void>;
};
export function SettingsForm({ user, action }: SettingsFormProps) {
  const { register } = useFormContext<User>();
  return (
    <>
      <TextInput label="Name" {...register("name")} />
      <TextInput label="Email" {...register("email")} />
    </>
  );
}
