import React, { FC } from "react";
import { ExtendedRecipe } from "../../types";
import { Form } from "@/components/Form/Form";
import { Submit } from "@/components/Form/Submit";
import { Section } from "@/components/Section/Section";
import { TextField } from "@/components/Form/TextField";
import { TextArea } from "@/components/Form/TextArea";
import { ButtonLink } from "@/components/Button/Button";
import { NumberField } from "@/components/Form/NumberField";
import { EquipmentProfileSelect } from "@/app/profiles/_components/EquipmentProfileSelect/EquipmentProfileSelect";
import { StyleSelect } from "../RecipeForm/StyleSelect";
import { RecipeVitals } from "../RecipeVitals/RecipeVitals";

interface RecipeFormProps {
  recipeId: number;
  src: ExtendedRecipe;
  action?: any;
}

export const RecipeForm: FC<RecipeFormProps> = (props) => {
  const { src, action, recipeId } = props;

  return (
    <Form action={action}>
      <div className=" flex flex-col md:grid gap-2 md:gap-4 md:grid-cols-2">
        <div className=" col-span-2 flex flex-auto items-center ">
          <Submit>Save</Submit>

          <input type="hidden" name="id" value={src?.id} />
          <input type="hidden" name="authorEmail" value={src?.authorEmail} />
        </div>
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
    </Form>
  );
};
