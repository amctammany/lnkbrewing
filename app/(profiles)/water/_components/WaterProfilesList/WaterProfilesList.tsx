import React from "react";
import WaterProfileListItem from "./WaterProfileListItem";
import { Card } from "@/components/ui/card";
import { BaseWaterProfile } from "@/types/Profile";

export type WaterProfilesListProps = {
  profiles: BaseWaterProfile[];
};
export default function WaterProfilesList({
  profiles,
}: WaterProfilesListProps) {
  return (
    <Card className="mx-4 my-2">
      <div className="w-full bg-amber-400">SearchBar</div>
      <ul className="gap-2 *:not-last:border-b-2">
        {profiles.map((profile) => (
          <WaterProfileListItem key={profile.name} profile={profile} />
        ))}
      </ul>
    </Card>
  );
}
