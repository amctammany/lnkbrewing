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
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
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
    <Section title={`Editing WaterProfile: ${src?.name}`}>
      <Form action={onSubmit}>
        <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
          <input type="hidden" {...register("id")} />
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-3 md:col-span-6">
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
        </div>
        <Toolbar>
          <Submit>Save</Submit>
        </Toolbar>
      </Form>
    </Section>
  );
};
