import { prisma } from "@/lib/client";
import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { auth } from "@/app/auth";
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
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const mashProfile = await prisma.mashProfile.findFirst({
    where: {
      slug,
    },
    include: { steps: true },
  });
  console.log(mashProfile);
  return <MashProfileForm src={mashProfile} />;
}
