import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getFermentables } from "./queries";
import FermentablesTable from "./_components/FermentablesTable/FermentablesTable";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";

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
        <LinkButton variant="outline" href={"/fermentables/new"}>
          <Plus />
          New
        </LinkButton>
      </TopBar>
      <div>
        <FermentablesTable src={fermentables} />
      </div>
    </div>
  );
}
