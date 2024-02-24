"use client";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import { MashProfileInput } from "@/app/profiles/mash/types";
import { NumberField } from "@/components/Form/NumberField";
import { TextField } from "@/components/Form/TextField";
import { MashProfile, MashStepType } from "@prisma/client";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { AddIcon, DeleteIcon, Icon } from "@/components/Icon";
import { Select } from "@/components/Form/Select";
type MashProfileStepsProps = {
  src: MashProfileInput | null;
  control: Control<MashProfileInput, any>;
};

type MashStepProps = {
  index: number;
  control: Control<MashProfileInput>;
  handleSwap?: any;
  handleRemove?: any;
};
const MashStep = ({
  index,
  control,
  handleSwap,
  handleRemove,
}: MashStepProps) => {
  return (
    <div className="w-full flex flex-row ">
      <div className="m-auto grid  ">
        <div className="border-2 border-black rounded-lg p-2">{index}</div>
      </div>
      <div className="flex-grow grid gap-x-2 grid-cols-5">
        <div>
          <Controller
            render={({ field }) => <TextField {...field} label="Name" />}
            name={`steps.${index}.name`}
            control={control}
          />
        </div>
        <div>
          <Controller
            render={({ field }) => <TextField {...field} label="Temperature" />}
            name={`steps.${index}.temperature`}
            control={control}
          />
        </div>
        <div>
          <Controller
            render={({ field }) => <TextField {...field} label="Time" />}
            name={`steps.${index}.time`}
            control={control}
          />
        </div>
      </div>
      <div className="m-auto grid pt-3">
        <Button
          className={`${index > 0 ? "block" : "hidden"}`}
          data-index={index}
          data-direction={-1}
          onClick={handleSwap}
        >
          Up
        </Button>
        <Button
          className={`${index < 6 ? "block" : "hidden"}`}
          data-index={index}
          data-direction={1}
          onClick={handleSwap}
        >
          down
        </Button>
        <Button data-index={index} onClick={handleRemove}>
          <DeleteIcon variant="default" />
        </Button>
      </div>
    </div>
  );
};

export function MashProfileSteps({ src, control }: MashProfileStepsProps) {
  const { register, watch } = useForm({
    defaultValues: src || {},
    context: { control },
  });
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<MashProfileInput>({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "steps", // unique name for your Field Array
    });
  const watchFieldArray = watch("steps", src?.steps || []);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const addStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    append({
      name: "",
      type: MashStepType.temperature,
      temperature: 120,
      time: 0,
      rampTime: 0,
    });
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  const handleSwap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.dataset.index!);
    const direction = parseInt(e.currentTarget.dataset.direction!);
    console.log({ index, direction });
    //move(0, 1);
    swap(index, index + direction);
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
        {(controlledFields || []).map((field, index) => (
          <div
            key={field.id} // important to include key with field's id
            className="w-full flex flex-row "
          >
            <div className="m-auto grid  ">
              <div className="border-2 border-black rounded-lg p-2">
                {index}
              </div>
            </div>
            <div className="flex-grow grid gap-x-2 grid-cols-5">
              <div>
                <TextField
                  {...register(`steps.${index}.name` as const, {
                    value: field.name,
                  })}
                  label="Name"
                />
              </div>
              <div>
                <Select
                  label="Type"
                  {...register(`steps.${index}.type` as const, {
                    value: field.type,
                  })}
                  options={MashStepType}
                />
              </div>
              <NumberField
                {...register(`steps.${index}.temperature` as const, {
                  value: field.temperature,
                })}
                value={field.temperature}
                label="Temperature"
              />

              <NumberField
                {...register(`steps.${index}.time` as const, {
                  value: field.time,
                })}
                label="Time (min)"
              />

              <NumberField
                {...register(`steps.${index}.rampTime` as const, {
                  value: field.rampTime,
                })}
                label="Ramp Time (min)"
              />
            </div>
            <div className="m-auto grid pt-3">
              <Button
                className={`${index > 0 ? "block" : "hidden"}`}
                data-index={index}
                data-direction={-1}
                onClick={handleSwap}
              >
                Up
              </Button>
              <Button
                className={`${
                  index < controlledFields.length - 0 ? "block" : "hidden"
                }`}
                data-index={index}
                data-direction={1}
                onClick={handleSwap}
              >
                down
              </Button>
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
