import { prisma } from "@/lib/client";
import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
type MashProfileDisplayProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: MashProfileDisplayProps) {
  return {
    title: `LNK MashProfile: ${params.slug}`,
  };
}

export default async function MashProfileDisplay({
  params: { slug },
}: MashProfileDisplayProps) {
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
