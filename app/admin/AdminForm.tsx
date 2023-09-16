import { Form, Submit, TextField } from "@/components";

export type AdminFormProps = {
  src: any;
  action?: any;
  //children: React.ReactNode;
};
export const AdminForm = ({ src, action }: AdminFormProps) => {
  return (
    <Form action={action}>
      <TextField name="name" defaultValue={src?.name} />
      <Submit>Save</Submit>
    </Form>
  );
};
