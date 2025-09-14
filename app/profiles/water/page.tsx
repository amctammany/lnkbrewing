import React from "react";
import WaterProfilesList from "./_components/WaterProfilesList/WaterProfilesList";
import { getWaterProfiles } from "./queries";
import { prisma } from "@/lib/client";

export default async function WaterProfilesListPage() {
  const profiles = await prisma.waterProfile.findMany();
  return (
    <div>
      <WaterProfilesList profiles={profiles} />
    </div>
  );
}
