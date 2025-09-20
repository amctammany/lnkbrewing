import InlineField from "@/components/Form/InlineField";
import SelectInput from "@/components/Form/SelectInput";
import { Button } from "@/components/ui/button";
import { MashProfileType, MashStepType } from "@/types/Profile";
import { $Enums } from "@prisma/client";
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
      <div className="flex">
        <div className="grid grid-cols-3">
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
        </div>
        <div className="flex-grow grid grid-cols-4">
          <input type="hidden" name={`steps.${index}.index`} value={index} />
          <input type="hidden" name={`steps.${index}.id`} />
          <SelectInput
            control={control}
            label="Type"
            variant="inline"
            name={`steps.${index}.type`}
            options={$Enums.MashStepType}
          />
          <InlineField
            control={control}
            name={`steps.${index}.temperature`}
            variant="inline"
            type="number"
            label="Temp"
          />
          <InlineField
            variant="inline"
            control={control}
            name={`steps.${index}.time`}
            type="number"
            label="Time"
          />
          <InlineField
            control={control}
            variant="inline"
            name={`steps.${index}.rampTime`}
            type="number"
            label="Ramp Time"
          />
        </div>
      </div>
    </li>
  );
}
