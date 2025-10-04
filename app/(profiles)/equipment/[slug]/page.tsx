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
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: profile,
    mask: EquipmentProfileMask,
    prefs,
  }) as AdjustedEquipmentProfileType;
  //  console.log("adjusted", adjusted, units);
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
      <EquipmentProfileDisplay profile={adjusted} />
    </div>
  );
}
