import Link from "next/link";
import React from "react";
import { getWaterProfiles } from "./water/queries";

export default async function ProfilesPage() {
  return (
    <div className="m-4 grid-2 *:p-4">
      <div>
        <Link href={"/profiles/water"}>Water</Link>
      </div>
      <div>Equipment</div>
      <div>Fermentation</div>
      <div>Mash</div>
    </div>
  );
}
