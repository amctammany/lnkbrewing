"use client";
import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { MashProfile } from "@prisma/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createMashProfile, updateMashProfile } from "../../_actions";
import { MashProfileSteps } from "./MashProfileSteps";
import { MashProfileInput } from "../../mash/types";
import { formData } from "zod-form-data";

export type MashProfileFormProps = {
  src: MashProfileInput | null;
};
export const MashProfileForm = ({ src }: MashProfileFormProps) => {
  const { control, register, handleSubmit, trigger, reset, setValue } =
    useForm<MashProfileInput>({
      defaultValues: src || { steps: [] },
    });
  const { fields, update, append, prepend, remove, swap, move, insert } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "steps", // unique name for your Field Array
    });

  const action = src?.id ? updateMashProfile : createMashProfile;

  const onSubmita: SubmitHandler<MashProfileInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        body.append(key, value?.toString());
      }
    });
    console.log(data);
    action(body);
  };
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
          <MashProfileSteps
            steps={fields}
            update={update}
            append={append}
            register={register}
          />
        </div>

        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </Form>
  );
};
