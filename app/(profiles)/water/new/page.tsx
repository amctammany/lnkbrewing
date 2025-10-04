import WaterProfileEditor from "@/app/(profiles)/water/_components/WaterProfileEditor/WaterProfileEditor";
//import { getWaterProfile } from "@/app/profiles/water/queries";
import { createWaterProfile } from "@/app/(profiles)/water/actions";
import { verifySession } from "@/lib/verifySession";
import { WaterProfileType } from "@/types/Profile";

export default async function WaterProfileCreatorPage({}) {
  //  const profile = await authorizeResource(getWaterProfile, slug);
  const session = await verifySession("/profiles/water/new");

  const profile: WaterProfileType = {
    name: "",
    slug: "",
    userId: session?.user.id,
  };
  return <WaterProfileEditor action={createWaterProfile} profile={profile} />;
}
