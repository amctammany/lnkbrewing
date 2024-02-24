"use client";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Select } from "@/components/Form/Select";
import { Range } from "@/components/Range";
import { Toolbar } from "@/components/Toolbar/Toolbar";
import { NumberKeys } from "@/lib/types";
import { type Hop, HopUsage, HopSupplier } from "@prisma/client";
import { useForm } from "react-hook-form";

export type HopSupplierFormProps = {
  src: HopSupplier | null;
  action?: (data: FormData) => void;
};

export const HopSupplierForm = ({ src, action }: HopSupplierFormProps) => {
  const { control, watch, register, trigger, getValues } = useForm<HopSupplier>(
    {
      defaultValues: src || {},
    }
  );

  const onAction = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    if (action) action(data);
  };
  return (
    <Form action={onAction}>
      <Section
        title={`Editing HopSupplier: ${src?.name}`}
        footer={
          <Toolbar className="col-span-3 m-0 p-0">
            <Button type="submit">Submit</Button>
          </Toolbar>
        }
      >
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextField label="Address Line 1" {...register("address1")} />
        <TextField label="Address Line 2" {...register("address2")} />
        <TextArea label="description" {...register("description")} />
      </Section>
    </Form>
  );
};
