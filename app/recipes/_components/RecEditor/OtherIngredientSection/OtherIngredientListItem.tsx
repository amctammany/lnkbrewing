"use client";
import { ExtendedOtherIngredient } from "../../../types";
import { removeRecipeOtherIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { useRecipe } from "../useRecipe";

export type OtherIngredientListItemProps = {
  other: ExtendedOtherIngredient;
};
export const OtherIngredientListItem = ({
  other,
}: OtherIngredientListItemProps) => {
  const { openOther } = useRecipe();
  console.log(other);
  return (
    <ListItem
      onClick={() => openOther(other.id)}
      secondaryAction={
        <RemoveButton id={other.id} action={removeRecipeOtherIngredient} />
      }
    >
      <ListItemIcon>{other.otherIngredient.name}</ListItemIcon>
      <ListItemText className="flex-grow" />
      <ListItemText
        //className="flex-shrink"
        primary={`${other.amount.toString()} ${other.amountType}`}
      />
    </ListItem>
  );
};
