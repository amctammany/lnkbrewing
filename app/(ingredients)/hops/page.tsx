import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getHops } from "./queries";
import HopsTable from "./_components/HopsTable/HopsTable";

export default async function HopsIngredientsPage() {
  const hops = await getHops();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
        ]}
      ></TopBar>
      <div>
        <HopsTable src={hops} />
      </div>
    </div>
  );
}
