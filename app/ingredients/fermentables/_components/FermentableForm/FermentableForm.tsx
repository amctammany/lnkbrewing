import { Form, NumberField, Submit, TextField } from "@/components";
import { Fermentable } from "@prisma/client";

export type FermentableFormProps = {
  src: Fermentable | null;
};
type Diff<T, U> = T extends U ? never : T;

type NonNullable<T> = Diff<T, null | undefined>;

type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];

const numberFields: NumberKeys<Fermentable>[] = [
  "color",
  "power",
  "potential",
  "maxUsage",
];
export const FermentableForm = ({ src }: FermentableFormProps) => {
  return (
    <Form>
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <TextField
        name="description"
        label="Description"
        defaultValue={src?.description}
      />

      {numberFields.map((f) => (
        <NumberField key={f} name={f} label={f} defaultValue={src?.[f]} />
      ))}
      <Submit>Save</Submit>
    </Form>
  );
};
