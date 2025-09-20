import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import YeastsTable from "./_components/YeastsTable/YeastsTable";
import { getYeasts } from "./queries";
import { LinkButton } from "@/components/Button/LinkButton";
import { Plus } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

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
        <IconButton href="/yeasts/new" icon={Plus}>
          Add
        </IconButton>
      </TopBar>
      <div>
        <YeastsTable src={yeasts} />
      </div>
    </div>
  );
}
