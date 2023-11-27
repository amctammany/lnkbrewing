import Link from "next/link";
import { ListItem } from "@/components/List";
import { removeRecipe } from "../../actions";
import { Recipe } from "@prisma/client";
import { RemoveButton } from "@/components/RemoveButton";
type RecipeListItemProps = {
  recipe?: Partial<Recipe>;
};
export const RecipeListItem = ({ recipe }: RecipeListItemProps) => (
  <ListItem key={recipe?.id}>
    <div className="flex items-center space-x-4">
      <Link
        className="flex-grow px-2 pb-1 grid grid-cols-6 gap-2  "
        href={`/recipes/${recipe?.id}`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="px-2.5 py-2.5 rounded-full border w-16 text-center bg-slate-200 text-black group-hover:text-white group-hover:bg-gray-300 text-sm font-medium">
              {recipe?.styleIdentifer}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-md group-hover:text-slate-400">{recipe?.name}</p>
            <p className="text-sm group-hover:text-slate-400">
              {recipe?.authorEmail}
            </p>
          </div>
        </div>
      </Link>
      <div className="m-auto">
        <RemoveButton id={recipe?.id} action={removeRecipe} />
      </div>
    </div>
  </ListItem>
);
