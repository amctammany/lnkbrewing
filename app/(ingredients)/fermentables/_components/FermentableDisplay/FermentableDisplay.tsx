import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fermentable } from "@prisma/client";
import React from "react";

export type FermentableDisplayProps = {
  src: Fermentable;
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
            <Prop label="Color" value={src.color} />

            <Prop label="Power" value={src.power} />
            <Prop label="Potential" value={src.potential} />
            <Prop label="Max Usage" value={src.maxUsage} />
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
