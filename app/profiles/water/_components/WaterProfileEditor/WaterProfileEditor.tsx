import { WaterProfile } from "@prisma/client";
import React from "react";

export type WaterProfileEditorProps = {
  profile: WaterProfile;
};
export default function WaterProfileEditor({
  profile,
}: WaterProfileEditorProps) {
  return (
    <div>
      WaterProfileEditor
      <div>{JSON.stringify(profile)}</div>
    </div>
  );
}
