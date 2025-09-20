import MashProfileEditor from "@/app/(profiles)/mash/_components/MashProfileEditor/MashProfileEditor";
import { getMashProfile } from "@/app/(profiles)/mash/queries";
import { createMashProfile } from "@/app/(profiles)/mash/actions";

import { authorizeResource } from "@/lib/authorizeResource";
import { auth } from "@/auth";
import { MashProfileType } from "@/types/Profile";
import { verifySession } from "@/lib/verifySession";

export default async function MashProfileCreatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await verifySession("/mash/new");
  const profile = {
    userId: session.user.id,
  } as MashProfileType;
  return <MashProfileEditor action={createMashProfile} profile={profile} />;
}
