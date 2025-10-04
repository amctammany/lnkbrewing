import React from "react";
import EquipmentProfilesList from "./_components/EquipmentProfilesList/EquipmentProfilesList";
import { getEquipmentProfiles } from "@/app/(profiles)/equipment/queries";
import { prisma } from "@/lib/client";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";
import { BaseEquipmentProfile } from "@/types/Profile";
import IconButton from "@/components/Button/IconButton";

export default async function EquipmentProfilesListPage() {
  const profiles = await getEquipmentProfiles();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Equipment", url: "/equipment" },
        ]}
      >
        <IconButton icon={Plus} variant="outline" href="/equipment/new">
          Add
        </IconButton>
      </TopBar>
      <EquipmentProfilesList profiles={profiles as BaseEquipmentProfile[]} />
    </div>
  );
}
