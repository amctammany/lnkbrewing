import { prisma } from "@/lib/client";
import { HopType } from "@/types/Ingredient";

export async function getHop(slug: string) {
  const hop = await prisma.hop.findFirst({ where: { slug } });
  return {
    alphaRange: [hop?.alphaLow, hop?.alpha, hop?.alphaHigh],
    ...hop,
  } as HopType;
}

export async function getHops() {
  const hops = await prisma.hop.findMany();
  return hops;
}
