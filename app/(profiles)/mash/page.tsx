import React from "react";
import MashProfilesTable from "./_components/MashProfilesTable/MashProfilesTable";
import { getMashProfiles } from "./queries";
import { TopBar } from "@/components/TopBar/TopBar";
import { Plus } from "lucide-react";
import { MashProfile } from "@prisma/client";
import IconButton from "@/components/Button/IconButton";

export default async function MashProfilesListPage() {
  const profiles = await getMashProfiles();
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
