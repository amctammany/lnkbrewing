"use client";
import { Form, NumberField, Submit, TextArea, TextField } from "@/components";
import { MashProfile } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { createMashProfile, updateMashProfile } from "../../_actions";

export type MashProfileFormProps = {
  src: MashProfile | null;
  //action?: (formData: FormData) => void;
};
type MashProfileStep = {
  name?: string;
  type: any;
  temperature: number;
  time: number;
  rampTime?: number;
};
type MashProfileInput = {
  id: number;
  name?: string;
  description?: string;
  steps: MashProfileStep[];
};
export const MashProfileForm = ({ src }: MashProfileFormProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<MashProfileInput>(
    {
      defaultValues: src || {},
    }
  );
  const action = src?.id ? updateMashProfile : createMashProfile;

  const onSubmit: SubmitHandler<MashProfileInput> = (data) => {
    const body = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        body.append(key, value?.toString());
      }
    });
    console.log(data);
    action(body);
  };

  //const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
  //const { name, value } = e.currentTarget;
  //const fermentable = fermentables.find((p) => p.id === parseInt(value));
  //if (!fermentable) return;
  //setValue("fermentableId", fermentable?.id);
  //setValue("potential", fermentable?.potential);
  //setValue("color", fermentable?.color);
  //};
  //const options = (fermentables || []).reduce((acc, hop) => {
  //acc[hop.id] = hop.name;
  //return acc;
  //}, {} as Record<string, string>);

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

        <div className="col-span-2">
          <Submit>Save</Submit>
        </div>
      </div>
    </Form>
  );
};
