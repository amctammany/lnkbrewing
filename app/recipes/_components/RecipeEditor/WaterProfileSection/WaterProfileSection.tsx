import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { WaterProfileSectionActions } from "./WaterProfileSectionActions";
import { PropSet } from "@/components/PropSet/PropSet";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";

interface WaterProfileSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const WaterProfileSection: FC<WaterProfileSectionProps> = ({
  recipe,
}) => {
  const waterSectionProps = [
    //{ label: "Profile", value: recipe?.water?.name },
    {
      label: <Ca2 />,
      value: recipe?.calcium,
    },
    {
      label: <MgSo4 />,
      value: recipe?.magnesium,
    },
    {
      label: <Na />,
      value: recipe?.sodium,
    },
    {
      label: <Cl />,
      value: recipe?.chloride,
    },
    {
      label: <SO4 />,
      value: recipe?.sulfate,
    },
    {
      label: <HCO3 />,
      value: recipe?.bicarbonate,
    },
  ];

  return (
    <Section
      className="md:col-span-2"
      header="WaterProfile"
      actions={<WaterProfileSectionActions />}
    >
      <PropSet label="Profile" value={recipe?.water?.name} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {waterSectionProps.map((p, i) => (
          <PropSet label={p.label} value={p.value} key={i} />
        ))}
      </div>
    </Section>
  );
};
