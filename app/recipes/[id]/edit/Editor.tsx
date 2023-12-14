import { Suspense } from "react";
import { RecipeEditor } from "../../_components/RecipeEditor";
import { GeneralSection } from "../../_components/RecipeEditor/GeneralSection/GeneralSection";
import { EquipmentSection } from "../../_components/RecipeEditor/EquipmentSection/EquipmentSection";
import { FermentableIngredientSection } from "../../_components/RecipeEditor/FermentableIngredientSection";
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
import { YeastIngredientSection } from "../../_components/RecipeEditor/YeastIngredientSection/YeastIngredientSection";
import { ExtendedRecipe } from "../../types";
import { Session } from "next-auth";

export type EditorProps = {
  recipe?: ExtendedRecipe | null;
  id: number;
  session?: Session;
};
const Loading = ({ id }: { id?: number }) => <div>Loading</div>;

export const Editor = ({ id, session }: EditorProps) => (
  <RecipeEditor recipeId={id}>
    <Suspense fallback={<Loading />}>
      <GeneralSection
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <EquipmentSection
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
    <Suspense fallback={<Loading />}>
      <FermentableIngredientSection
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <YeastIngredientSection
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <OtherIngredientSection
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <MashSection recipeId={id} massUnit={session?.preferences.hopMassUnit} />
    </Suspense>
    <Suspense fallback={<Loading />}>
      <WaterProfileSection
        recipeId={id}
        massUnit={session?.preferences.hopMassUnit}
      />
    </Suspense>
  </RecipeEditor>
);
