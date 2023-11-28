"use client";

import {
  Form,
  NumberField,
  Select,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import { Hop, HopUsage } from "@prisma/client";
import { useForm } from "react-hook-form";

export type HopFormProps = {
  src: Hop | null;
  action?: (data: FormData) => void;
};

export const HopForm = ({ src, action }: HopFormProps) => {
  const { control, register, trigger } = useForm<Hop>({
    defaultValues: src || {},
  });

  const onAction = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    if (action) action(data);
  };
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <Form action={onAction}>
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextArea label="description" {...register("description")} />
        <Select {...register("usage")} options={HopUsage} />
        <TextArea label="flavor" {...register("flavor")} />
        <div className="grid grid-cols-3 gap-4">
          <NumberField label="Alpha Acids" {...register("alpha")} step={0.01} />
          <NumberField label="Beta Acids" {...register("beta")} step={0.01} />
          <NumberField
            {...register("caryophyllene")}
            label="Caryophyllene"
            step={0.1}
          />
        </div>

        <Submit>Update Hop</Submit>
      </Form>
    </div>
  );
};
