import { Prop } from "@/components/Prop";
import { MashStepType } from "@/types/Profile";
import React from "react";

export type MashStepListItemProps = {
  src?: MashStepType;
};
export default function MashStepListItem({ src }: MashStepListItemProps) {
  return (
    <div className="flex">
      <Prop label="Type" value={src?.type} />
      <Prop label="Time" value={src?.time} />
      <Prop label="Temperature" value={src?.temperature} />
      <Prop label="Ramp Time" value={src?.rampTime} />
    </div>
  );
}
