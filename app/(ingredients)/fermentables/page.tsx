import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getFermentables } from "./queries";
import FermentablesTable from "./_components/FermentablesTable/FermentablesTable";
import { Plus } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

export default async function FermentablesIngredientsPage() {
  const fermentables = await getFermentables();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Fermentables", url: "/fermentables" },
        ]}
      >
        <IconButton size="sm" icon={Plus} href={"/fermentables/new"}>
          New
        </IconButton>
      </TopBar>
      <div>
        <FermentablesTable src={fermentables} />
      </div>
    </div>
  );
}
