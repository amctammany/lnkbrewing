import { Form, TextField } from "@/components";
import { Hop } from "@prisma/client";

export type HopFormProps = {
  src: Hop | null;
};

export const HopForm = ({ src }: HopFormProps) => {
  return (
    <Form>
      <TextField name="name" label="Name" defaultValue={src?.name} />
    </Form>
  );
};
