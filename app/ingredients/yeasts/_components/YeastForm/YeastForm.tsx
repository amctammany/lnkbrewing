"use client";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";
import { TextArea } from "@/components/Form/TextArea";
import { TextField } from "@/components/Form/TextField";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import {
  Yeast,
  YeastForm as YeastFormEnum,
  YeastFlocculation,
  YeastType,
} from "@prisma/client";
import { useForm } from "react-hook-form";

export type YeastFormProps = {
  src: Yeast | null;
  action?: (data: FormData) => void;
};

export const YeastForm = ({ src, action }: YeastFormProps) => {
  const { register } = useForm<Yeast>({ defaultValues: src || {} });
  return (
    <Form action={action}>
      <Section
        title={`Editing Yeast: ${src?.name}`}
        footer={
          <Toolbar>
            <Submit>Update Yeast</Submit>
          </Toolbar>
        }
      >
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextField label="Manufacturer" {...register("manufacturer")} />
        <TextArea label="notes" {...register("notes")} />
        <TextArea label="Usage" {...register("usage")} />
        <div className="grid grid-cols-3 gap-4">
          <Select {...register("type")} options={YeastType} />
          <Select {...register("form")} options={YeastFormEnum} />
          <Select {...register("flocculation")} options={YeastFlocculation} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <NumberField
            step={0.001}
            label="Attenuation"
            {...register("attenuation")}
          />
          <NumberField label="Temp Low" {...register("tempLow")} />
          <NumberField label="Temp High" {...register("tempHigh")} />
        </div>
      </Section>
    </Form>
  );
};
