import { WaterProfile } from "@prisma/client";
import React from "react";

export type WaterProfileDisplayProps = {
  profile: WaterProfile;
};
export default function WaterProfileDisplay({
  profile,
}: WaterProfileDisplayProps) {
  return (
    <div>
      WaterProfileDisplay
      <div>{JSON.stringify(profile)}</div>
    </div>
  );
}
