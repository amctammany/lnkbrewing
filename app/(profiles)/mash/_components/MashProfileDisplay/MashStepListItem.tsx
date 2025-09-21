import { Prop } from "@/components/Prop";
import { AmountProp } from "@/components/Prop/AmountProp";
import { MashStepType } from "@/types/Profile";
import { $Enums } from "@prisma/client";
import React from "react";

export type MashStepListItemProps = {
  src?: MashStepType;
};
export default function MashStepListItem({ src }: MashStepListItemProps) {
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
}
