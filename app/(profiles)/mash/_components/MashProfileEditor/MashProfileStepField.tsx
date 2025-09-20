import InlineField from "@/components/Form/InlineField";
import SelectInput from "@/components/Form/SelectInput";
import { Button } from "@/components/ui/button";
import { MashProfileType, MashStepType } from "@/types/Profile";
import { $Enums } from "@prisma/client";
import { ArrowDown, ArrowUp, Delete, X } from "lucide-react";
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
        <div className="grid grid-flow-row grid-rows-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              swap(index, index - 1);
            }}
            disabled={index < 1}
          >
            <ArrowUp />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              remove(index);
            }}
          >
            <X />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              swap(index, index + 1);
            }}
            disabled={index > length - 1}
          >
            <ArrowDown />
          </Button>
        </div>
        <div className="flex-grow grid grid-rows-2 justify-center items-center">
          <div className="flex">
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
              className="flex-grow"
              control={control}
              name={`steps.${index}.name`}
              variant="inline"
              label="Name"
            />
          </div>
          <div className="flex">
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
      </div>
    </li>
  );
}
