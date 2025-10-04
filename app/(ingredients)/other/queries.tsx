import { prisma } from "@/lib/client";
import { OtherType } from "@/types/Ingredient";

export async function getOtherIngredient(slug: string) {
  const other = await prisma.otherIngredient.findFirst({ where: { slug } });
  return other as OtherType;
}

export async function getOtherIngredients() {
  const others = await prisma.otherIngredient.findMany();
  return others as OtherType[];
}
