import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { YeastType } from "@/types/Ingredient";
import { Yeast } from "@prisma/client";
import React from "react";

export type YeastDisplayProps = {
  src: YeastType;
};
export function YeastDisplay({ src }: YeastDisplayProps) {
  return (
    <div className="grid lg:grid-cols-2 *:m-3">
      <div>
        <Prop label="Name" value={src.name} />
        <Prop label="Description" value={src.description} />
        <Prop label="Manufacturer" value={src.manufacturer} />
        <Prop label="Attenuation" value={src.attenuation} />
        <Prop label="Flocculation" value={src.flocculation} />
        <Prop label="Note" value={src.notes} />
      </div>
    </div>
  );
}
export default YeastDisplay;
