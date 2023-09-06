import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { Hop } from "@prisma/client";

export type HopFormProps = {
  src: Hop | null;
  action?: (data: FormData) => void;
};

export const HopForm = ({ src, action }: HopFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <TextArea
        name="description"
        label="description"
        defaultValue={src?.description}
      />
      <TextArea name="flavor" label="flavor" defaultValue={src?.flavor} />
      <div className="grid grid-cols-3 gap-4">
        <NumberField
          name="alpha"
          label="Alpha Acids"
          defaultValue={src?.alpha}
        />
        <NumberField name="beta" label="Beta Acids" defaultValue={src?.beta} />
        <NumberField
          name="caryophyllene"
          label="Caryophyllene"
          defaultValue={src?.caryophyllene}
        />
      </div>

      <Submit>Update Hop</Submit>
    </Form>
  );
};
