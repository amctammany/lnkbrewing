"use client";
import {
  Select,
  Form,
  NumberField,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import { NumberKeys } from "@/lib/types";
import { OtherIngredient, OtherIngredientType } from "@prisma/client";
import { useForm } from "react-hook-form";

export type OtherIngredientFormProps = {
  src: OtherIngredient | null;
  action?: (formData: FormData) => void;
  options: any;
};
const numberFields: NumberKeys<OtherIngredient>[] = [];
export const OtherIngredientForm = ({
  src,
  options,
  action,
}: OtherIngredientFormProps) => {
  const { control, register, trigger } = useForm<OtherIngredient>({
    defaultValues: src || {},
  });

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    if (action) action(data);
  };

  return (
    <Form action={onSubmit}>
      <input type="hidden" {...register("id")} />
      <TextField label="Name" {...register("name")} />
      <TextArea rows={3} label="Description" {...register("description")} />

      <Select
        label="Other"
        {...register("type")}
        options={OtherIngredientType}
      />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {numberFields.map((f) => (
          <NumberField key={f} label={f} {...register(f)} />
        ))}
      </div>
      <Submit>Save</Submit>
    </Form>
  );
};
