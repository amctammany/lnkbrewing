import WaterProfileEditor from "@/app/profiles/water/_components/WaterProfileEditor/WaterProfileEditor";
//import { getWaterProfile } from "@/app/profiles/water/queries";
import { createWaterProfile } from "@/app/profiles/water/actions";
import { auth } from "@/auth";

import { authorizeResource } from "@/lib/authorizeResource";
import { OptionalNullable } from "@/lib/utils";
import { verifySession } from "@/lib/verifySession";
import { WaterProfileType } from "@/types/Profile";
import { WaterProfile } from "@prisma/client";
import { redirect } from "next/navigation";

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
