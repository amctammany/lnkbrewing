import React from "react";
import WaterProfilesList from "./_components/WaterProfilesList/WaterProfilesList";
import { getWaterProfiles } from "./queries";

export default async function WaterProfilesListPage() {
  const profiles = await getWaterProfiles();
  return (
    <div>
      <WaterProfilesList profiles={profiles} />
    </div>
  );
}
