import { TrashIcon } from "@heroicons/react/24/solid";

import { ExtendedHopIngredient } from "../../../types";
import { removeHopIngredient } from "../../../actions";
import Link from "next/link";
import { ListItem } from "@/components/List/ListItem";

export type HopIngredientListItemProps = {
  hop: ExtendedHopIngredient;
};
type RemoveHopButtonProps = {
  id: number;
};
const RemoveHopButton = ({ id }: RemoveHopButtonProps) => {
  return (
    <form action={removeHopIngredient}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="border-red-300 border rounded-md p-2">
        <TrashIcon className="h-6 w-6 text-red-500 " />
      </button>
    </form>
  );
};
export const HopIngredientListItem = ({ hop }: HopIngredientListItemProps) => {
  return (
    <ListItem>
      <Link scroll={false} href={`?hopId=${hop.id}`}>
        <div className="px-2 pb-1 grid grid-cols-6 gap-2 group-hover:bg-slate-500/10 ">
          <div className="">
            <div className="">
              <div className="text-lg ">
                {hop.duration} {hop.durationType}
              </div>
              <div className="text-xs">{hop.usage}</div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{hop.hop.name}</div>
              <div className="text-xs">IBU: {hop.alpha}</div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="text-lg">{hop.amount}</div>
              <div className="text-xs">{hop.amountType}</div>
            </div>
          </div>
        </div>
      </Link>
    </ListItem>
  );
};
