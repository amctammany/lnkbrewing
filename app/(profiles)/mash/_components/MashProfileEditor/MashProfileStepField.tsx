import InlineField from "@/components/Form/InlineField";
import { Button } from "@/components/ui/button";
import { MashProfileType, MashStepType } from "@/types/Profile";
import React from "react";
import { Control } from "react-hook-form";
export type MashProfileStepFieldProps = {
  src: MashStepType;
  index: number;
  remove: any;
  swap: any;
  length: number;
  control: Control<MashProfileType>;
};
export default function MashProfileStepField({
  src,
  length,
  index,
  control,
  swap,
  remove,
}: MashProfileStepFieldProps) {
  return (
    <li className="list-item" key={index}>
      <b>{index}</b>
      <b>{src.type}</b>
      <input type="hidden" name={`steps.${index}.index`} value={index} />
      <input type="hidden" name={`steps.${index}.id`} />
      <InlineField
        control={control}
        name={`steps.${index}.temperature`}
        type="number"
        label="Temp"
      />
      <InlineField
        control={control}
        name={`steps.${index}.time`}
        type="number"
        label="Time"
      />
      <InlineField
        control={control}
        name={`steps.${index}.rampTime`}
        type="number"
        label="Ramp Time"
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          swap(index, index - 1);
        }}
        disabled={index < 1}
      >
        Up
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          remove(index);
        }}
      >
        Remove
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          swap(index, index + 1);
        }}
        disabled={index > length - 1}
      >
        Down
      </Button>
    </li>
  );
}
