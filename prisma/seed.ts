import {
  PrismaClient,
  HopUsage,
  StyleCategory,
  YeastForm,
  YeastType,
  YeastFlocculation,
} from "@prisma/client";
import slugify from "slugify";
import hops from "../data/hops.json";
import yeasts from "../data/yeasts.json";
import grains from "../data/grains.json";
import styles from "../data/styles.json";
const prisma = new PrismaClient();
async function main() {
  await prisma.style.deleteMany();
  await prisma.equipmentProfile.deleteMany();
  await prisma.hopIngredient.deleteMany();
  await prisma.fermentableIngredient.deleteMany();
  await prisma.hop.deleteMany();
  //await prisma.hopSensoryPanel.deleteMany();
  await prisma.yeast.deleteMany();
  await prisma.fermentable.deleteMany();
  await prisma.recipe.deleteMany();
  //await prisma.user.deleteMany();
  //const alex = await prisma.user.upsert({
  //where: { email: "alex@gmail.com" },
  //update: {},
  //create: {
  //email: "alex@gmail.com",
  //name: "Alex",
  //username: "alex",
  //recipes: {
  //create: [
  //{
  //name: "First Recipe",
  //slug: "first-recipe",
  //description: "Desc",
  //},
  //],
  //},
  //},
  //});

  //const kathy = await prisma.user.upsert({
  //where: { email: "kathy@gmail.com" },
  //update: {},
  //create: {
  //email: "kathy@gmail.com",
  //name: "Kathy",
  //username: "kathy",
  //recipes: {
  //create: [
  //{
  //name: "Second Recipe",
  //slug: "second-recipe",
  //description: "Desc",
  //},
  //{
  //name: "Final Recipe",
  //slug: "final-recipe",
  //description: "Desc",
  //},
  //],
  //},
  //},
  //});
  await prisma.equipmentProfile.create({
    data: {
      name: "Anvil 6.5",
      slug: slugify("Anvil 6.5", { lower: true }),
      description: "Anvil Foundry",
      boilOffRate: 0.45,
      trubLoss: 0.35,
      mashLoss: 0,
      fermenterLoss: 0.5,
      batchVolume: 3.4,
      preboilVolume: 4.5,
      boilVolume: 4.5,
      brewEfficiency: 0.68,
    },
  });

  await prisma.equipmentProfile.create({
    data: {
      name: "Anvil 10.5",
      slug: slugify("Anvil 10.5", { lower: true }),
      description: "Anvil Foundry",
      boilOffRate: 0.5,
      trubLoss: 0.55,
      mashLoss: 0,
      fermenterLoss: 0.5,
      batchVolume: 4.4,
      preboilVolume: 6.5,
      boilVolume: 6.5,
      brewEfficiency: 0.7,
    },
  });

  await prisma.yeast.createMany({
    data: yeasts.map(
      ({ type, form, flocculation, temp, attenuation, notes, ...yeast }) => ({
        ...yeast,
        type: YeastType[type as YeastType],
        flocculation:
          YeastFlocculation[
            flocculation?.replace(" ", "") as YeastFlocculation
          ],
        form: YeastForm[form as YeastForm],
        attenuation: attenuation / 100,
        tempLow: temp[0],
        tempHigh: temp[1],
        notes: notes[0],
        usage: notes[1],
      })
    ),
  });

  await prisma.hop.createMany({
    data: hops.map(({ usage, ...hop }) => ({
      ...hop,
      //slug: slugify(hop.name, { lower: true }),
      usage: HopUsage[usage?.toLowerCase() as HopUsage],
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
