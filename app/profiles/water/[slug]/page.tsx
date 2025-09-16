import React from "react";
import WaterProfileDisplay from "../_components/WaterProfileDisplay/WaterProfileDisplay";
import { getWaterProfile, getWaterProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { LinkButton } from "@/components/Button/LinkButton";
import { BaseWaterProfile } from "@/types/Profile";

export async function generateStaticParams() {
  return (await getWaterProfiles()).map(({ slug }) => ({ slug }));
}
export default async function WaterProfileDisplayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getWaterProfile(slug);
  if (!profile) notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles", url: "/profiles" },
          { title: "Water", url: "/profiles/water" },
          { title: profile.name, url: `/profiles/water/${profile.slug}` },
        ]}
      >
        <LinkButton href={`/profiles/water/${profile.slug}/edit`}>
          Edit
        </LinkButton>
      </TopBar>
      <WaterProfileDisplay profile={profile as BaseWaterProfile} />
    </div>
  );
}
