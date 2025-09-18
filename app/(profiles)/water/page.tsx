import React from "react";
import WaterProfilesList from "./_components/WaterProfilesList/WaterProfilesList";
import { getWaterProfiles } from "./queries";
import { prisma } from "@/lib/client";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";
import { BaseWaterProfile } from "@/types/Profile";

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
        <LinkButton variant="outline" href="/profiles/water/new">
          <Plus />
          Add
        </LinkButton>
      </TopBar>
      <WaterProfilesList profiles={profiles as BaseWaterProfile[]} />
    </div>
  );
}
