import { Button, ButtonLink, List, ListItem, Section } from "@/components";
import { prisma } from "@/lib/client";
import { HopIngredientModal } from "../../_components";
import Link from "next/link";

export type HopIngredientsProps = {
  recipeId?: number;
  hopId?: string;
};
export const HopIngredients = async ({
  recipeId,
  hopId,
}: HopIngredientsProps) => {
  const recipeHops = await prisma.hopIngredient.findMany({
    where: {
      recipeId,
    },
    include: {
      hop: true,
    },
  });
  const HopActionBar = () => (
    <ButtonLink className="flex-shrink" href="?hopId=new">
      Add
    </ButtonLink>
  );

  return (
    <>
      <HopIngredientModal recipeId={recipeId} hopId={hopId} />

      <Section header="Hops" actions={<HopActionBar />}>
        <List>
          {recipeHops.map((hop) => (
            <ListItem key={hop.id}>
              <div className="flex gap-4">
                <div className="flex-0">{hop.duration}</div>
                <div className="flex-1">{hop.hop.name}</div>
                <div className="flex-0">{hop.amount}</div>
                <div>
                  <ButtonLink href={`?hopId=${hop.id}`}>Edit</ButtonLink>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </Section>
    </>
  );
};
