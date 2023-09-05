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

export default async function StyleDisplay({
  params: { identifier },
}: StyleDisplayProps) {
  const style = await prisma.style.findFirst({
    where: {
      identifier,
    },
  });
  return (
    <div className="m-5 p-5 bg-slate-200">
      <h2 className="text-2xl">Style Display: {style?.name}</h2>
      <Link className="text-2xl" href={`/styles/${style?.identifier}/edit`}>
        Edit
      </Link>
      {fieldNames.map((field) => (
        <>
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2">{style?.[field]}</p>
        </>
      ))}
      {JSON.stringify(style)}
    </div>
  );
}
