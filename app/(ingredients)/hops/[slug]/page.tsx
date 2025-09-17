import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getHop } from "@/app/(ingredients)/hops/queries";
import { HopDisplay } from "@/app/(ingredients)/hops/_components/HopDisplay/HopDisplay";
import { notFound } from "next/navigation";

export default async function HopDisplayPage({ params }: any) {
  const { slug } = await params;
  const hop = await getHop(slug);
  if (!hop) return notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
          { title: hop.name, url: `/hops/${hop.slug}` },
        ]}
      ></TopBar>
      <div>
        <HopDisplay src={hop} />
      </div>
    </div>
  );
}
