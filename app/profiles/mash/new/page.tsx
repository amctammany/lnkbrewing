import { prisma } from "@/lib/client";
import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { MashProfile } from "@prisma/client";
import { MashProfileInput } from "../types";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type MashProfileCreatorProps = {};

export function generateMetadata({}: MashProfileCreatorProps) {
  return {
    title: `LNK MashProfile: New`,
  };
}

export default async function MashProfileCreator({}: MashProfileCreatorProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/api/auth/signin");

  const mashProfile = {} as MashProfileInput;
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <MashProfileForm src={mashProfile} />
    </div>
  );
}
