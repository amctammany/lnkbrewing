import { Prop } from "@/components/Prop";
import { OtherType } from "@/types/Ingredient";
import React from "react";

export type OtherIngredientDisplayProps = {
  src: OtherType;
};
export function OtherIngredientDisplay({ src }: OtherIngredientDisplayProps) {
  return (
    <div className="grid lg:grid-cols-2 *:m-3">
      <div>
        <Prop label="Name" value={src.name} />
        <Prop label="Description" value={src.description} />
      </div>
    </div>
  );
}
export default OtherIngredientDisplay;
