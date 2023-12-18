"use client";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { MashProfileInput } from "@/app/profiles/mash/types";
import { NumberField } from "@/components/Form/NumberField";
import { TextField } from "@/components/Form/TextField";
import { MashProfile } from "@prisma/client";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { AddIcon, DeleteIcon, Icon } from "@/components/Icon";
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
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.dataset.index!);
    remove(index);
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <Section
      title="Steps"
      variant="primary"
      actions={
        <Button onClick={addStep}>
          <AddIcon />
        </Button>
      }
    >
      <div>
        {(fields || []).map((field, index) => (
          <div
            key={field.id} // important to include key with field's id
            className="w-full flex flex-row "
          >
            <div className="m-auto grid  ">
              <div className="border-2 border-black rounded-lg p-2">
                {index}
              </div>
            </div>
            <div className="flex-grow grid gap-x-2 grid-cols-4">
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
            <div className="m-auto grid pt-3">
              <Button data-index={index} onClick={handleRemove}>
                <DeleteIcon variant="default" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
