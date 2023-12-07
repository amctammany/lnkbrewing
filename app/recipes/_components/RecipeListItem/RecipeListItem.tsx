import Link from "next/link";
import { ListItem } from "@/components/List";
import { removeRecipe } from "../../actions";
import { Recipe } from "@prisma/client";
import { RemoveButton } from "@/components/RemoveButton";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
type RecipeListItemProps = {
  recipe?: Partial<Recipe>;
};
export const RecipeListItem = ({ recipe }: RecipeListItemProps) => (
  <ListItem
    key={recipe?.id}
    href={`/recipes/${recipe?.id}`}
    secondaryAction={<RemoveButton id={recipe?.id} action={removeRecipe} />}
  >
    <ListItemIcon variant="icon">{recipe?.styleIdentifer}</ListItemIcon>
    <ListItemText primary={recipe?.name} secondary={recipe?.authorEmail} />
  </ListItem>
);
