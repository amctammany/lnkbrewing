import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { MashSectionActions } from "./MashSectionActions";
import { Prop } from "@/components/Prop";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ListItemText } from "@/components/List/ListItemText";
import { ExtendedRecipe } from "@/app/recipes/types";

interface MashSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const MashSection: FC<MashSectionProps> = ({ recipe }) => {
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
    <Section
      className="md:col-span-2"
      header="Mash"
      actions={<MashSectionActions />}
    >
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
  );
};
