import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { EquipmentProfileModal } from "./EquipmentProfileModal";
import dynamic from "next/dynamic";
import Prop from "@/components/Prop/Prop";
import { PencilIcon } from "@heroicons/react/24/solid";
const EquipmentProfileModal = dynamic(() => import("./EquipmentProfileModal"), {
  ssr: false,
});

interface EquipmentSectionProps {
  recipeId: number;
  open: boolean;
}

const EquipmentSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?equipment=1">
        <PencilIcon className="h-6 w-6 " />
      </ButtonLink>
    </div>
  );
};
export const EquipmentSection: FC<EquipmentSectionProps> = async ({
  recipeId,
  open,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const equipmentSectionProps = [
    { label: "Profile", value: recipe?.equipment?.name },
    {
      label: "Boil Time",
      value: recipe?.boilTime,
      unit: "min",
    },
    {
      label: "Batch Volume",
      value: recipe?.batchVolume,
      unit: "gal",
    },
    {
      label: "Mash Efficiency",
      value: (recipe?.mashEfficiency || 0) * 100,
      unit: "%",
    },
    {
      label: "Brew Efficiency",
      value: (recipe?.brewEfficiency || 0) * 100,
      unit: "%",
    },
  ];

  return (
    <Section header="Equipment" actions={<EquipmentSectionActions />}>
      <div className="flex flex-col ">
        {equipmentSectionProps.map((p) => (
          <Prop key={p.label} {...p} />
        ))}
      </div>
      {open && <EquipmentProfileModal recipe={recipe} open={open} />}
    </Section>
  );
};
