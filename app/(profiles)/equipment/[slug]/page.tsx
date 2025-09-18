import React from "react";
import EquipmentProfileDisplay from "../_components/EquipmentProfileDisplay/EquipmentProfileDisplay";
import { getEquipmentProfile, getEquipmentProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { LinkButton } from "@/components/Button/LinkButton";
import { BaseEquipmentProfile } from "@/types/Profile";

export async function generateStaticParams() {
  return (await getEquipmentProfiles()).map(({ slug }) => ({ slug }));
}
export default async function EquipmentProfileDisplayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const profile = await getEquipmentProfile(slug);
  if (!profile) notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Equipment", url: "/equipment" },
          { title: profile.name, url: `/equipment/${profile.slug}` },
        ]}
      >
        <LinkButton href={`/equipment/${profile.slug}/fork`}>Fork</LinkButton>

        <LinkButton href={`/equipment/${profile.slug}/edit`}>Edit</LinkButton>
      </TopBar>
      <EquipmentProfileDisplay profile={profile as BaseEquipmentProfile} />
    </div>
  );
}
