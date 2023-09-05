import { PrismaClient, HopUsage, StyleCategory } from "@prisma/client";
import slugify from "slugify";
import hops from "../data/hops.json";
import grains from "../data/grains.json";
import styles from "../data/styles.json";
const prisma = new PrismaClient();
async function main() {
  await prisma.style.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.hop.deleteMany();
  await prisma.fermentable.deleteMany();
  await prisma.user.deleteMany();
  const alex = await prisma.user.upsert({
    where: { email: "alex@gmail.com" },
    update: {},
    create: {
      email: "alex@gmail.com",
      name: "Alex",
      username: "alex",
      recipes: {
        create: [
          {
            name: "First Recipe",
            slug: "first-recipe",
            description: "Desc",
          },
        ],
      },
    },
  });

  const kathy = await prisma.user.upsert({
    where: { email: "kathy@gmail.com" },
    update: {},
    create: {
      email: "kathy@gmail.com",
      name: "Kathy",
      username: "kathy",
      recipes: {
        create: [
          {
            name: "Second Recipe",
            slug: "second-recipe",
            description: "Desc",
          },
          {
            name: "Final Recipe",
            slug: "final-recipe",
            description: "Desc",
          },
        ],
      },
    },
  });

  await prisma.hop.createMany({
    data: hops.map(({ usage, ...hop }) => ({
      ...hop,
      slug: slugify(hop.name, { lower: true }),
      usage: HopUsage[usage as HopUsage],
    })),
  });

  await prisma.fermentable.createMany({
    data: grains.map((grain) => ({
      ...grain,
      slug: slugify(grain.name, { lower: true }),
    })),
  });
  await prisma.style.createMany({
    data: styles.map(({ category, ...style }) => ({
      ...style,
      subcategoryId: parseInt(style.subcategoryId, 10),
      category: StyleCategory[category.toLowerCase() as StyleCategory],
    })),
  });

  console.log({ alex, kathy });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
