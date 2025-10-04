import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HopType } from "@/types/Ingredient";
import React from "react";

export default function General({ src }: { src: HopType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <Prop label="Name" value={src.name} />
        <Prop label="Description" value={src.description} />
        <Prop label="Country" value={src.country} />
        <Prop label="Usage" value={src.usage} />
        <Prop label="Characteristics" value={src.characteristics} />
      </CardContent>
    </Card>
  );
}
