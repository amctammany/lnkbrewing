"use client";
import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { OtherIngredient } from "@prisma/client";
import { useForm } from "react-hook-form";

export type OtherIngredientFormProps = {
  src: OtherIngredient | null;
  action: (formData: FormData) => void;
};
type Diff<T, U> = T extends U ? never : T;

type NonNullable<T> = Diff<T, null | undefined>;

type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];

const numberFields: NumberKeys<OtherIngredient>[] = [];
export const OtherIngredientForm = ({
  src,
  action,
}: OtherIngredientFormProps) => {
  const { control, register, trigger } = useForm<OtherIngredient>({
    defaultValues: src || {},
  });

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <TextField label="Name" {...register("name")} />
      <TextArea rows={3} label="Description" {...register("description")} />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {numberFields.map((f) => (
          <NumberField key={f} label={f} {...register(f)} />
        ))}
      </div>
      <Submit>Save</Submit>
    </Form>
  );
};
