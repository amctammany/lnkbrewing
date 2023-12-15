"use client";
import { Form } from "@/components/Form/Form";
import { Submit } from "@/components/Form/Submit";
import { TextField } from "@/components/Form/TextField";
import { User } from "@prisma/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface AdminFormProps {
  user: (User & { recipes: any }) | null;
  action: any;
}

export const AdminForm: FC<AdminFormProps> = ({ user, action }) => {
  const { register } = useForm<User>({ defaultValues: user! });
  return (
    <Form action={action}>
      <input type="hidden" {...register("id")} />
      <TextField disabled {...register("email")} />
      <TextField {...register("name")} />
      <Submit>Save</Submit>
    </Form>
  );
};
