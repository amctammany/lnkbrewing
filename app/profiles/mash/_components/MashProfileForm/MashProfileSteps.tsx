"use client";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { MashProfileInput } from "@/app/profiles/mash/types";
import { NumberField } from "@/components/Form/NumberField";
import { TextField } from "@/components/Form/TextField";
import { MashProfile } from "@prisma/client";
type MashProfileStepsProps = {
  src: MashProfileInput | null;
  control: Control<MashProfileInput, any>;
};
export function MashProfileSteps({ src, control }: MashProfileStepsProps) {
  const { register } = useForm({
    defaultValues: src || {},
    context: { control },
  });
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<MashProfileInput>({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "steps", // unique name for your Field Array
    });
  const addStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    append({ name: "", temperature: 120, time: 0, rampTime: 0 });
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