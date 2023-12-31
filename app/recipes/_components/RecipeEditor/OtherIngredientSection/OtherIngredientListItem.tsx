"use client";
import { ExtendedOtherIngredient } from "../../../types";
import { removeRecipeOtherIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemText } from "@/components/List/ListItemText";
import { useRecipe } from "../useRecipe";
import { Amount } from "@/components/Amount";
import { ListItemIcon } from "@/components/List/ListItemIcon";

export type OtherIngredientListItemProps = {
  other: ExtendedOtherIngredient;
};
export const OtherIngredientListItem = ({
  other,
}: OtherIngredientListItemProps) => {
  const { openModal } = useRecipe();
  return (
    <ListItem
      onClick={() => openModal("others", other.id)}
      secondaryAction={
        <RemoveButton id={other.id} action={removeRecipeOtherIngredient} />
      }
    >
      <ListItemIcon>
        <div className="text-lg ">
          {other.duration} {other.durationType}
        </div>
        <div className="text-sm ">{other.usage}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={other.otherIngredient.name}
        secondary={`${other.otherIngredient.type}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={<Amount amount={other.amount} type={other.amountType} />}
      />
    </ListItem>
  );
};
