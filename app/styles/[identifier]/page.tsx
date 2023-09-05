import { List, ListItemButton } from "@/components";
import { prisma } from "@/lib/client";
import { Style } from "@prisma/client";
import Link from "next/link";
type StyleDisplayProps = {
  params: {
    identifier: string;
  };
};
const fieldNames: (keyof Style)[] = [
  "aroma",
  "appearance",
  "flavor",
  "mouthfeel",
  "history",
  "ingredients",
  "comments",
  "comparison",
  "examples",
];

export function generateMetadata({ params }: StyleDisplayProps) {
  return {
    title: `LNK Style: ${params.identifier}`,
  };
}

export default async function StyleDisplay({
  params: { identifier },
}: StyleDisplayProps) {
  const style = await prisma.style.findFirst({
    where: {
      identifier,
    },
  });
  return (
    <div className="m-5 p-0 bg-slate-200">
      <div className="flex border-2 bg-white m-2 p-2">
        <h2 className="text-2xl flex-grow">Style Display: {style?.name}</h2>
        <Link
          className="text-2xl flex-shrink px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`/styles/${style?.identifier}/edit`}
        >
          Edit
        </Link>
      </div>
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{style?.[field]}</p>
        </div>
      ))}
      {JSON.stringify(style)}
    </div>
  );
}
