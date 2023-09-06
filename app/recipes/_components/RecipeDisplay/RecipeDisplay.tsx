import { Recipe } from "@prisma/client";
import Link from "next/link";

export type RecipeDisplayProps = {
  recipe?: Recipe | null;
};

const fieldNames: (keyof Recipe)[] = ["description"];
const numberFieldNames: (keyof Recipe)[] = [];

export const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  return (
    <div className="m-5 p-0 min-w-full bg-slate-200">
      <div className="flex border-2 bg-white m-2 p-2">
        <h2 className="text-2xl flex-grow">Recipe Display: {recipe?.name}</h2>
        <Link
          className="text-2xl flex-shrink px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`/recipes/${recipe?.id}/edit`}
        >
          Edit
        </Link>
      </div>
      {fieldNames.map((field) => (
        <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
          <h2 key={field} className="text-lg uppercase underline">
            {field}
          </h2>
          <p className="px-2 m-2">{recipe?.[field]?.toString()}</p>
        </div>
      ))}

      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        {numberFieldNames.map((field) => (
          <div key={field} className="m-2 p-2 bg-white shadow-sm drop-shadow">
            <h2 key={field} className="text-lg uppercase underline">
              {field}
            </h2>
            <p className="px-2 m-2">{recipe?.[field]?.toString()}</p>
          </div>
        ))}
      </div>
      {JSON.stringify(recipe)}
    </div>
  );
};
