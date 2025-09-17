import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";

export default function YeastsIngredientsPage() {
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
