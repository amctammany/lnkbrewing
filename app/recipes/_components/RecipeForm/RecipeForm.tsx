import {
  ButtonLink,
  Form,
  NumberField,
  Section,
  Select,
  Submit,
  TextArea,
  TextField,
} from "@/components";
import { Fermentable, Recipe } from "@prisma/client";
import { RecipeHopIngredients } from "./RecipeHopIngredients";
import { RecipeFermentableIngredients } from "./RecipeFermentableIngredients";
import { updateRecipe } from "../../actions";
import { StyleSelect } from ".";
import { EquipmentProfileSelect } from "@/app/profiles/_components";
import { RecipeVitals } from "../RecipeVitals";
import { ExtendedRecipe } from "../../types";

export type RecipeFormProps = {
  src: ExtendedRecipe | null;
};

export const RecipeForm = ({ src }: RecipeFormProps) => {
  return (
    <div className="flex-auto w-full m-2 p-2 bg-white">
      <form action={updateRecipe}>
        <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
          <div className=" col-span-2 flex flex-auto items-center mx-auto">
            <Submit>Save</Submit>
          </div>

          <input type="hidden" name="id" value={src?.id} />
          <input type="hidden" name="authorEmail" value={src?.authorEmail} />
          <Section header="General">
            <TextField name="name" label="Name" defaultValue={src?.name} />
            <TextArea
              name="description"
              label="description"
              defaultValue={src?.description}
            />
          </Section>
          <Section
            header="Equipment"
            actions={
              <>
                <ButtonLink scroll={false} href="?equipment=1">
                  Edit
                </ButtonLink>
              </>
            }
          >
            <EquipmentProfileSelect
              disabled
              name="equipmentProfileId"
              value={src?.equipmentProfileId}
            />
            <NumberField
              disabled
              name="batchVolume"
              label="Batch Volume"
              step={0.01}
              defaultValue={src?.batchVolume}
            />
            <NumberField
              disabled
              name="boilTime"
              label="Boil Time"
              defaultValue={src?.boilTime}
            />
          </Section>
          <Section header="Style">
            <StyleSelect
              value={src?.styleIdentifer || "1A"}
              label="Style"
              name="styleIdentifer"
            />
          </Section>
          <RecipeVitals src={src} />
        </div>
      </form>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
        <RecipeHopIngredients hops={src?.hops} />
        <RecipeFermentableIngredients fermentables={src?.fermentables} />
      </div>
    </div>
  );
};
