import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const MashModal = dynamic(() => import("./MashModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { MashSectionActions } from "./MashSectionActions";
import { Prop } from "@/components/Prop";
import { getMashProfiles } from "@/app/profiles/queries";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ListItemText } from "@/components/List/ListItemText";

interface MashSectionProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const MashSection: FC<MashSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const profiles = await getMashProfiles();
  const mashSectionProps = [
    { label: "Profile", value: recipe?.mash?.name },
    {
      label: "Final Gravity",
      value: recipe?.fg.toFixed(3),
      unit: "SG",
    },
    {
      label: "Alcohol By Volume",
      value: recipe?.abv.toFixed(2),
      unit: "%",
    },
  ];

  return (
    <div className="md:col-span-2">
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
                <ListItemText className="">Temperature</ListItemText>
                <ListItemText primary={`${step.temperature.toString()} F`} />
                <ListItemText className="" primary={`${step.time} min`} />
              </ListItem>
            ))}
          </List>
        </div>
      </Section>
      <MashModal recipe={recipe} massUnit={massUnit} profiles={profiles} />
    </div>
  );
};
