import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { MashProfileModal } from "./MashProfileModal";
import dynamic from "next/dynamic";
import Prop from "@/components/Prop/Prop";
import { List, ListItem } from "@/components/List";
import { PencilIcon } from "@heroicons/react/24/solid";
const MashProfileModal = dynamic(() => import("./MashProfileModal"), {
  ssr: false,
});

interface MashSectionProps {
  recipeId: number;
  open: boolean;
}

const MashSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?mash=1">
        <PencilIcon className="h-6 w-6 " />
      </ButtonLink>
    </div>
  );
};
export const MashSection: FC<MashSectionProps> = async ({ recipeId, open }) => {
  const recipe = await getExtendedRecipe(recipeId);
  const mashSectionProps = [
    { label: "Profile", value: recipe?.mash?.name },
    {
      label: "Final Gravity",
      value: recipe?.fg.toFixed(3),
    },
    {
      label: "Alcohol By Volume",
      value: recipe?.abv.toFixed(2),
    },
  ];

  return (
    <Section header="Mash" actions={<MashSectionActions />}>
      <div className="flex flex-col ">
        {mashSectionProps.map((p) => (
          <Prop key={p.label} {...p} />
        ))}
      </div>
      <div>
        <List>
          {(recipe?.mash?.steps || []).map((step, index) => (
            <ListItem key={index}>
              <div className="grid grid-cols-4">
                <div className="col-span-2">Temperature</div>
                <div className="">{step.temperature} F</div>
                <div className="">{step.time} min</div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
      {open && <MashProfileModal recipe={recipe} open={open} />}
    </Section>
  );
};
