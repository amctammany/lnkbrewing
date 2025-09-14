import WaterProfileEditor from "@/app/profiles/water/_components/WaterProfileEditor/WaterProfileEditor";
import { getWaterProfile } from "@/app/profiles/water/queries";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";

export default async function WaterProfileEditorPage({
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
      ></TopBar>
      <WaterProfileEditor profile={profile} />
    </div>
  );
}
