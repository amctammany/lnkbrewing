import { Prop } from "@/components/Prop";
import { AmountProp } from "@/components/Prop/AmountProp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdjustedFermentableType } from "@/types/Ingredient";
import React from "react";

export type FermentableDisplayProps = {
  src: AdjustedFermentableType;
};
export function FermentableDisplay({ src }: FermentableDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{src.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 *:m-3">
          <div>
            <Prop label="Name" value={src.name} />
            <Prop label="Description" value={src.description} />
            <Prop label="Manufacturer" value={src.manufacturer} />
            <Prop label="Country" value={src.country} />
            <AmountProp label="Color" value={src.color} />

            <Prop label="Power" value={src.power} />
            <Prop label="Potential" value={src.potential} />
            <AmountProp label="Protein" value={src.protein} />
            <AmountProp label="Friability" value={src.friability} />
            <AmountProp label="Max Usage" value={src.maxUsage} />
            <Prop label="Country" value={src.country} />
            <Prop label="Stability" value={src.stability} />
            <Prop label="Notes" value={src.notes} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default FermentableDisplay;
