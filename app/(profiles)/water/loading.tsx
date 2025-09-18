import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";

export default function Loading() {
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles", url: "/profiles" },
          { title: "Water", url: "/profiles/water" },
        ]}
      ></TopBar>
      Loading Water Profile
    </div>
  );
}
