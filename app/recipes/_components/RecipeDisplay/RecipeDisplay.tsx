import { List, ListItem, Section } from "@/components";
import { Fermentable, Hop, HopIngredient, Recipe, Style } from "@prisma/client";
import Link from "next/link";
type PropProps = {
  label?: string;
  children?: any;
};
const Prop = ({ label, children }: PropProps) => {
  return (
    <div className="flex flex-auto p-2 border-b-2">
      <b className="px-3">{label}</b>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

type FermentableIngredient = any;
type ExtendedFermentableIngredient = FermentableIngredient & {
  fermentable: Pick<Fermentable, "id" | "name">;
};
type ExtendedHopIngredient = HopIngredient & {
  hop: Pick<Hop, "id" | "name">;
};
type ExtendedRecipe = Recipe & {
  style: Pick<Style, "id" | "identifier" | "name">;
  hops: ExtendedHopIngredient[];
  fermentables: ExtendedFermentableIngredient[];
};
export type RecipeDisplayProps = {
  recipe?: ExtendedRecipe | null;
};

const fieldNames: (keyof Recipe)[] = ["description"];
const numberFieldNames: (keyof Recipe)[] = [];

export const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  return (
    <div className="m-5 p-2 min-w-full bg-slate-200 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
      <div className="flex items-center md:col-span-2">
        <h2 className="text-2xl flex-grow">Recipe Display: {recipe?.name}</h2>
        <Link
          className="text-2xl flex-shrink px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`/recipes/${recipe?.id}/edit`}
        >
          Edit
        </Link>
      </div>
      <Section header="General">
        <Prop label="Name">{recipe?.name}</Prop>
        <Prop label="Author">{recipe?.authorUsername}</Prop>
        <Prop label="Description">{recipe?.description}</Prop>
      </Section>

      <Section header="Style">
        <Prop label="Style Identifier">{recipe?.style?.identifier}</Prop>
        <Prop label="Style Name">{recipe?.style?.name}</Prop>
      </Section>
      <Section header="Hops">
        <ul>
          {recipe?.hops.map((hop) => (
            <li key={hop.id}>
              <div className="bg-white flex items-center p-2 ">
                <h2 className="text-lg flex-shrink">
                  {hop.amount} {hop.amountType}
                </h2>
                <p className="flex-grow px-2 m-0 text-lg">
                  {hop?.hop.name?.toString()}
                </p>
                <p className="flex-shrink px-2 m-0 text-lg">
                  {hop?.duration} {hop?.durationType}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section header="Fermentables">
        <ul>
          {recipe?.fermentables.map((fermentable) => (
            <li key={fermentable.id}>
              <div className="bg-white flex items-center p-2">
                <h2 className="text-lg flex-shrink">
                  {fermentable.amount} {fermentable.amountType}
                </h2>
                <p className="flex-grow px-2 m-0 text-lg">
                  {fermentable?.fermentable.name?.toString()}
                </p>
                <p className="flex-shrink px-2 m-0 text-lg">
                  {fermentable?.duration} {fermentable?.durationType}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
