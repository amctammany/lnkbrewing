import { TrashIcon } from "@heroicons/react/24/solid";

import { ExtendedOtherIngredient } from "../../../types";
import { removeRecipeOtherIngredient } from "../../../actions";
import Link from "next/link";
import { ListItem } from "@/components/List/ListItem";

export type OtherIngredientListItemProps = {
  other: ExtendedOtherIngredient;
};
type RemoveOtherButtonProps = {
  id: number;
};
const RemoveOtherButton = ({ id }: RemoveOtherButtonProps) => {
  return (
    <form action={removeRecipeOtherIngredient}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
};
export const OtherIngredientListItem = ({
  other,
}: OtherIngredientListItemProps) => {
  return (
    <ListItem>
      <div className="flex group-hover:bg-slate-500/10">
        <Link
          className="flex-grow px-2 pb-1 grid grid-cols-6 gap-2  "
          scroll={false}
          href={`?otherId=${other.id}`}
        >
          <div className="">
            <div className="text-lg ">
              {other.amount} {other.amountType}
            </div>
            <div className="text-xs">foo?</div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{other.otherIngredient.name}</div>
              <div className="text-xs">IBU: {other.otherIngredient.id}</div>
            </div>
          </div>
          <div className="">
            <div className="text-lg">{other.amount}</div>
            <div className="text-xs">{other.amountType}</div>
          </div>
        </Link>
        <div className="m-auto">
          <RemoveOtherButton id={other.id} />
        </div>
      </div>
    </ListItem>
  );
};
