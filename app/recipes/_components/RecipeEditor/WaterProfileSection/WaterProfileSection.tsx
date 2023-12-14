import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const WaterProfileModal = dynamic(() => import("./WaterProfileModal"), {
  ssr: true,
});
import { UserMassPreference } from "@prisma/client";
import { WaterProfileSectionActions } from "./WaterProfileSectionActions";
import { Prop } from "@/components/Prop";
import { getWaterProfile, getWaterProfiles } from "@/app/profiles/queries";
import { PropSet } from "@/components/PropSet/PropSet";

interface WaterProfileSectionProps {
  recipeId: number;
  massUnit?: UserMassPreference;
}

export const WaterProfileSection: FC<WaterProfileSectionProps> = async ({
  recipeId,
  massUnit,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const profiles = await getWaterProfiles();
  const waterSectionProps = [
    //{ label: "Profile", value: recipe?.water?.name },
    {
      label: "Ca2+",
      value: recipe?.calcium,
    },
    {
      label: "Mg2+",
      value: recipe?.magnesium,
    },
    {
      label: "Na+",
      value: recipe?.sodium,
    },
    {
      label: "Cl-",
      value: recipe?.chloride,
    },
    {
      label: "SO42-",
      value: recipe?.sulfate,
    },
    {
      label: "HCO3-",
      value: recipe?.bicarbonate,
    },
  ];

  return (
    <div className="md:col-span-2">
      <Section header="WaterProfile" actions={<WaterProfileSectionActions />}>
        <PropSet label="Profile" value={recipe?.water?.name} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {waterSectionProps.map((p) => (
            <PropSet label={p.label} value={p.value} key={p.label} />
          ))}
        </div>
      </Section>
      <WaterProfileModal
        recipe={recipe}
        massUnit={massUnit}
        profiles={profiles}
      />
    </div>
  );
};
