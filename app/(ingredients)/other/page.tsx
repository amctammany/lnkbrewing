import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getOtherIngredients } from "./queries";
import OthersTable from "./_components/OthersTable/OthersTable";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";

export default async function OthersIngredientsPage() {
  const others = await getOtherIngredients();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Other", url: "/other" },
        ]}
      >
        <LinkButton variant="outline" href="/other/new">
          <Plus /> Add
        </LinkButton>
      </TopBar>
      <div>
        <OthersTable src={others} />
      </div>
    </div>
  );
}
