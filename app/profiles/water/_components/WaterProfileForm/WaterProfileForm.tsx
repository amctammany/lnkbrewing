"use client";
import {
  Form,
  NumberField,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createWaterProfile, updateWaterProfile } from "@/app/profiles/actions";
type WaterProfileInput = any;

export type WaterProfileFormProps = {
  src: WaterProfileInput | null;
};
export const WaterProfileForm = ({ src }: WaterProfileFormProps) => {
  const { control, register, trigger } = useForm<WaterProfileInput>({
    defaultValues: { ...src, steps: src?.steps ?? [] },
  });
  const action = src?.id ? updateWaterProfile : createWaterProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Form action={onSubmit}>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
        <input type="hidden" {...register("id")} />
        <div className="col-span-2">
          <TextField {...register("name")} label="Name" />
        </div>
        <div className="col-span-2">
          <TextField {...register("description")} label="Description" />
        </div>
        <div className="">
          <NumberField {...register("calcium")} label="Ca2+" />
        </div>

        <div className="">
          <NumberField {...register("magnesium")} label="Mg2+" />
        </div>
        <div className="">
          <NumberField {...register("sodium")} label="Na+" />
        </div>
        <div className="">
          <NumberField {...register("chloride")} label="Cl-" />
        </div>
        <div className="">
          <NumberField {...register("sulfate")} label="SO42-" />
        </div>
        <div className="">
          <NumberField {...register("bicarbonate")} label="HCO3-" />
        </div>
        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </Form>
  );
};
