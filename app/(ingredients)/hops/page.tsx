import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";

export default function HopsIngredientsPage() {
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
        ]}
      ></TopBar>
      <div>HopsIngredientsPage</div>
    </div>
  );
}
