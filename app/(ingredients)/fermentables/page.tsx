import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getFermentables } from "./queries";

export default async function FermentablesIngredientsPage() {
  const fermentables = await getFermentables();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Yeasts", url: "/yeasts" },
        ]}
      ></TopBar>
      <div>YeastsIngredientsPage</div>
    </div>
  );
}
