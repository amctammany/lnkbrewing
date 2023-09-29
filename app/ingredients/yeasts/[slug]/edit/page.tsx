import { prisma } from "@/lib/client";
import { YeastForm } from "../../_components/YeastForm";
import { updateYeast } from "../../actions";
type YeastDisplayProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: YeastDisplayProps) {
  return {
    title: `LNK Yeast: ${params.slug}`,
  };
}

export default async function YeastDisplay({
  params: { slug },
}: YeastDisplayProps) {
  const yeast = await prisma.yeast.findFirst({
    where: {
      slug,
    },
  });
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <YeastForm src={yeast} action={updateYeast} />
    </div>
  );
}
