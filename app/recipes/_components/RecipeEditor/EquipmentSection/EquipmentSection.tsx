import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { EquipmentSectionActions } from "./EquipmentSectionActions";
import { Prop } from "@/components/Prop";
import { ExtendedRecipe } from "@/app/recipes/types";

interface EquipmentSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const EquipmentSection: FC<EquipmentSectionProps> = async ({
  recipe,
}) => {
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
    <Section header="Equipment" actions={<EquipmentSectionActions />}>
      <div className="flex flex-col ">
        {equipmentSectionProps.map((p) => (
          <Prop key={p.label} {...p} />
        ))}
      </div>
    </Section>
  );
};
