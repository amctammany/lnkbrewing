import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HopType } from "@/types/Ingredient";
import React from "react";

export default function BrewingValues({ src }: { src: HopType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brewing Values</CardTitle>
      </CardHeader>
      <CardContent className="*:py-1">
        <Prop variant="grid" label="Alpha" value={src.alpha} unit="%" />
        <Prop variant="grid" label="Beta" value={src.beta} unit="%" />
        <Prop variant="grid" label="bPinene" value={src.bPinene} unit="%" />

        <Prop
          variant="grid"
          label="Cohumulone"
          value={src.cohumulone}
          unit="%"
        />
        <Prop
          variant="grid"
          label="Caryophyllene"
          value={src.caryophyllene}
          unit="%"
        />
        <Prop variant="grid" label="Farnesene" value={src.farnesene} unit="%" />
        <Prop variant="grid" label="Geraniol" value={src.geraniol} unit="%" />
        <Prop variant="grid" label="Humulene" value={src.humulene} unit="%" />
        <Prop variant="grid" label="Linalool" value={src.linalool} unit="%" />
        <Prop variant="grid" label="Myrcene" value={src.myrcene} unit="%" />
        <Prop
          variant="grid"
          label="Total Oil"
          value={src.totalOil}
          unit="mL/100g"
        />
      </CardContent>
    </Card>
  );
}
