import { ExtendedRecipe } from "@/app/recipes/types";
import { Form } from "@/components/Form/Form";
import { NumberField } from "@/components/Form/NumberField";
import { Submit } from "@/components/Form/Submit";
import React, { FC } from "react";
import { StyleSelect } from "./StyleSelect";
import { Style } from "@prisma/client";
import { Select } from "@/components/Form/Select";

interface StyleFormProps {
  recipe?: ExtendedRecipe | null;
  action?: any;
  styles?: Record<string, string>;
}

export const StyleForm: FC<StyleFormProps> = ({ recipe, action, styles }) => {
  //<div className="col-span-2">
  //<StyleSelect
  //name="styleId"
  //value={recipe?.styleId}
  ///>
  //</div>;

  return (
    <Form action={action}>
      <input type="hidden" name="id" value={recipe?.id} />
      <div className="flex flex-row gap-2">
        <Select
          name="styleIdentifer"
          label="Style"
          defaultValue={recipe?.styleIdentifer}
          options={styles}
        />
        <Submit>Save</Submit>
      </div>
    </Form>
  );
};
