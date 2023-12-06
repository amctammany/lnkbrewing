import { getExtendedRecipe, getRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import React, { FC } from "react";
//import { WaterProfileModal } from "./WaterProfileModal";
import dynamic from "next/dynamic";
import Prop from "@/components/Prop/Prop";
import { List, ListItem } from "@/components/List";
import { PencilIcon } from "@heroicons/react/24/solid";
const WaterProfileModal = dynamic(() => import("./WaterProfileModal"), {
  ssr: false,
});

interface WaterSectionProps {
  recipeId: number;
  open: boolean;
}

const WaterSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?water=1" scroll={false}>
        <PencilIcon className="h-6 w-6 " />
      </ButtonLink>
    </div>
  );
};
export const WaterSection: FC<WaterSectionProps> = async ({
  recipeId,
  open,
}) => {
  const recipe = await getExtendedRecipe(recipeId);
  const waterSectionProps = [
    { label: "Profile", value: recipe?.water?.name },
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
    <Section header="Water" actions={<WaterSectionActions />}>
      <div className="flex flex-col">
        {waterSectionProps.map((p) => (
          <Prop key={p.label} {...p} />
        ))}
      </div>
      <div></div>
      {open && <WaterProfileModal recipe={recipe} open={open} />}
    </Section>
  );
};
