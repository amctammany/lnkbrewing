"use client";
import {
  Form,
  NumberField,
  Select,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import {
  Control,
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { createMashProfile, updateMashProfile } from "@/app/profiles/actions";
import { MashProfileSteps } from "./MashProfileSteps";
import { MashProfileInput } from "@/app/profiles/mash/types";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { MashStepType } from "@prisma/client";
import { Button } from "@/components/Button";
import { AddIcon } from "@/components/Icon/AddIcon";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { IconButton } from "@/components/Button/IconButton";
import { DownIcon, SaveIcon, UpIcon } from "@/components/Icon";

type MashStepProps = {
  index: number;
  control: Control<MashProfileInput>;
  handleSwap?: any;
  handleRemove?: any;
  max: number;
};
const MashStep = ({
  index,
  control,
  handleSwap,
  handleRemove,
  max = 4,
}: MashStepProps) => {
  return (
    <div className="w-full flex flex-row ">
      <div className="m-auto grid  ">
        <div className="border-2 border-black rounded-lg p-2">{index}</div>
      </div>
      <div className="flex-grow grid gap-x-2 grid-cols-6 ">
        <div>
          <Controller
            render={({ field }) => <TextField {...field} label="Name" />}
            name={`steps.${index}.name`}
            control={control}
          />
        </div>
        <div>
          <Controller
            render={({ field }) => (
              <Select {...field} label="Type" options={MashStepType} />
            )}
            name={`steps.${index}.type`}
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
        <div>
          <Controller
            render={({ field }) => <TextField {...field} label="Ramp Time" />}
            name={`steps.${index}.rampTime`}
            control={control}
          />
        </div>
        <div className="flex-shrink m-auto grid grid-flow-col pt-0">
          <IconButton
            className={`${index > 0 ? "block" : "hidden"}`}
            data-index={index}
            data-direction={-1}
            onClick={handleSwap}
            Icon={UpIcon}
          />
          <IconButton
            className={`${index < max ? "block" : "hidden"}`}
            data-index={index}
            data-direction={1}
            onClick={handleSwap}
            Icon={DownIcon}
          />
          <Button data-index={index} onClick={handleRemove}>
            <DeleteIcon variant="default" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export type MashProfileFormProps = {
  src: MashProfileInput | null;
};
export const MashProfileForm = ({ src }: MashProfileFormProps) => {
  const { control, register, watch, trigger } = useForm<MashProfileInput>({
    defaultValues: { ...src, steps: src?.steps ?? [] },
  });
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<MashProfileInput>({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "steps",
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
            <Section
              title="Steps"
              variant="primary"
              actions={
                <Button onClick={addStep}>
                  <AddIcon />
                </Button>
              }
            >
              <>
                {(controlledFields || []).map((field, index) => (
                  <MashStep
                    key={field.id}
                    index={index}
                    control={control}
                    handleSwap={handleSwap}
                    handleRemove={handleRemove}
                    max={controlledFields.length - 1}
                  />
                ))}
              </>
            </Section>
          </div>
        </div>
        <Toolbar className="flex flex-row-reverse">
          <Submit>Save</Submit>
        </Toolbar>
      </Form>
    </Section>
  );
};
