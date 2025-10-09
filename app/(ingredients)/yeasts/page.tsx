import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import YeastsTable from "./_components/YeastsTable/YeastsTable";
import { getYeasts } from "./queries";
import { Plus } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LNK - Yeasts",
};

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
      <div className="relative overflow-auto w-full">
        <YeastsTable src={yeasts} />
      </div>
    </div>
  );
}
