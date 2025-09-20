import React from "react";
import EquipmentProfileDisplay from "../_components/EquipmentProfileDisplay/EquipmentProfileDisplay";
import { getEquipmentProfile, getEquipmentProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { LinkButton } from "@/components/Button/LinkButton";
import { BaseEquipmentProfile } from "@/types/Profile";
import IconButton from "@/components/Button/IconButton";
import { Pencil, Split } from "lucide-react";

export async function generateStaticParams() {
  return (await getEquipmentProfiles()).map(({ slug }) => ({ slug }));
}
export default async function EquipmentProfileDisplayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
        <IconButton icon={Split} href={`/equipment/${profile.slug}/fork`}>
          Fork
        </IconButton>

        <IconButton icon={Pencil} href={`/equipment/${profile.slug}/edit`}>
          Edit
        </IconButton>
      </TopBar>
      <EquipmentProfileDisplay profile={profile as BaseEquipmentProfile} />
    </div>
  );
}
