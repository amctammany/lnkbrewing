import React from "react";
import EquipmentProfilesList from "./_components/EquipmentProfilesList/EquipmentProfilesList";
import { getEquipmentProfiles } from "@/app/(profiles)/equipment/queries";
import { prisma } from "@/lib/client";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";
import { BaseEquipmentProfile } from "@/types/Profile";

export default async function EquipmentProfilesListPage() {
  const profiles = await getEquipmentProfiles();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles", url: "/profiles" },
          { title: "Equipment", url: "/profiles/water" },
        ]}
      >
        <LinkButton variant="outline" href="/profiles/water/new">
          <Plus />
          Add
        </LinkButton>
      </TopBar>
      <EquipmentProfilesList profiles={profiles as BaseEquipmentProfile[]} />
    </div>
  );
}
