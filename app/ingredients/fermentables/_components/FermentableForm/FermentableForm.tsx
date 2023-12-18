"use client";
import { Submit } from "@/components/Form/Submit";
import { NumberField } from "@/components/Form/NumberField";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Form } from "@/components/Form/Form";
import { Fermentable, FermentableIngredient } from "@prisma/client";
import { Section } from "@/components/Section";
import { useForm } from "react-hook-form";

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
  const { register } = useForm<Fermentable>({
    defaultValues: src || {},
  });
  return (
    <Section title={`Editing Fermentable: ${src?.name}`}>
      <Form action={action}>
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextArea rows={3} label="Description" {...register("description")} />
        <TextArea rows={3} label="Notes" {...register("notes")} />

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {numberFields.map((f) => (
            <NumberField step={0.01} key={f} label={f} {...register(f)} />
          ))}
        </div>
        <Submit>Save</Submit>
      </Form>
    </Section>
  );
};
