import { prisma } from "@/lib/client";
import { Fermentable } from "@prisma/client";
import Link from "next/link";
type FermentableDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof Fermentable)[] = ["description", "country"];

export function generateMetadata({ params }: FermentableDisplayProps) {
  return {
    title: `LNK Fermentable: ${params.slug}`,
  };
}

export default async function FermentableDisplay({
  params: { slug },
}: FermentableDisplayProps) {
  const fermentable = await prisma.fermentable.findFirst({
    where: {
      slug,
    },
  });
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <div className="flex border-2 bg-white m-2 p-2">
        <h2 className="text-2xl flex-grow">
          Fermentable Display: {fermentable?.name}
        </h2>
        <Link
          className="text-2xl flex-shrink px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`/ingredients/fermentables/${fermentable?.slug}/edit`}
        >
          Edit
        </Link>
      </div>
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{fermentable?.[field]}</p>
        </div>
      ))}
    </div>
  );
}
