import { ButtonLink } from "@/components/Button/Button";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { MashProfile, MashStep } from "@prisma/client";
import Link from "next/link";
import { MashProfileStep } from "../types";
import Prop from "@/components/Prop/Prop";
import { auth } from "@/app/auth";
import { toggleUserFavorite } from "@/app/admin/actions";
import FavButton from "@/app/admin/_components/FavButton/FavButton";
import { IconButtonLink } from "@/components/Button/IconButton";
import { EditIcon } from "@/components/Icon";
type MashProfileDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof MashProfile)[] = ["name", "description"];
const numberFieldNames: (keyof MashProfile)[] = [];

export function generateMetadata({ params }: MashProfileDisplayProps) {
  return {
    title: `LNK MashProfile: ${params.slug}`,
  };
}
type MashStepListItemProps = {
  step: MashStep;
  index: number;
};
function MashStepListItem({ step, index }: MashStepListItemProps) {
  return (
    <ListItem key={step.id}>
      <div className="grid grid-cols-5">
        <div>
          <b>{index}</b>
        </div>
        <Prop label="Name" value={step.name} />
        <Prop label="Temperature" value={step.temperature} unit={"0F"} />
        <Prop label="Time" value={step.time} unit="min" />
        <Prop label="Ramp Time" value={step.rampTime} unit="min" />
      </div>
    </ListItem>
  );
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
  const session = await auth();
  const userMashProfileId = session?.preferences?.mashProfileId;

  return (
    <Section
      header={`MashProfile: ${mashProfile?.name}`}
      actions={
        <div className="inline-flex flex-row-reverse">
          <FavButton
            id={mashProfile?.id}
            name="mashProfileId"
            isActive={userMashProfileId === mashProfile?.id}
            action={toggleUserFavorite.bind(
              null,
              session?.preferences.userId,
              "mashProfileId"
            )}
          />

          <IconButtonLink
            Icon={EditIcon}
            href={`/profiles/mash/${mashProfile?.slug}/edit`}
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
          <p className="px-2 m-2">{mashProfile?.[field]}</p>
        </div>
      ))}
      <div className="m-2 p-2">
        <h2 className="text-lg uppercase underline">Steps</h2>
        <List>
          {(mashProfile?.steps || []).map((step, index) => (
            <MashStepListItem key={step.id} step={step} index={index} />
          ))}
        </List>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{mashProfile?.[field]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
