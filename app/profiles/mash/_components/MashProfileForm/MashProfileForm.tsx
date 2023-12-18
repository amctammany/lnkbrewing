"use client";
import {
  Form,
  NumberField,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createMashProfile, updateMashProfile } from "@/app/profiles/actions";
import { MashProfileSteps } from "./MashProfileSteps";
import { MashProfileInput } from "@/app/profiles/mash/types";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";

export type MashProfileFormProps = {
  src: MashProfileInput | null;
};
export const MashProfileForm = ({ src }: MashProfileFormProps) => {
  const { control, register, trigger } = useForm<MashProfileInput>({
    defaultValues: { ...src, steps: src?.steps ?? [] },
  });
  const action = src?.id ? updateMashProfile : createMashProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Section header="Edit Mash Profile" className="p-0">
      <Form action={onSubmit}>
        <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
          <input type="hidden" {...register("id")} />
          <div className="col-span-2">
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-2">
            <TextField {...register("description")} label="Description" />
          </div>
          <div className="col-span-2">
            <MashProfileSteps src={src} control={control} />
          </div>
        </div>
        <Toolbar className="flex flex-row-reverse">
          <Submit>Save</Submit>
        </Toolbar>
      </Form>
    </Section>
  );
};
