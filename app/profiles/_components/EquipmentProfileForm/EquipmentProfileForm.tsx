import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { EquipmentProfile } from "@prisma/client";

export type EquipmentProfileFormProps = {
  src: EquipmentProfile | null;
  action?: (formData: FormData) => void;
};
type Diff<T, U> = T extends U ? never : T;

type NonNullable<T> = Diff<T, null | undefined>;

type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];

const numberFields: NumberKeys<EquipmentProfile>[] = [
  "batchVolume",
  "boilTime",
  "boilOffRate",
  "brewEfficiency",
  "mashEfficiency",
  "trubLoss",
  "fermenterLoss",
  "mashLoss",
];
export const EquipmentProfileForm = ({
  src,
  action,
}: EquipmentProfileFormProps) => {
  return (
    <Form action={action}>
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
