import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import YeastsTable from "./_components/YeastsTable/YeastsTable";
import { getYeasts } from "./queries";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";

export default async function YeastsIngredientsPage() {
  const yeasts = await getYeasts();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Yeasts", url: "/yeasts" },
        ]}
      >
        <LinkButton href="/yeasts/new">
          <Plus /> Add
        </LinkButton>
      </TopBar>
      <div>
        <YeastsTable src={yeasts} />
      </div>
    </div>
  );
}
