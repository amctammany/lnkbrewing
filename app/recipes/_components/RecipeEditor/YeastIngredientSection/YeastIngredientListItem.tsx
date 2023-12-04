import { ExtendedYeastIngredient } from "../../../types";
import { removeYeastIngredient } from "../../../actions";
import Link from "next/link";
import { ListItem } from "@/components/List/ListItem";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";

export type YeastIngredientListItemProps = {
  yeast: ExtendedYeastIngredient;
};
export const YeastIngredientListItem = ({
  yeast,
}: YeastIngredientListItemProps) => {
  return (
    <ListItem
      href={`?yeastId=${yeast.id}`}
      secondaryAction={
        <RemoveButton id={yeast.id} action={removeYeastIngredient} />
      }
    >
      <ListItemIcon></ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={yeast.yeast.name}
        secondary={`Attenuation: ${yeast.attenuation}`}
      />
      <ListItemText
        //className="flex-shrink"
        primary={`${yeast.amount.toString()} ${yeast.amountType}`}
      />
    </ListItem>
  );
};
