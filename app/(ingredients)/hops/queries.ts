import { prisma } from "@/lib/client";
import { HopType } from "@/types/Ingredient";

export async function getHop(slug: string) {
  const hop = await prisma.hop.findFirst({ where: { slug } });
  return {
    alphaRange: [hop?.alphaLow, hop?.alpha, hop?.alphaHigh].map(
      (n) => (n ?? 0) * 100
    ),
    betaRange: [hop?.betaLow, hop?.beta, hop?.betaHigh].map(
      (n) => (n ?? 0) * 100
    ),
    cohumoloneRange: [
      hop?.cohumuloneLow,
      hop?.cohumulone,
      hop?.cohumuloneHigh,
    ].map((n) => (n ?? 0) * 100),
    totalOilRange: [hop?.totalOilLow, hop?.totalOil, hop?.totalOilHigh].map(
      (n) => (n ?? 0) * 100
    ),
    farneseneRange: [hop?.farneseneLow, hop?.farnesene, hop?.farneseneHigh].map(
      (n) => (n ?? 0) * 100
    ),
    bPineneRange: [hop?.bPineneLow, hop?.bPinene, hop?.bPineneHigh].map(
      (n) => (n ?? 0) * 100
    ),
    linaloolRange: [hop?.linaloolLow, hop?.linalool, hop?.linaloolHigh].map(
      (n) => (n ?? 0) * 100
    ),
    geraniolRange: [hop?.geraniolLow, hop?.geraniol, hop?.geraniolHigh].map(
      (n) => (n ?? 0) * 100
    ),
    caryophylleneRange: [
      hop?.caryophylleneLow,
      hop?.caryophyllene,
      hop?.caryophylleneHigh,
    ].map((n) => (n ?? 0) * 100),
    myrceneRange: [hop?.myrceneLow, hop?.myrcene, hop?.myrceneHigh].map(
      (n) => (n ?? 0) * 100
    ),
    humuleneRange: [hop?.humuleneLow, hop?.humulene, hop?.humuleneHigh].map(
      (n) => (n ?? 0) * 100
    ),
    ...hop,
  } as HopType;
}

export async function getHops() {
  const hops = await prisma.hop.findMany();
  return hops as HopType[];
}
