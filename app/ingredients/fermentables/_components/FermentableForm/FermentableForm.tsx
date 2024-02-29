"use client";
import { Submit } from "@/components/Form/Submit";
import { NumberField } from "@/components/Form/NumberField";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Form } from "@/components/Form/Form";
import { Fermentable, FermentableIngredient } from "@prisma/client";
import { Section } from "@/components/Section";
import { useForm } from "react-hook-form";
import { Toolbar } from "@/components/Toolbar";
import { AmountField } from "@/components/Form/AmountField";

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
    <Form action={action}>
      <Section
        title={`Editing Fermentable: ${src?.name}`}
        footer={
          <Toolbar>
            <Submit variant="toolbar" size="toolbar">
              Save
            </Submit>
          </Toolbar>
        }
      >
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextArea rows={3} label="Description" {...register("description")} />
        <TextArea rows={3} label="Notes" {...register("notes")} />

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <AmountField
            step={0.01}
            label="Color"
            amountType="°L"
            {...register("color")}
          />
          <AmountField
            step={1}
            amountType="°Lintner"
            label="Power"
            {...register("power")}
          />
          <AmountField
            step={0.001}
            label="Potential"
            amountType="PPG"
            {...register("potential")}
          />
          <AmountField
            amountType="%"
            step={1}
            label="Max Usage"
            {...register("maxUsage")}
          />
        </div>
      </Section>
    </Form>
  );
};
