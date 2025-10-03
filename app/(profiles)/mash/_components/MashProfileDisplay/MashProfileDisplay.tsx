import { Ca2, Cl, HCO3, Mg2, MgSo4, Na, SO4 } from "@/components/Elements";
import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AdjustedMashProfileType,
  BaseMashProfile,
  MashProfileType,
} from "@/types/Profile";
import { MashProfile } from "@prisma/client";
import Link from "next/link";
import React from "react";
import MashStepListItem from "./MashStepListItem";

export type MashProfileDisplayProps = {
  profile: AdjustedMashProfileType;
};
export default function MashProfileDisplay({
  profile,
}: MashProfileDisplayProps) {
  return (
    <div>
      <Card className="m-1 ">
        <CardHeader>
          <CardTitle>Mash Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Prop label="Name" value={profile.name} />
          <Prop label="Author" value={profile.owner?.name} />
          <Prop
            label="Forked From"
            value={
              <Link
                className="underline"
                href={`/mash/${profile.origin?.slug}`}
              >
                {profile.origin?.name}
              </Link>
            }
          />
          <Prop label="Description" value={profile.description} />
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ul className="w-full">
                {profile.steps.map((step) => (
                  <MashStepListItem key={step.id} src={step} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
