import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { Fermentable } from "@prisma/client";

export type FermentableFormProps = {
  src: Fermentable | null;
  action?: (formData: FormData) => void;
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
export const FermentableForm = ({ src, action }: FermentableFormProps) => {
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={src?.id} />
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <TextArea
        name="description"
        rows={3}
        label="Description"
        defaultValue={src?.description}
      />
      <TextArea name="notes" rows={3} label="Notes" defaultValue={src?.notes} />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {numberFields.map((f) => (
          <NumberField key={f} name={f} label={f} defaultValue={src?.[f]} />
        ))}
      </div>
      <Submit>Save</Submit>
    </Form>
  );
};
