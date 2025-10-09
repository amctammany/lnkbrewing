import React from "react";
import EquipmentProfileDisplay from "../_components/EquipmentProfileDisplay/EquipmentProfileDisplay";
import { getEquipmentProfile, getEquipmentProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { AdjustedEquipmentProfileType } from "@/types/Profile";
import IconButton from "@/components/Button/IconButton";
import { Pencil, Split } from "lucide-react";
import {
  adjustUnits,
  getUnits,
  UnitMask,
  UnitMaskType,
} from "@/lib/Converter/adjustUnits";
import { getPreferences } from "@/app/admin/queries";
import { EquipmentProfileMask } from "@/lib/Converter/Masks";
interface EquipmentProfileDisplayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getEquipmentProfiles()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: EquipmentProfileDisplayPageProps) {
  const { slug } = await params;
  const profile = await getEquipmentProfile(slug);
  return {
    title: `LNK - Equipment Profiles - ${profile.name}`,
    description: profile.description,
  };
}

export default async function EquipmentProfileDisplayPage({
  params,
}: EquipmentProfileDisplayPageProps) {
  const { slug } = await params;
  const profile = await getEquipmentProfile(slug);
  if (!profile) notFound();
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: profile,
    mask: EquipmentProfileMask,
    prefs,
  }) as AdjustedEquipmentProfileType;
  //  console.log("adjusted", adjusted, units);
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
      <EquipmentProfileDisplay profile={adjusted} />
    </div>
  );
}
