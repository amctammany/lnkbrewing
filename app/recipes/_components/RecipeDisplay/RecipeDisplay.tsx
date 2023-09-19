import { ButtonLink, Section } from "@/components";
import { ExtendedRecipe } from "../../types";
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

export type RecipeDisplayProps = {
  recipe?: ExtendedRecipe | null;
};
export const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  return (
    //<div className="m-5 p-2 min-w-full bg-slate-200 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
    //<div className="flex items-center md:col-span-2">
    //<h2 className="text-2xl flex-grow">Recipe Display: {recipe?.name}</h2>
    <Section
      header={`Recipe: ${recipe?.name}`}
      actions={
        <ButtonLink href={`/recipes/${recipe?.id}/edit`}>Edit</ButtonLink>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <Section header="General">
          <Prop label="Name">{recipe?.name}</Prop>
          <Prop label="Author">{recipe?.author?.name}</Prop>
          <Prop label="Description">{recipe?.description}</Prop>
        </Section>

        <Section header="Style">
          <Prop label="Style Identifier">{recipe?.style?.identifier}</Prop>
          <Prop label="Style Name">{recipe?.style?.name}</Prop>
        </Section>
        <Section header="Equipment">
          <Prop label="Equipment Profile">{recipe?.equipment?.name}</Prop>
          <Prop label="Batch Volume">{recipe?.batchVolume}</Prop>
          <Prop label="Boil Time">{recipe?.boilTime}</Prop>
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
    </Section>
  );
};
