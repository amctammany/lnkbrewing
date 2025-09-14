import React from "react";
import WaterProfilesList from "./_components/WaterProfilesList/WaterProfilesList";
import { getWaterProfiles } from "./queries";
import { prisma } from "@/lib/client";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";

export default async function WaterProfilesListPage() {
  const profiles = await prisma.waterProfile.findMany();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles", url: "/profiles" },
          { title: "Water", url: "/profiles/water" },
        ]}
      >
        <Button>Add</Button>
      </TopBar>
      <WaterProfilesList profiles={profiles} />
    </div>
  );
}
