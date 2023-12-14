import { Suspense } from "react";
import { RecipeEditor } from "../../_components/RecipeEditor";
import { GeneralSection } from "../../_components/RecipeEditor/GeneralSection/GeneralSection";
import { EquipmentSection } from "../../_components/RecipeEditor/EquipmentSection/EquipmentSection";
import {
  FermentableIngredientContainer,
  FermentableIngredientSection,
} from "../../_components/RecipeEditor/FermentableIngredientSection";
import {
  HopIngredientContainer,
  HopIngredientSection,
} from "../../_components/RecipeEditor/HopIngredientSection";
import { MashSection } from "../../_components/RecipeEditor/MashSection/MashSection";
import { OtherIngredientSection } from "../../_components/RecipeEditor/OtherIngredientSection/OtherIngredientSection";
import {
  StyleSection,
  StyleContainer,
} from "../../_components/RecipeEditor/StyleSection";
import { WaterProfileSection } from "../../_components/RecipeEditor/WaterProfileSection/WaterProfileSection";
import {
  YeastIngredientSection,
  YeastIngredientContainer,
} from "../../_components/RecipeEditor/YeastIngredientSection/";
import { ExtendedRecipe } from "../../types";
import { Session } from "next-auth";
import { OtherIngredientContainer } from "../../_components/RecipeEditor/OtherIngredientSection";
import { EquipmentContainer } from "../../_components/RecipeEditor/EquipmentSection";
import { MashContainer } from "../../_components/RecipeEditor/MashSection";
import { WaterProfileContainer } from "../../_components/RecipeEditor/WaterProfileSection";
import { GeneralContainer } from "../../_components/RecipeEditor/GeneralSection";

export type EditorProps = {
  recipe?: ExtendedRecipe | null;
  id: number;
  session?: Session;
};
const Loading = ({ id }: { id?: number }) => <div>Loading</div>;

export const Editor = ({ id, session }: EditorProps) => (
  <RecipeEditor recipeId={id}>
    <Suspense fallback={<GeneralSection />}>
      <GeneralContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<EquipmentSection />}>
      <EquipmentContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<StyleSection />}>
      <StyleContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<HopIngredientSection />}>
      <HopIngredientContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<FermentableIngredientSection />}>
      <FermentableIngredientContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<YeastIngredientSection />}>
      <YeastIngredientContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<OtherIngredientSection />}>
      <OtherIngredientContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<MashSection />}>
      <MashContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<WaterProfileSection />}>
      <WaterProfileContainer
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
  </RecipeEditor>
);
