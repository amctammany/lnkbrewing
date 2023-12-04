import { ExtendedOtherIngredient } from "../../../types";
import { removeRecipeOtherIngredient } from "../../../actions";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";

export type OtherIngredientListItemProps = {
  other: ExtendedOtherIngredient;
};
export const OtherIngredientListItem = ({
  other,
}: OtherIngredientListItemProps) => {
  return (
    <ListItem
      href={`?otherId=${other.id}`}
      secondaryAction={
        <RemoveButton id={other.id} action={removeRecipeOtherIngredient} />
      }
    >
      <ListItemIcon>
        <div className="text-lg ">{other.usage}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={other.otherIngredient.name}
        secondary={`Type: ${other.otherIngredient.type}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={`${other.amount.toString()} ${other.amountType}`}
      />
    </ListItem>
  );
};
