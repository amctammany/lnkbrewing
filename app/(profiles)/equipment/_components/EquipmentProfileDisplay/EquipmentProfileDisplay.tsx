import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { BaseEquipmentProfile, EquipmentProfileType } from "@/types/Profile";
import { EquipmentProfile } from "@prisma/client";
import Link from "next/link";
import React from "react";
const Box = ({
  label,
  value,
  unit,
}: {
  unit?: string | React.ReactNode;
  label: string | React.ReactNode;
  value?: number | null;
}) => (
  <div className="grid grid-cols-2 font-mono border-2 rounded p-1 md:*:px-4 md:*:py-3">
    <span className="md:text-lg font-bold bg-slate-700 text-gray-300 ">
      {label}
    </span>
    <div className="flexspacing-2 *:my-auto">
      <span className="pr-2">{value}</span>
      <span>{unit}</span>
    </div>
  </div>
);
export type EquipmentProfileDisplayProps = {
  profile: EquipmentProfileType;
};
export default function EquipmentProfileDisplay({
  profile,
}: EquipmentProfileDisplayProps) {
  return (
    <div>
      <Card className="*:not-last:border-b-2 lg:max-w-2/3 mx-auto">
        <Prop label="Name" value={profile.name} />
        <Prop label="Author" value={profile.owner?.name} />
        <Prop
          label="Forked From"
          value={
            <Link
              className="underline"
              href={`/equipment/${profile.origin?.slug}`}
            >
              {profile.origin?.name}
            </Link>
          }
        />
        <Prop label="Description" value={profile.description} />
        <div className="grid md:grid-cols-2">
          <div>
            <Prop label="Boil Time" value={profile.boilTime} />
            <Prop label="Batch Size" value={profile.batchVolume} />
            <Prop label="Mash Efficiency" value={profile.mashEfficiency} />
            <Prop label="Brew Efficiency" value={profile.brewEfficiency} />
          </div>
          <div>
            <Prop label="Boiloff Rate" value={profile.boilOffRate} />
            <Prop label="Mash Loss" value={profile.mashLoss} />
            <Prop label="Trub Loss" value={profile.trubLoss} />
            <Prop label="Fermenter Loss" value={profile.fermenterLoss} />
          </div>
        </div>
      </Card>
    </div>
  );
}
