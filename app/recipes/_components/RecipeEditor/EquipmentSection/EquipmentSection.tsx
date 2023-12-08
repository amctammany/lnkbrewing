import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const EquipmentModal = dynamic(() => import("./EquipmentModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { EquipmentSectionActions } from "./EquipmentSectionActions";
import { Prop } from "@/components/Prop";
import { getEquipmentProfiles } from "@/app/profiles/queries";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ListItemText } from "@/components/List/ListItemText";

interface EquipmentSectionProps {
  recipeId: number;
  massUnit: UserMassPreference;
}

export const EquipmentSection: FC<EquipmentSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const profiles = await getEquipmentProfiles();
  const equipmentSectionProps = [
    { label: "Profile", value: recipe?.equipment?.name },
    {
      label: "Boil Time",
      value: recipe?.boilTime ?? recipe?.equipment?.boilTime,
      unit: "min",
    },
    {
      label: "Batch Volume",
      value: recipe?.batchVolume ?? recipe?.equipment?.batchVolume,
      unit: "gal",
    },
    {
      label: "Mash Efficiency",
      value:
        ((recipe?.mashEfficiency ?? recipe?.equipment?.mashEfficiency) || 0) *
        100,
      unit: "%",
    },
    {
      label: "Brew Efficiency",
      value:
        ((recipe?.brewEfficiency ?? recipe?.equipment?.brewEfficiency) || 0) *
        100,
      unit: "%",
    },
  ];

  return (
    <div className="md:col-span-2">
      <Section header="Equipment" actions={<EquipmentSectionActions />}>
        <div className="flex flex-col ">
          {equipmentSectionProps.map((p) => (
            <Prop key={p.label} {...p} />
          ))}
        </div>
      </Section>
      <EquipmentModal massUnit={massUnit} profiles={profiles} />
    </div>
  );
};
