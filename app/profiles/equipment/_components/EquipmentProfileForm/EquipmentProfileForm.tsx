/**
 * import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { EquipmentProfile } from "@prisma/client";

export type EquipmentProfileFormProps = {
  src: EquipmentProfile | null;
  action?: (formData: FormData) => void;
};
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
*/
"use client";
import {
  Form,
  NumberField,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import {
  EquipmentProfile,
  TimeUnit,
  UserVolumePreference,
} from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/profiles/actions";
//import { EquipmentProfileSteps } from "./EquipmentProfileSteps";
//import { EquipmentProfileInput } from "../../equipment/types";
import { NumberKeys } from "@/lib/types";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { AmountField } from "@/components/Form/AmountField";

export type EquipmentProfileFormProps = {
  src: EquipmentProfile | null;
};
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

export const EquipmentProfileForm = ({ src }: EquipmentProfileFormProps) => {
  const { control, register, handleSubmit, reset, setValue } =
    useForm<EquipmentProfile>({
      defaultValues: src || {},
    });
  const action = src?.id ? updateEquipmentProfile : createEquipmentProfile;

  const onSubmit: SubmitHandler<EquipmentProfile> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        body.append(key, value?.toString());
      }
    });
    action(body);
  };
  return (
    <Section title={`Editing Equipment: ${src?.name}`}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1 md:gap-2 grid-cols-1 md:grid-cols-2">
          <input type="hidden" {...register("id")} />
          <div className="col-span-2">
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-2">
            <TextField {...register("description")} label="Description" />
          </div>
          <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <AmountField
              {...register("batchVolume")}
              label="Batch Volume"
              amountType={UserVolumePreference.gal}
              step={0.01}
            />
            <AmountField
              {...register("boilTime")}
              label="Boil Time"
              amountType={TimeUnit.min}
              step={1}
            />
            <AmountField
              {...register("boilOffRate")}
              label="Boil Off Rate"
              amountType="gal/hr"
              step={0.01}
            />

            <AmountField
              {...register("brewEfficiency")}
              label="Brew Efficiency"
              amountType="%"
              step={0.01}
            />
            <AmountField
              {...register("mashEfficiency")}
              label="Mash Efficiency"
              amountType="%"
              step={0.01}
            />
            <AmountField
              {...register("trubLoss")}
              label="Trub Loss"
              amountType="gal"
              step={0.01}
            />
            <AmountField
              {...register("fermenterLoss")}
              label="Fermenter Loss"
              amountType="gal"
              step={0.01}
            />
            <AmountField
              {...register("mashLoss")}
              label="Mash Loss"
              amountType="gal"
              step={0.01}
            />
          </div>
        </div>
        <Toolbar className="col-span-2">
          <Submit>Save</Submit>
        </Toolbar>
      </Form>
    </Section>
  );
};
