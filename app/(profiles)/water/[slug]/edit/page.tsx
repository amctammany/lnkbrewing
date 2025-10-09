import WaterProfileEditor from "@/app/(profiles)/water/_components/WaterProfileEditor/WaterProfileEditor";
import { getWaterProfile } from "@/app/(profiles)/water/queries";
import { updateWaterProfile } from "@/app/(profiles)/water/actions";

import { authorizeResource } from "@/lib/authorizeResource";
interface WaterProfileEditorPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({
  params,
}: WaterProfileEditorPageProps) {
  const { slug } = await params;
  const profile = await getWaterProfile(slug);
  return {
    title: `LNK - Water Profile - ${profile.name} Edit`,
    description: profile.description,
  };
}
export default async function WaterProfileEditorPage({
  params,
}: WaterProfileEditorPageProps) {
  const { slug } = await params;

  const profile = await authorizeResource(
    `/profiles/water/${slug}/edit`,
    getWaterProfile,
    slug
  );
  return <WaterProfileEditor action={updateWaterProfile} profile={profile} />;
}
