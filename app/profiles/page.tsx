import Link from "next/link";
import React from "react";
import { TopBar } from "@/components/TopBar/TopBar";

export default async function ProfilesPage() {
  return (
    <div>
      <TopBar breadcrumbs={[{ title: "Profiles", url: "/profiles" }]}></TopBar>
      <div className="m-4 grid-2 *:p-4">
        <div>
          <Link href={"/profiles/water"}>Water</Link>
        </div>
        <div>Equipment</div>
        <div>Fermentation</div>
        <div>Mash</div>
      </div>
    </div>
  );
}
