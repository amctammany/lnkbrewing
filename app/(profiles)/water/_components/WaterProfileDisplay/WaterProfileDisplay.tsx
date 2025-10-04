import { Ca2, Cl, HCO3, Mg2, Na, SO4 } from "@/components/Elements";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { WaterProfileType } from "@/types/Profile";
import Link from "next/link";
import React from "react";
const Box = Prop;

export type WaterProfileDisplayProps = {
  profile: WaterProfileType;
};
export default function WaterProfileDisplay({
  profile,
}: WaterProfileDisplayProps) {
  return (
    <div>
      <Card className="*:not-last:border-b-2 m-1">
        <Prop label="Name" value={profile.name} />
        <Prop label="Author" value={profile.owner?.name} />
        <Prop
          label="Forked From"
          value={
            <Link className="underline" href={`/water/${profile.origin?.slug}`}>
              {profile.origin?.name}
            </Link>
          }
        />
        <Prop label="Description" value={profile.description} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
          <Box
            label={<Ca2 />}
            value={profile.calcium}
            unit="ppm"
            className="flex-grow"
          />
          <Box label={<Mg2 />} value={profile.magnesium} unit="ppm" />
          <Box label={<Cl />} value={profile.chloride} unit="ppm" />
          <Box label={<SO4 />} value={profile.sulfate} unit="ppm" />
          <Box label={<HCO3 />} value={profile.bicarbonate} unit="ppm" />
          <Box label={<Na />} value={profile.sodium} unit="ppm" />
        </div>
      </Card>
    </div>
  );
}
