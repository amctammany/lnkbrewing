import { prisma } from "@/lib/client";
import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type MashProfileEditorProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: MashProfileEditorProps) {
  return {
    title: `LNK MashProfile: ${params.slug}`,
  };
}

export default async function MashProfileEditor({
  params: { slug },
}: MashProfileEditorProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/api/auth/signin");

  const mashProfile = await prisma.mashProfile.findFirst({
    where: {
      slug,
    },
    include: { steps: true },
  });
  console.log(mashProfile);
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <MashProfileForm src={mashProfile} />
    </div>
  );
}
