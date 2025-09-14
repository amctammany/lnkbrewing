"use client";
import TextInput from "@/components/Form/TextInput";
import { Form } from "@/components/ui/form";
import { OptionalNullable } from "@/lib/utils";
import { User } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

export type SettingsFormProps = {
  user: User;
  action: (formData: FormData) => Promise<void>;
};
export default function SettingsForm({ user, action }: SettingsFormProps) {
  const form = useForm<User>({ defaultValues: user });
  return (
    <Form {...form}>
      <form action={action}>
        <TextInput label="Name" {...form.register("name")} />
        <TextInput label="Email" {...form.register("email")} />
      </form>
    </Form>
  );
}
