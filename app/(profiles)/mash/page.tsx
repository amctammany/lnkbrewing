import React from "react";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
import { getMashProfiles } from "./queries";
import { prisma } from "@/lib/client";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";
import { MashProfile } from "@prisma/client";
import IconButton from "@/components/Button/IconButton";

export default async function MashProfilesListPage() {
  const profiles = await prisma.mashProfile.findMany();
  return (
    <div>
      <TopBar
        breadcrumbs={[{ title: "Profiles" }, { title: "Mash", url: "/mash" }]}
      >
        <IconButton icon={Plus} variant="outline" href="/mash/new">
          Add
        </IconButton>
      </TopBar>
      <MashProfilesTable src={profiles as MashProfile[]} />
    </div>
  );
}
