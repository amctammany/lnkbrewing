import { ButtonLink, ListItem } from "@/components";
import {
  Fermentable,
  FermentableIngredient as FermentableIngredientType,
} from "@prisma/client";
import { ExtendedFermentableIngredient } from "../../types";
import Link from "next/link";

export type FermentableIngredientProps = {
  fermentable: ExtendedFermentableIngredient;
};
export const FermentableIngredient = ({
  fermentable,
}: FermentableIngredientProps) => {
  return (
    <ListItem>
      <Link scroll={false} href={`?fermentableId=${fermentable.id}`}>
        <div className="px-2 pb-1 grid grid-cols-6 gap-2 group-hover:bg-slate-500/10 ">
          <div className="">
            <div className="">
              <div className="text-lg ">{fermentable.usage}</div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="">
              <div className="text-lg">{fermentable.fermentable.name}</div>
              <div className="text-xs">
                Potential: {fermentable.fermentable.potential}
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="text-lg">{fermentable.amount}</div>
              <div className="text-xs">{fermentable.amountType}</div>
            </div>
          </div>
        </div>
      </Link>
    </ListItem>
  );
};
