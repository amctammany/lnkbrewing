import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import { EquipmentProfileModal } from "./EquipmentProfileModal";
import { NumberField } from "@/components/Form/NumberField";
import { EquipmentProfileSelect } from "@/app/profiles/_components";

export const dynamic = "force-validate";
interface EquipmentSectionProps {
  recipeId: number;
  open: boolean;
}

const EquipmentSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?equipment=1">Edit</ButtonLink>
    </div>
  );
};
type PropProps = {
  label?: string | null;
  value?: string | number | null;
  unit?: string | null;
};
const Prop = ({ label, value, unit }: PropProps) => {
  return (
    <div className="flex">
      <h4 className="flex-grow text-md font-bold">{label}</h4>
      <span className="pr-1">{value}</span>
      <span className="">{unit}</span>
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
      value: (recipe?.equipment?.mashEfficiency || 0) * 100,
      unit: "%",
    },
    {
      label: "Brew Efficiency",
      value: (recipe?.equipment?.brewEfficiency || 0) * 100,
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
