"use client";
import { Form } from "@/components/Form/Form";
import { Submit } from "@/components/Form/Submit";
import { TextField } from "@/components/Form/TextField";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { User } from "@prisma/client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface AdminFormProps {
  user: (User & { recipes: any }) | null;
  action: any;
}

const AdminFooter = () => {
  return (
    <Toolbar>
      <Submit>Save</Submit>
    </Toolbar>
  );
};
export const AdminForm: FC<AdminFormProps> = ({ user, action }) => {
  const { register } = useForm<User>({ defaultValues: user! });
  return (
    <Form action={action}>
      <Section title="Admin Settings" footer={<AdminFooter />}>
        <input type="hidden" {...register("id")} />
        <TextField disabled {...register("email")} />
        <TextField {...register("username")} />
        <TextField {...register("name")} />
      </Section>
    </Form>
  );
};
