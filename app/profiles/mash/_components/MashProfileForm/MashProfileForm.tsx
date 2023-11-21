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

        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </Form>
  );
};
