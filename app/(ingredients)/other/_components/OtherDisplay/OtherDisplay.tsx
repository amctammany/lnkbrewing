import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OtherIngredient } from "@prisma/client";
import React from "react";

export type OtherIngredientDisplayProps = {
  src: OtherIngredient;
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
