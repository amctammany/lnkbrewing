import WaterProfileEditor from "@/app/profiles/water/_components/WaterProfileEditor/WaterProfileEditor";
//import { getWaterProfile } from "@/app/profiles/water/queries";
import { createWaterProfile } from "@/app/profiles/water/actions";
import { auth } from "@/auth";

import { authorizeResource } from "@/lib/authorizeResource";
import { OptionalNullable } from "@/lib/utils";
import { WaterProfile } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function WaterProfileCreatorPage({}) {
  //  const profile = await authorizeResource(getWaterProfile, slug);
  const session = await auth();
  if (!session?.user?.id) {
    // need to login
    const url = new URLSearchParams({
      redirect_url: "/profiles/water/new",
    }).toString();
    return redirect("/admin/login?" + url.toString());
  }
  const profile: Omit<OptionalNullable<WaterProfile>, "id"> = {
    name: "",
    slug: "",
    userId: session?.user.id,
  };
  return <WaterProfileEditor action={createWaterProfile} profile={profile} />;
}
