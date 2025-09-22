import { Prop } from "@/components/Prop";
import { AmountProp } from "@/components/Prop/AmountProp";
import BadgeProp from "@/components/Prop/BadgeProp";
import { Badge } from "@/components/ui/badge";
import { MashStepType } from "@/types/Profile";
import { $Enums } from "@prisma/client";
import { SectionIcon, Thermometer, Timer, TriangleRight } from "lucide-react";
import React from "react";

export type MashStepListItemProps = {
  src: MashStepType;
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
            {src.temperature}
          </BadgeProp>

          <BadgeProp variant="outlined" Icon={Timer}>
            <span className="text-md">{src.time} min</span>
          </BadgeProp>
          <BadgeProp
            variant="outlined"
            Icon={TriangleRight}
            value={src.rampTime}
          />
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
