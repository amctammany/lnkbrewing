import { Prop } from "@/components/Prop/Prop";
import { Card } from "@/components/ui/card";
import type { Style } from "@prisma/client";
import React from "react";

export interface StyleDisplayProps {
  style: Style;
}
export function StyleDisplay({ style }: StyleDisplayProps) {
  return (
    <div>
      <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
        <Prop label="Name" value={style.name} />
        <Prop label="Overall" value={style.overall} />
        <Prop label="Aroma" value={style.aroma} />
        <Prop label="Appearance" value={style.appearance} />
        <Prop label="Mouthfeel" value={style.mouthfeel} />
        <Prop label="Flavor" value={style.flavor} />
        <Prop label="Comments" value={style.comments} />
        <Prop label="History" value={style.history} />
        <Prop label="Ingredients" value={style.ingredients} />
        <Prop label="Comparision" value={style.comparison} />
        <Prop label="Examples" value={style.examples} />
        <Prop label="Ingredients" value={style.ingredients} />

        <div>
          <Prop label="IBU Range" unit="">
            {style?.ibuLow} - {style?.ibuHigh}
          </Prop>
          <Prop label="ABV Range" unit="%">
            {style?.abvLow} - {style?.abvHigh}
          </Prop>
          <Prop label="OG Range" unit="">
            {style?.ogLow} - {style?.ogHigh}
          </Prop>
          <Prop label="FG Range" unit="">
            {style?.fgLow} - {style?.fgHigh}
          </Prop>
          <Prop label="SRM Range" unit="&deg;L">
            {style?.srmLow} - {style?.srmHigh}
          </Prop>
        </div>
      </Card>
    </div>
  );
}
