import { TopBar } from "@/components/TopBar/TopBar";
import React, { Suspense } from "react";
import { getFermentables } from "./queries";
import FermentablesTable from "./_components/FermentablesTable/FermentablesTable";
import { Plus } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LNK - Fermentables",
};
export default async function FermentablesIngredientsPage() {
  const fermentables = await getFermentables();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Fermentables", url: "/fermentables" },
        ]}
      >
        <IconButton icon={Plus} href={"/fermentables/new"}>
          New
        </IconButton>
      </TopBar>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <FermentablesTable src={fermentables} />
        </Suspense>
      </div>
    </div>
  );
}
