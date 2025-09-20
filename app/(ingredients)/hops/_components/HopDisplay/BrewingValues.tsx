import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hop } from "@prisma/client";
import React from "react";

export default function BrewingValues({ src }: { src: Hop }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brewing Values</CardTitle>
      </CardHeader>
      <CardContent>
        <Prop variant="inline" label="Alpha" value={src.alpha} unit="%" />
        <Prop variant="inline" label="Beta" value={src.beta} unit="%" />
        <Prop
          variant="inline"
          label="Cohumulone"
          value={src.cohumulone}
          unit="%"
        />
        <Prop
          variant="inline"
          label="Caryophyllene"
          value={src.caryophyllene}
        />
        <Prop variant="inline" label="Farnesene" value={src.farnesene} />
        <Prop variant="inline" label="Geraniol" value={src.geraniol} />
        <Prop variant="inline" label="Humulene" value={src.humulene} />
        <Prop variant="inline" label="Linalool" value={src.linalool} />
        <Prop variant="inline" label="Myrcene" value={src.myrcene} />
        <Prop variant="inline" label="Total Oil" value={src.totalOil} />
      </CardContent>
    </Card>
  );
}
