import { Prop } from "@/components/Prop";
import { AmountProp } from "@/components/Prop/AmountProp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdjustedHopType } from "@/types/Ingredient";
import React from "react";

export default function BrewingValues({ src }: { src: AdjustedHopType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brewing Values</CardTitle>
      </CardHeader>
      <CardContent className="*:py-1">
        <AmountProp variant="grid" label="Alpha" value={src.alpha} unit="%" />
        <AmountProp variant="grid" label="Beta" value={src.beta} unit="%" />
        <AmountProp
          variant="grid"
          label="bPinene"
          value={src.bPinene}
          unit="%"
        />

        <AmountProp
          variant="grid"
          label="Cohumulone"
          value={src.cohumulone}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Caryophyllene"
          value={src.caryophyllene}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Farnesene"
          value={src.farnesene}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Geraniol"
          value={src.geraniol}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Humulene"
          value={src.humulene}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Linalool"
          value={src.linalool}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Myrcene"
          value={src.myrcene}
          unit="%"
        />
        <AmountProp
          variant="grid"
          label="Total Oil"
          value={src.totalOil}
          unit="mL/100g"
        />
      </CardContent>
    </Card>
  );
}
