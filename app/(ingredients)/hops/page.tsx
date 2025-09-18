import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getHops } from "./queries";
import HopsTable from "./_components/HopsTable/HopsTable";
import { LinkButton } from "@/components/Button/LinkButton";

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
        <LinkButton variant="outline" href="/hops/new">
          Add
        </LinkButton>
      </TopBar>
      <div>
        <HopsTable src={hops} />
      </div>
    </div>
  );
}
