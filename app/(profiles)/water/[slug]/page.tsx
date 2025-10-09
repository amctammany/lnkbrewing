import React from "react";
import WaterProfileDisplay from "../_components/WaterProfileDisplay/WaterProfileDisplay";
import { getWaterProfile, getWaterProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { BaseWaterProfile } from "@/types/Profile";
import IconButton from "@/components/Button/IconButton";
import { Pencil, Split } from "lucide-react";
interface WaterProfileDisplayPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({
  params,
}: WaterProfileDisplayPageProps) {
  const { slug } = await params;
  const profile = await getWaterProfile(slug);
  return {
    title: `LNK - Water Profile - ${profile.name} Fork`,
    description: profile.description,
  };
}
export default async function WaterProfileDisplayPage({
  params,
}: WaterProfileDisplayPageProps) {
  const { slug } = await params;
  const profile = await getWaterProfile(slug);
  if (!profile) notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Water", url: "/water" },
          { title: profile.name, url: `/water/${profile.slug}` },
        ]}
      >
        <IconButton icon={Split} href={`/water/${profile.slug}/fork`}>
          Fork
        </IconButton>

        <IconButton icon={Pencil} href={`/water/${profile.slug}/edit`}>
          Edit
        </IconButton>
      </TopBar>
      <WaterProfileDisplay profile={profile as BaseWaterProfile} />
    </div>
  );
}
