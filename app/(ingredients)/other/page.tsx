import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getOtherIngredients } from "./queries";
import OthersTable from "./_components/OthersTable/OthersTable";

export default async function OthersIngredientsPage() {
  const others = await getOtherIngredients();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Others", url: "/Others" },
        ]}
      ></TopBar>
      <div>
        <OthersTable src={others} />
      </div>
    </div>
  );
}
