import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getOtherIngredients } from "./queries";
import OthersTable from "./_components/OthersTable/OthersTable";
import { Plus } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

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
        <IconButton icon={Plus} variant="outline" href="/other/new">
          Add
        </IconButton>
      </TopBar>
      <div>
        <OthersTable src={others} />
      </div>
    </div>
  );
}
