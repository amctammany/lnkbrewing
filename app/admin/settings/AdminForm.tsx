import { Form } from "@/components/Form/Form";
import { Submit } from "@/components/Form/Submit";
import { TextField } from "@/components/Form/TextField";
import { User } from "@prisma/client";
import React, { FC } from "react";

interface AdminFormProps {
  user: (User & { recipes: any }) | null;
  action: any;
}

export const AdminForm: FC<AdminFormProps> = ({ user, action }) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={user?.id} />
      <TextField disabled name="email" defaultValue={user?.email} />
      <TextField name="name" defaultValue={user?.name} />
      <Submit>Save</Submit>
    </Form>
  );
};
