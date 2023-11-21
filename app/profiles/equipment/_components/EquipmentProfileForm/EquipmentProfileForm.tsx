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
import { EquipmentProfile } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/profiles/actions";
//import { EquipmentProfileSteps } from "./EquipmentProfileSteps";
//import { EquipmentProfileInput } from "../../equipment/types";
import { NumberKeys } from "@/lib/types";

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
    console.log(data);
    action(body);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <div className="col-span-2">
          <TextField {...register("name")} label="Name" />
        </div>
        <div className="col-span-2">
          <TextField {...register("description")} label="Description" />
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {numberFields.map((f) => (
            <NumberField
              key={f}
              //name={f}
              label={f}
              {...register(f)}
              step={0.01}
            />
          ))}
        </div>

        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </Form>
  );
};
