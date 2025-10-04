import BadgeProp from "@/components/Prop/BadgeProp";
import { AdjustedMashStepType } from "@/types/Profile";
import { SectionIcon, Thermometer, Timer, TriangleRight } from "lucide-react";
import React from "react";

export type MashStepListItemProps = {
  src: AdjustedMashStepType;
};
export default function MashStepListItem({ src }: MashStepListItemProps) {
  return (
    <div className="flex w-full">
      <div className="shrink">
        <SectionIcon />
      </div>
      <div className="grow flex">
        <div>
          <span>{src.name ?? src.type}</span>
          <BadgeProp variant="outlined" Icon={Thermometer}>
            {src.temperature.value}
            {src.temperature.unit}
          </BadgeProp>

          <BadgeProp variant="outlined" Icon={Timer}>
            <span className="text-md">
              {src.time.value} {src.time.unit}
            </span>
          </BadgeProp>
          <BadgeProp variant="outlined" Icon={TriangleRight}>
            <span className="text-md">
              {src.rampTime?.value} {src.rampTime?.unit}
            </span>
          </BadgeProp>
        </div>
      </div>
    </div>
  );
  /**
   * 
  return (
    <div className="lg:flex lg:flex-row grid grid-cols-2 text-sm lg:text-lg">
      <Prop label="Type" value={src?.type} />
      <Prop label="Time" value={src?.time} />
      <AmountProp
        label="Temperature"
        value={src?.temperature}
        unit={$Enums.UserTemperaturePreference.F}
      />
      <Prop label="Ramp Time" value={src?.rampTime} />
    </div>
  );
   */
}
