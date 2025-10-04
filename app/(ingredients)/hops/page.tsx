import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getHops } from "./queries";
import HopsTable from "./_components/HopsTable/HopsTable";
import IconButton from "@/components/Button/IconButton";
import { Plus } from "lucide-react";

export default async function HopsIngredientsPage() {
  const hops = await getHops();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
        ]}
      >
        <IconButton icon={Plus} variant="outline" href="/hops/new">
          Add
        </IconButton>
      </TopBar>
      <div>
        <HopsTable src={hops} />
      </div>
    </div>
  );
}
