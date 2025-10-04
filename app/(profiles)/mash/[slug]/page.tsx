import React from "react";
import { getMashProfile, getMashProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { LinkButton } from "@/components/Button/LinkButton";
import { AdjustedMashProfileType, MashProfileType } from "@/types/Profile";
import MashProfileDisplay from "@/app/(profiles)/mash/_components/MashProfileDisplay/MashProfileDisplay";
import IconButton from "@/components/Button/IconButton";
import { Pencil, Split } from "lucide-react";
import { getPreferences } from "@/app/admin/queries";
import { adjustUnits, getUnits, UnitMask } from "@/lib/Converter/adjustUnits";
import { MashProfileMask } from "@/lib/Converter/Masks";

export async function generateStaticParams() {
  return (await getMashProfiles()).map(({ slug }) => ({ slug }));
}
export default async function MashProfileDisplayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getMashProfile(slug);
  const prefs = await getPreferences();
  const adjusted = adjustUnits({
    src: profile,
    mask: MashProfileMask,
    prefs,
  }) as AdjustedMashProfileType;
  if (!profile) notFound();
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Mash", url: "/mash" },
          { title: profile.name, url: `/mash/${profile.slug}` },
        ]}
      >
        <IconButton href={`/mash/${profile.slug}/fork`} size="sm" icon={Split}>
          Fork
        </IconButton>

        <IconButton href={`/mash/${profile.slug}/edit`} size="sm" icon={Pencil}>
          Edit
        </IconButton>
      </TopBar>
      <MashProfileDisplay profile={adjusted} />
    </div>
  );
}
