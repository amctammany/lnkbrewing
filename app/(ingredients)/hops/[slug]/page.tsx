import { TopBar } from "@/components/TopBar/TopBar";
import React from "react";
import { getHop, getHops } from "@/app/(ingredients)/hops/queries";
import { HopDisplay } from "@/app/(ingredients)/hops/_components/HopDisplay/HopDisplay";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
export async function generateStaticParams() {
  return (await getHops()).map(({ slug }) => ({ slug }));
}
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
      >
        <IconButton
          icon={Pencil}
          variant="outline"
          href={`/hops/${hop.slug}/edit`}
        >
          Edit
        </IconButton>
      </TopBar>
      <div>
        <HopDisplay src={hop} />
      </div>
    </div>
  );
}
