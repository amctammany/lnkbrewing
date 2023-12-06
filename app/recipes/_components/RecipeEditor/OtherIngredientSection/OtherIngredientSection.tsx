import { getExtendedRecipe } from "@/app/recipes/queries";
import { ButtonLink } from "@/components/Button";
import { List } from "@/components/List";
import { Section } from "@/components/Section";
import { prisma } from "@/lib/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { OtherIngredientListItem } from "./OtherIngredientListItem";
import OtherIngredientModal from "./OtherIngredientModal";
import { Icon } from "@/components/Icon";

interface OtherIngredientSectionProps {
  recipeId: number;
  otherId?: string | null;
}

const OtherIngredientSectionActions = () => {
  return (
    <div>
      <ButtonLink href="?otherId=new">
        <Icon icon="add" />
      </ButtonLink>
    </div>
  );
};
export const OtherIngredientSection: FC<OtherIngredientSectionProps> = async ({
  recipeId,
  otherId,
}) => {
  const open = !!otherId;
  const recipe = await getExtendedRecipe(recipeId);
  const otherIngredient = await prisma.recipeOtherIngredient.findFirst({
    where: {
      id: parseInt(otherId || "") || 0,
    },
    include: {
      otherIngredient: true,
    },
  });

  return (
    <Section header="Others" actions={<OtherIngredientSectionActions />}>
      <List>
        {(recipe?.otherIngredients || []).map((other) => (
          <OtherIngredientListItem key={other.id} other={other} />
        ))}
      </List>
      {open && (
        <OtherIngredientModal
          other={otherIngredient}
          otherId={otherId}
          recipe={recipe}
          open={open}
        />
      )}
    </Section>
  );
};
