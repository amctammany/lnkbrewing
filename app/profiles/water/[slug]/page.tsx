import { ButtonLink } from "@/components/Button/Button";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { WaterProfile } from "@prisma/client";
import Link from "next/link";
import Prop from "@/components/Prop/Prop";
import { getWaterProfile } from "../queries";
import { FavButton } from "@/app/admin/_components/FavButton";
import { toggleUserFavorite } from "@/app/admin/actions";
import { auth } from "@/app/auth";
import { IconButtonLink } from "@/components/Button/IconButton";
import { EditIcon } from "@/components/Icon/EditIcon";
type WaterProfileDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof WaterProfile)[] = ["name", "description"];
const numberFieldNames: (keyof WaterProfile)[] = [
  "calcium",
  "magnesium",
  "sodium",
  "chloride",
  "sulfate",
  "bicarbonate",
];

export function generateMetadata({ params }: WaterProfileDisplayProps) {
  return {
    title: `LNK WaterProfile: ${params.slug}`,
  };
}
export default async function WaterProfileDisplay({
  params: { slug },
}: WaterProfileDisplayProps) {
  const waterProfile = await getWaterProfile(slug);
  const session = await auth();
  const userWaterProfileId = session?.preferences?.sourceWaterProfileId;
  return (
    <Section
      header={`WaterProfile: ${waterProfile?.name}`}
      actions={
        <div className="inline-flex flex-row-reverse">
          <FavButton
            id={waterProfile?.id}
            name="waterProfileId"
            isActive={userWaterProfileId === waterProfile?.id}
            action={toggleUserFavorite.bind(
              null,
              session?.preferences.userId,
              "sourceWaterProfileId"
            )}
          />

          <IconButtonLink
            Icon={EditIcon}
            href={`/profiles/water/${waterProfile?.slug}/edit`}
          >
            Edit
          </IconButtonLink>
        </div>
      }
    >
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{waterProfile?.[field]}</p>
        </div>
      ))}
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{waterProfile?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
