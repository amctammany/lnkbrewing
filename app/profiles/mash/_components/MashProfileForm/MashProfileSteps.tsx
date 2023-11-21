"use client";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { MashProfileInput } from "@/app/profiles/mash/types";
import { NumberField, TextField } from "@/components";
import { MashProfile } from "@prisma/client";
type MashProfileStepsProps = {
  src: MashProfile | null;
  control: Control<MashProfileInput, any>;
};
export function MashProfileSteps({ src, control: c1, steps, update }: any) {
  const { register } = useForm({
    defaultValues: src || {},
    context: { control: c1 },
  });
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<MashProfileInput>({
      control: c1, // control props comes from useForm (optional: if you are using FormContext)
      name: "steps", // unique name for your Field Array
    });
  const addStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    append({ mashProfileId: src.id, temperature: 120, time: 0, rampTime: 0 });
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div>
      {(fields || []).map((field, index) => (
        <div
          key={field.id} // important to include key with field's id
          className="grid gap-x-2 grid-cols-4"
        >
          <div>
            <input
              type="hidden"
              {...register(`steps.${index}.mashProfileId`, { value: src.id })}
            />

            <TextField
              {...register(`steps.${index}.name` as const)}
              label="Name"
            />
          </div>
          <NumberField
            {...register(`steps.${index}.temperature` as const)}
            label="Temperature"
          />

          <NumberField
            {...register(`steps.${index}.time` as const)}
            label="Time (min)"
          />

          <NumberField
            {...register(`steps.${index}.rampTime` as const)}
            label="Ramp Time (min)"
          />
        </div>
      ))}
      <button onClick={addStep}>Add</button>
    </div>
  );
}
