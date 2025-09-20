import React from "react";
import { getMashProfile, getMashProfiles } from "../queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { LinkButton } from "@/components/Button/LinkButton";
import { MashProfileType } from "@/types/Profile";
import MashProfileDisplay from "@/app/(profiles)/mash/_components/MashProfileDisplay/MashProfileDisplay";

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
        <LinkButton href={`/mash/${profile.slug}/fork`}>Fork</LinkButton>

        <LinkButton href={`/mash/${profile.slug}/edit`}>Edit</LinkButton>
      </TopBar>
      <MashProfileDisplay profile={profile as MashProfileType} />
    </div>
  );
}
