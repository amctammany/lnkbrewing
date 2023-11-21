import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { MashProfile } from "@prisma/client";

export type MashProfileFormProps = {
  src: MashProfile | null;
  action?: (formData: FormData) => void;
};
type Diff<T, U> = T extends U ? never : T;

type NonNullable<T> = Diff<T, null | undefined>;

type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];

const numberFields: NumberKeys<MashProfile>[] = [];
export const MashProfileForm = ({ src, action }: MashProfileFormProps) => {
  return (
    <Form action={action}>
      <h5>Mash Profile {JSON.stringify(src)}</h5>
      <input type="hidden" name="id" value={src?.id} />
      <TextField name="name" label="Name" defaultValue={src?.name} />
      <TextArea
        name="description"
        rows={3}
        label="Description"
        defaultValue={src?.description}
      />{" "}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {numberFields.map((f) => (
          <NumberField
            key={f}
            name={f}
            label={f}
            step={0.1}
            defaultValue={src?.[f]}
          />
        ))}
      </div>
      <Submit>Save</Submit>
    </Form>
  );
};
